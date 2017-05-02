
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://pxt.microbit.org/blocks/custom
 */

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace Simon {

    /**
     * Show selected NeoPixel LED with associated tone
     * @param pad LED to light, eg: 1
     * @param duration length of the tone (ms), eg: 20
     * @param wait pause after the tone has played (ms), eg: 20
     */
    //% block
    export function LEDBeep(pad: number, duration: number, wait: number) {
        //if (pad == 4) {
        //for (let i = 0; i <= 3; i++) {
        //NeoOn(i)
        //Beep(pad, duration / 2)
        //NeoOff()
        //}
        //} else {
        NeoOn(pad)
        Beep(pad, duration)
        if (wait > 0) {
            basic.pause(wait)
        }
        NeoOff()
        //}

    }

    /**
     * Show selected NeoPixel LED
     * @param pad LED to light, eg: 1
     */
    //% block
    export function NeoOn(pad: number) {
        let NeoColor = 0
        switch (pad) {
            case 0:
                NeoColor = NeoPixelColors.Green
                break
            case 1:
                NeoColor = NeoPixelColors.Red
                break
            case 2:
                NeoColor = NeoPixelColors.Yellow
                break
            case 3:
                NeoColor = NeoPixelColors.Blue
        }
        Neo.setPixelColor(pad, NeoColor)
        Neo.show()
    }

    /**
     * Clear all NeoPixel LEDs
     */
    //% block
    export function NeoOff() {
        Neo.clear()
        Neo.show()
    }

    /**
     * Play tone associated with the given pad
     * @param pad pad activated, eg: 1
     * @param duration length of the tone (ms), eg: 420
     */
    //% block
    export function Beep(pad: number, duration: number) {
        let tone = 0
        if (mistake) { tone = 42 } else { tone = pitch[pad] }
        music.playTone(tone, duration)
    }

    /**
     * Special error tone for winning sequence
     */
    //% block
    export function EndBuzz() {
        let j = 0
        for (let i = 2; i <= 11; i++) {
            j = i % 4
            Simon.NeoOn(j)
            pins.analogPitch(42, 100)
            Simon.NeoOff()
        }
    }
    /**
     * React to a pad being tapped, checking to see if it's the correct result
     * @param p pad activated, eg: 0
     */
    //% block
    export function checkPress(p: number) {
        //Check if the button pressed is correct
        mistake = (p != sequence[m])
        m += 1
        Simon.LEDBeep(p, gap, 80)
        //Reset the timeOut timer each time a button is pressed
        start = input.runningTime()
    }
}
