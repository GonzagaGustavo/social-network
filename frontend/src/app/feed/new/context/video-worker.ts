import { encoderConfig } from '@/utils/constants'
import MP4Demuxer from '@/utils/video/mp4Demuxer'
import VideoProcessor from '@/utils/video/videoProcessor'

const mp4Demuxer = new MP4Demuxer()
const videoProcessor = new VideoProcessor({ mp4Demuxer })

onmessage = ({
  data
}: MessageEvent<{ video: File | null; thumb: File | null }>) => {
  if (!data.video || !data.thumb) {
    self.postMessage({ error: 'Video or Thumb null' })
    return
  }

  videoProcessor.start({
    video: data.video,
    encoderConfig: encoderConfig,
    sendMessage(message) {
      self.postMessage(message)
    }
  })
}
