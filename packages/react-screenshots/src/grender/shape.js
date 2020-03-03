import Events from './events'

export default class Shape extends Events {
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
