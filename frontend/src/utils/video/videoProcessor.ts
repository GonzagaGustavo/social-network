import { Quality } from '../constants'
import MP4Demuxer from './mp4Demuxer'

interface EncoderConfig extends Quality {
  bitrate: number
  codec: string
  pt: number
  hardwareAcceleration: string
}

export default class VideoProcessor {
  private mp4Demuxer
  private webMWriter

  private buffers: Buffer[] = []

  constructor({
    mp4Demuxer,
    webMWriter
  }: {
    mp4Demuxer: MP4Demuxer
    webMWriter: any
  }) {
    this.mp4Demuxer = mp4Demuxer
    this.webMWriter = webMWriter
  }

  mp4Decoder(stream: ReadableStream<Uint8Array>) {
    return new ReadableStream({
      start: async (controller) => {
        const decoder = new VideoDecoder({
          output(frame) {
            controller.enqueue(frame)
          },
          error: (e) => {
            controller.error(e)
            console.error('error at mp4Decoder', e)
          }
        })

        return this.mp4Demuxer.run(stream, {
          async onConfig(config) {
            const { supported } = await VideoDecoder.isConfigSupported(config)
            if (!supported) {
              console.error('VideoDecoderConfig not supported', config)
              controller.close()
              return
            }
            decoder.configure(config)
          },
          onChunk(chunk) {
            decoder.decode(chunk)
          }
        })
      }
    })
  }

  encode144p(encoderConfig: VideoEncoderConfig) {
    let _encoder: VideoEncoder
    const readable = new ReadableStream({
      start: async (controller) => {
        const { supported } =
          await VideoEncoder.isConfigSupported(encoderConfig)

        if (!supported) {
          const message = 'VideoEncoderConfig 144p not supported'
          console.error(message, encoderConfig)
          controller.error(message)
          return
        }

        _encoder = new VideoEncoder({
          output: (frame, config) => {
            if (config?.decoderConfig) {
              const decoderConfig = {
                type: 'config',
                config: config.decoderConfig
              }

              controller.enqueue(decoderConfig)
            }
            controller.enqueue(frame)
          },
          error: (e) => {
            controller.error(e)
            console.error(e)
          }
        })

        await _encoder.configure(encoderConfig)
      }
    })

    const writable = new WritableStream({
      async write(frame) {
        _encoder.encode(frame)
        frame.close()
      }
    })

    return {
      readable,
      writable
    }
  }

  renderDecodedFramesAndGetEncodedChunks(
    renderFrame: (frame: VideoFrame) => void
  ) {
    let _decoder: VideoDecoder
    return new TransformStream({
      start: (controller) => {
        _decoder = new VideoDecoder({
          output: (frame) => {
            renderFrame(frame)
          },
          error: (e) => {
            console.error(e)
            controller.error(e)
          }
        })
      },
      transform: async (encodedChunk, controller) => {
        if (encodedChunk.type === 'config') {
          await _decoder.configure(encodedChunk.config)
          return
        }
        _decoder.decode(encodedChunk)
        // need the encoded version to use webM
        controller.enqueue(encodedChunk)
      }
    })
  }

  transformIntoWebM() {
    const writable = new WritableStream({
      write: (chunk) => {
        this.webMWriter.addFrame(chunk)
      }
    })
    return {
      readable: this.webMWriter.getStream(),
      writable
    }
  }

  async start({
    video,
    renderFrame,
    encoderConfig,
    sendMessage
  }: {
    video: File
    encoderConfig: VideoEncoderConfig
    renderFrame: (frame: VideoFrame) => void
    sendMessage(message: any): void
  }) {
    const stream = video.stream()
    const fileName = video.name.split('/').pop()!.replace('.mp4', '')

    await this.mp4Decoder(stream)
      .pipeThrough(this.encode144p(encoderConfig))
      .pipeThrough(this.renderDecodedFramesAndGetEncodedChunks(renderFrame))
      .pipeThrough(this.transformIntoWebM())
      .pipeThrough(
        new TransformStream<{ data: any; position: number }>({
          transform: ({ data, position }, controller) => {
            this.buffers.push(data)
            controller.enqueue(data)
          },
          flush: () => {
            sendMessage({
              status: 'done',
              buffers: this.buffers
            })
          }
        })
      )
      .pipeTo(
        new WritableStream({
          write(frame: VideoFrame) {
            // renderFrame(frame)
          }
        })
      )
  }
}
