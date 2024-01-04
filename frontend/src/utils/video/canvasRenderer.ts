export default class CanvasRenderer {
  private canvas: OffscreenCanvas
  private ctx: OffscreenCanvasRenderingContext2D | null

  constructor(canvas: OffscreenCanvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  draw(frame: VideoFrame) {
    const { displayHeight, displayWidth } = frame

    this.canvas.width = displayWidth
    this.canvas.height = displayHeight
    this.ctx?.drawImage(frame, 0, 0, displayWidth, displayHeight)
    frame.close()
  }

  getRenderer() {
    const renderer = this
    let pendingFrame: VideoFrame | null = null

    return (frame: VideoFrame) => {
      const rendererAnimationFrame = () => {
        renderer.draw(pendingFrame!)
        pendingFrame = null
      }

      if (!pendingFrame) {
        requestAnimationFrame(rendererAnimationFrame)
      } else {
        pendingFrame.close()
      }

      pendingFrame = frame
    }
  }
}
