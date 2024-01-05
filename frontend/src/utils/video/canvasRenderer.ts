let _canvas: OffscreenCanvas
let _ctx: OffscreenCanvasRenderingContext2D | null
export default class CanvasRenderer {
  static draw(frame: VideoFrame) {
    const { displayHeight, displayWidth } = frame

    _canvas.width = displayWidth
    _canvas.height = displayHeight
    _ctx?.drawImage(frame, 0, 0, displayWidth, displayHeight)
    frame.close()
  }

  static getRenderer(canvas: OffscreenCanvas) {
    const renderer = this
    let pendingFrame: VideoFrame | null = null
    _canvas = canvas
    _ctx = canvas.getContext('2d')

    return (frame: VideoFrame) => {
      const renderAnimationFrame = () => {
        renderer.draw(pendingFrame!)
        pendingFrame = null
      }

      if (!pendingFrame) {
        requestAnimationFrame(renderAnimationFrame)
      } else {
        pendingFrame.close()
      }

      pendingFrame = frame
    }
  }
}
