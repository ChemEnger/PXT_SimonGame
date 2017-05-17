let timeOut = 0
let start = 0
let i = 0
let m = 0
let NeoColor = 0
let Neo: neopixel.Strip = null
let freq = 0
let length = 0
let mistake = false
let level = 0
let gap = 0
let init = 0
input.onButtonPressed(Button.A, () => {
    if (init == 1) {
        level = Math.max(1, level - 1)
    }
})
input.onButtonPressed(Button.B, () => {
    if (init == 1) {
        level = Math.min(4, level + 1)
    }
})
input.onButtonPressed(Button.AB, () => {
    if (init == 1) {
        for (let k = 0; k <= 3; k++) {
            custom.LightBeep(k)
        }
        basic.pause(500)
        init = 0
    } else {
        control.reset()
    }
})
init = 1
gap = 0
// A boolean to flag a mistake in repeating the
// sequence
mistake = false
// The number of guesses to be completed for the
// difficulty level
length = 0
// The sound frequency
freq = 0
pins.analogSetPitchPin(AnalogPin.P0)
Neo = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB)
level = 1
NeoColor = 0
let sequence = [0]
while (init == 1) {
    basic.showNumber(level)
}
switch (level) {
    case 1:
        length = 8
        break
    case 2:
        length = 14
        break
    case 3:
        length = 20
        break
    case 4:
        length = 31
}
setSequence()   //Create a full sequence, depending on the level
m = 0
timeOut = 3000
while (!(mistake)) {
    // Make the tones shorter for higher difficulty
    if (i <= 5) {
        gap = 420
    } else if (i >= 6 && i <= 13) {
        gap = 320
    } else {
        gap = 220
    }
    //Sound / show the current sequence
    for (let j = 0; j <= i; j++) {
        Simon.LEDBeep(sequence[j],420,50)
    }
    start = input.runningTime()
    while (!(mistake) && i <= length) {
        if (pins.digitalReadPin(DigitalPin.P16) == 0) {
            checkPress(0)
        }
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            checkPress(1)
        }
        if (pins.digitalReadPin(DigitalPin.P2) == 0) {
            checkPress(2)
        }
        if (pins.digitalReadPin(DigitalPin.P12) == 0) {
            checkPress(3)
        }
        if (input.runningTime() - start > timeOut) {
            mistake = true
        }
        if (m >= i + 1) {
            i += 1
            m = 0
            if (!(mistake)) {
                basic.pause(200)
                basic.showIcon(IconNames.Happy)
                basic.pause(600)
                basic.clearScreen()
            }
            break;
        }
    }
    if (i >= length) {
        break;
    }
}
basic.pause(500)
if (mistake) {
    basic.showIcon(IconNames.Sad)
    music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
    basic.pause(100)
    basic.showNumber(i - 1)
} else {
    basic.showIcon(IconNames.Happy)
    music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
    basic.pause(100)
    basic.showNumber(i)
}
function setSequence(): void {
    //Create a random sequence of (lights)
    sequence = [] //Clear any previous sequence in memory
    for (let l = 0; l < length; l++) {
        sequence.push(Math.random(4))
    }
}
function checkPress(pressed: number): void {
    //Check if the button pressed is correct
    mistake = (pressed != sequence[m])
    m += 1
    Simon.LEDBeep(pressed,420,50)
    //Reset the timeOut timer each time a button is pressed
    start = input.runningTime()
}
