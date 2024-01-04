import { createFile, DataStream } from 'mp4box'

interface RunParams {
  onConfig: (config: VideoDecoderConfig) => void
  onChunk: (chunk: EncodedVideoChunk) => any
}

type Copy = ArrayBufferLike & {
  fileStart: number
}

export default class MP4Demuxer {
  private onConfig: (config: VideoDecoderConfig) => void
  private onChunck: (chunk: EncodedVideoChunk) => any
  private file: any

  async run(
    stream: ReadableStream<Uint8Array>,
    { onConfig, onChunk }: RunParams
  ) {
    this.onConfig = onConfig
    this.onChunck = onChunk
    this.file = createFile()

    this.file.onReady = this.onReady.bind(this)

    this.file.onSamples = this.onSamples.bind(this)

    this.file.onError = (error: any) => {
      console.error('error MP4Demuxer', error)
    }

    return this.init(stream)
  }

  private descriptions(track: any) {
    const trak = this.file.getTrackById(track.id)
    for (const entry of track.mdia.minf.stbl.stsd.entries) {
      const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C
      if (box) {
        const stream = new DataStream(undefined, 0, DataStream.BIG_ENDIAN)
        box.write(stream)
        return new Uint8Array(stream.buffer, 8)
      }
    }
    throw new Error('avcC, hvcC, vpcC, or av1C box not found')
  }

  private onSamples(trackId: number, ref: null | undefined, samples: any[]) {
    for (const sample of samples) {
      this.onChunck(
        new EncodedVideoChunk({
          type: sample.is_sync ? 'key' : 'delta',
          timestamp: (1e6 * sample.cts) / sample.timescale,
          duration: (1e6 * sample.duration) / sample.timescale,
          data: sample.data
        })
      )
    }
  }

  private onReady(info: any) {
    const [track] = info.videoTracks
    this.onConfig({
      track
    })

    this.file.setExtractionOptions(track.id)
    this.file.start()
  }

  private async init(stream: ReadableStream<Uint8Array>) {
    let _offset = 0

    const consumeFile = new WritableStream({
      write: (chunk: Uint8Array) => {
        const copy: Copy = chunk.buffer as Copy
        copy.fileStart = _offset
        this.file.appendBuffer(copy)

        _offset += chunk.length
      },
      close: () => {
        this.file.flush()
      }
    })

    return stream.pipeTo(consumeFile)
  }
}
