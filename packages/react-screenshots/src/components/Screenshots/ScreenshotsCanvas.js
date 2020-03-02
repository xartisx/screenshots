import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useCallback
} from 'react'
import ScreenshotContext from './ScreenshotsContext'
import useWindowMouseMove from '../hooks/useWindowMouseMove'
import useWindowMouseUp from '../hooks/useWindowMouseUp'

export default function ScreenshotsCanvas ({ onChange }) {
  const canvasRef = useRef(null)
  const [point, setPoint] = useState(null)

  const { width, height, image, viewer, setContext } = useContext(
    ScreenshotContext
  )

  // 绘制图图片背景
  useEffect(() => {
    if (!image || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    ctx.width = width
    ctx.height = height
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(
      image.el,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      width,
      height
    )
  }, [width, height, image])

  // 鼠标事件
  const mouseDown = e => {
    if (viewer || e.button !== 0) return
    setContext({
      viewer: null,
      action: null,
      stack: [],
      state: {},
      cursor: null
    })
    setPoint({ x: e.clientX, y: e.clientY })
  }

  // 鼠标移动事件
  useWindowMouseMove(
    useCallback(
      e => {
        if (!point) return
        onChange({
          x1: point.x,
          y1: point.y,
          x2: e.clientX,
          y2: e.clientY
        })
      },
      [onChange, point]
    )
  )

  // 鼠标抬起事件
  useWindowMouseUp(
    useCallback(
      e => {
        if (!point) return
        setPoint(null)
      },
      [point]
    )
  )

  return (
    <div className="screenshots-canvas" onMouseDown={mouseDown}>
      <canvas ref={canvasRef} width={width} height={height} />
      <div className="screenshots-canvas-mask" />
    </div>
  )
}
