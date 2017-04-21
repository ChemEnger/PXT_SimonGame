
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://pxt.microbit.org/blocks/custom
 */

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * Sounds the beeper and lights LED
     * for the 'corner' specified
     */
    //% block
    export function LightBeep(corner: number) {
        switch (corner) {
            case 0:
                //Green
                NeoColor = 0x00FF00
                freq = 415
                break
            case 1:
                //Red
                NeoColor = 0xFF0000
                freq = 310
                break
            case 2:
                //Yellow
                NeoColor = 0xFFFF00
                freq = 252
                break
            case 3:
                //Blue
                NeoColor = 0x0000FF
                freq = 209
        }
        //Change the tone if a mistake is made, but keep the light the same
        if (mistake) {
            freq = 42
            gap = 2000
        }
        Neo.setPixelColor(corner, neopixel.colors(NeoColor)) //Set the chosen LED number & colour
        Neo.show() //Display the chosen LED
        music.playTone(freq, music.beat(gap)) //Play a note at freq Hz for 'gap' ms
        //pins.analogPitch(freq, gap)
        Neo.clear()
        Neo.show()
        basic.pause(50) //0.05 second pause between each light / tone
    }
}
