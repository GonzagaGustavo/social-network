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

  constructor({ mp4Demuxer }: { mp4Demuxer: MP4Demuxer }) {
    this.mp4Demuxer = mp4Demuxer
  }

  async mp4Decoder(
    encoderConfig: EncoderConfig,
    stream: ReadableStream<Uint8Array>
  ) {
    this.mp4Demuxer.run(stream, {
      onConfig(config) {},
      onChunk(chunk) {}
    })
  }

  async start({
    video,
    encoderConfig
  }: {
    video: File
    encoderConfig: EncoderConfig
    sendMessage(message: any): void
  }) {
    const stream = video.stream()
    const fileName = video.name.split('/').pop()?.replace('.mp4', '')
    await this.mp4Decoder(encoderConfig, stream)
  }
}
