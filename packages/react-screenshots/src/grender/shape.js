import Events from './events'

export default class Shape extends Events {
  x = 0
  y = 0
  scale = [1, 1]
  rotate = 0
  constructor () {
    super(
      'click',
      'dbclick',
      'mouseenter',
      'mousemove',
      'mouseleave',
      'mousedown',
      'mouseup',
      'mouseover',
      'contextmenu'
    )
  }
}
