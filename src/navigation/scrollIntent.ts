/** A gesture must be sustained, not just a single large wheel delta. */
export const SCENE_DURATION = 760;
export const GESTURE_GAP = 190;
export const GESTURE_HOLD = 240;
export const WHEEL_DISTANCE = 180;
export const TOUCH_DISTANCE = 72;
export class ScrollIntent {
  private started = 0;
  private last = -Infinity;
  private distance = 0;
  private direction = 0;
  private samples = 0;
  reset() { this.started = 0; this.last = -Infinity; this.distance = 0; this.direction = 0; this.samples = 0; }
  feed(delta: number, now: number, touch = false) {
    const sign = Math.sign(delta);
    if (!sign) return { direction: 0, progress: 0 };
    if (sign !== this.direction || now - this.last > GESTURE_GAP) {
      this.started = now; this.distance = 0; this.samples = 0; this.direction = sign;
    }
    this.last = now;
    this.distance += Math.min(Math.abs(delta), touch ? 48 : 90);
    this.samples++;
    const progress = Math.min(1, this.distance / (touch ? TOUCH_DISTANCE : WHEEL_DISTANCE), (now - this.started) / GESTURE_HOLD, this.samples / 3);
    if (progress >= 1) { this.reset(); return { direction: sign, progress: 1 }; }
    return { direction: 0, progress };
  }
}
