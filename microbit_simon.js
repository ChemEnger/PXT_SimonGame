let gap = 0
let delay = 0
let NeoColor = 0
let level = 0
let light = 0
let Neo: neopixel.Strip = null
let length = 0
let intButton = 0
let freq = 0
let init = 0
basic.forever(() => {
    // Pin 16 = A (Green)
    if (pins.digitalReadPin(DigitalPin.P16) == 1) {
        basic.pause(100)
        basic.showIcon(IconNames.Heart)
    } else {

    }
})
pins.onPulsed(DigitalPin.P2, PulseValue.Low, () => {
    basic.showNumber(pins.pulseIn(DigitalPin.P2, PulseValue.Low))
    intButton = 1
    basic.pause(100)
})
init = 1    //Go into 'initialise' mode
freq = 0
pins.analogSetPitchPin(AnalogPin.P0)
length = 31     //The maximum number of 'rounds' of the game
Neo = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB)   //Set Pin (8) for the AdaFruit NeoPixel output
light = 0
level = 1
NeoColor = 0
delay = (5 - level) * 200
let sequence =[0]
setSequence()
init = 0
for (let i = 0; i <= 31 - 1; i++) {
    showSequence(i)
    if (i <= 5) {
        gap = 420
    } else if (i >= 6 && i <= 13) {
        gap = 320
    } else {
        gap = 220
    }
    basic.pause(delay)
}
function setSequence() {        //Create a random sequence of (lights)
    sequence =[]
    for (let j = 1; j < 31; j++) {
        sequence.push(Math.random(4))
    }
    return sequence
}
function showSequence(length: number): void {
    for (let k = 0; k <= length; k++) {
        light = sequence[k]
        switch (light) {
            case 0:
            //Green
            NeoColor = 0x00FF00
            freq = 415
            break;
            case 1:
            //Red
            NeoColor = 0xFF0000
            freq = 310
            break;
            case 2:
            //Yellow
            NeoColor = 0xFFFF00
            freq = 252
            break;
            case 3:
            //Blue
            NeoColor = 0x0000FF
            freq = 209
        }
        Neo.setPixelColor(light, neopixel.colors(NeoColor))     //Set the chosen LED number & colour
        Neo.show()      //Display the chosen LED
        music.playTone(freq, music.beat(gap))   //Play a note at freq Hz for 'gap' ms
        //pins.analogPitch(freq, gap)
        Neo.clear()
        Neo.show()
        basic.pause(50) //0.05 second pause between each light / tone
    }
}
