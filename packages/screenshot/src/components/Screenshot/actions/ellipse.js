import React from 'react'
import Action from './action'
import SizeColor from '../SizeColor'

export default class Ellipse extends Action {
  static title = '圆形'

  static icon = 'screenshot-icon-ellipse'

  ellipse = null

  constructor (props) {
    super(props)
    props.setContext({ cursor: 'crosshair' })
  }

  mousedown = (e, { el, ctx, context, setContext }) => {
    const { left, top } = el.getBoundingClientRect()
    const { size, color } = this.state
    this.ellipse = {
      size,
      color,
      x1: e.clientX - left,
      y1: e.clientY - top,
      x2: e.clientX - left,
      y2: e.clientY - top,
      draw: this.draw
    }
    const { stack } = context
    stack.push(this.ellipse)
    setContext({ stack: [...stack] })
  }

  mousemove = (e, { el, ctx, context, setContext }) => {
    if (this.ellipse) {
      const { left, top, width, height } = el.getBoundingClientRect()
      let x = e.clientX - left
      let y = e.clientY - top
      if (x < 0) x = 0
      if (y < 0) y = 0
      if (x > width) x = width
      if (y > height) y = height
      this.ellipse.x2 = x
      this.ellipse.y2 = y
      setContext({ stack: [...context.stack] })
    }
  }

  mouseup = (e, { el, ctx, context, setContext }) => {
    if (this.ellipse) {
      this.ellipse = null
    }
  }

  draw (ctx, { size, color, x1, x2, y1, y2 }) {
    ctx.lineCap = 'butt'
    ctx.lineJoin = 'miter'
    ctx.lineWidth = size
    ctx.strokeStyle = color
    if (x1 > x2) {
      const x = x1
      x1 = x2
      x2 = x
    }
    if (y1 > y2) {
      const y = y1
      y1 = y2
      y2 = y
    }
    const x = (x1 + x2) / 2
    const y = (y1 + y2) / 2
    const a = (x2 - x1) / 2
    const b = (y2 - y1) / 2
    const r = a < b ? a : b
    // 横轴缩放比率
    const rx = a / r
    // 纵轴缩放比率
    const ry = b / r
    ctx.save()
    ctx.beginPath()
    // 把圆形缩放为椭圆
    ctx.scale(rx, ry)
    ctx.arc(x / rx, y / ry, r, 0, 2 * Math.PI)
    ctx.restore()
    ctx.closePath()
    ctx.stroke()
  }

  onSizeChange = size => {
    this.setState({
      size
    })
  }

  onColorChange = color => {
    this.setState({
      color
    })
  }

  render () {
    const { size, color } = this.state
    return (
      <SizeColor
        size={size}
        color={color}
        onSizeChange={this.onSizeChange}
        onColorChange={this.onColorChange}
      />
    )
  }
}