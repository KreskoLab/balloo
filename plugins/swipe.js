export default class TouchEvent {
  static SWPIE_THRESHOLD = 10 // Minumum difference in pixels at which a swipe gesture is detected

  static SWIPE_LEFT = 1
  static SWIPE_RIGHT = 2
  static SWIPE_UP = 3
  static SWIPE_DOWN = 4

  constructor(startEvent, endEvent) {
    this.startEvent = startEvent
    this.endEvent = endEvent || null
  }

  isSwipeLeft() {
    return this.getSwipeDirection() === TouchEvent.SWIPE_LEFT
  }

  isSwipeRight() {
    return this.getSwipeDirection() === TouchEvent.SWIPE_RIGHT
  }

  isSwipeUp() {
    return this.getSwipeDirection() === TouchEvent.SWIPE_UP
  }

  isSwipeDown() {
    return this.getSwipeDirection() === TouchEvent.SWIPE_DOWN
  }

  getSwipeDirection() {
    const start = this.startEvent.changedTouches[0]
    const end = this.endEvent.changedTouches[0]

    if (!start || !end) {
      return null
    }

    const horizontalDifference = start.screenX - end.screenX
    const verticalDifference = start.screenY - end.screenY

    // Horizontal difference dominates
    if (Math.abs(horizontalDifference) > Math.abs(verticalDifference)) {
      if (horizontalDifference >= TouchEvent.SWPIE_THRESHOLD) {
        return TouchEvent.SWIPE_LEFT
      } else if (horizontalDifference <= -TouchEvent.SWPIE_THRESHOLD) {
        return TouchEvent.SWIPE_RIGHT
      }

      // Verical or no difference dominates
    } else if (verticalDifference >= TouchEvent.SWPIE_THRESHOLD) {
      return TouchEvent.SWIPE_UP
    } else if (verticalDifference <= -TouchEvent.SWPIE_THRESHOLD) {
      return TouchEvent.SWIPE_DOWN
    }

    return null
  }

  setEndEvent(endEvent) {
    this.endEvent = endEvent
  }
}