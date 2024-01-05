import { encoderConfig144 as encoderConfig } from '@/utils/constants'
import CanvasRenderer from '@/utils/video/canvasRenderer'
import MP4Demuxer from '@/utils/video/mp4Demuxer'
import VideoProcessor from '@/utils/video/videoProcessor'
import WebMWriter from '@/utils/deps/webm-writer2'

const webMWriterConfig = {
  codec: 'VP9',
  width: encoderConfig.width,
  height: encoderConfig.height,
  bitrate: encoderConfig.bitrate
}

const mp4Demuxer = new MP4Demuxer()
const webMWriter = new WebMWriter(webMWriterConfig)
const videoProcessor = new VideoProcessor({ mp4Demuxer, webMWriter })

onmessage = async ({
  data
}: MessageEvent<{
  video: File | null
  canvas: OffscreenCanvas | undefined
}>) => {
  if (!data.video) {
    self.postMessage({
      status: 'error',
      error: 'Video or Thumb null or undefined'
    })
    return
  }

  const renderFrame = data.canvas
    ? CanvasRenderer.getRenderer(data.canvas)
    : undefined
  await videoProcessor.start({
    video: data.video,
    renderFrame,
    encoderConfig: encoderConfig as VideoEncoderConfig,
    sendMessage(message) {
      self.postMessage(message)
    }
  })
  console.log('a 144')
}
