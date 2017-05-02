let m = 0
let start = 0
let i = 0
let timeOut = 0
let corner = 0
let NeoColor = 0
let Neo: neopixel.Strip = null
let freq = 0
let length = 0
let mistake = false
let gap = 0
let init = 0
let level = 0
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
            null
        }
        basic.pause(500)
        init = 0
    } else {
        control.reset()
    }
})
let pitch =[0]
pitch =[311, 415, 247, 208, 42]
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
corner = 0
let sequence =[0]
while (init == 1) {
    basic.showNumber(level)
}
switch (level) {
    case 1:
    length = 8 - 1
    break
    case 2:
    length = 14 - 1
    break
    case 3:
    length = 20 - 1
    break
    case 4:
    length = 31 - 1
}
setSequence()
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
    // Sound / show the current sequence
    for (let j = 0; j <= i; j++) {
        null
    }
    // custom.Victory()
    start = input.runningTime()
    while (!(mistake) && i <= length) {
        if (pins.digitalReadPin(DigitalPin.P16) == 0) {
            Simon.checkPress(0)
        }
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            Simon.checkPress(1)
        }
        if (pins.digitalReadPin(DigitalPin.P2) == 0) {
            Simon.checkPress(2)
        }
        if (pins.digitalReadPin(DigitalPin.P12) == 0) {
            Simon.checkPress(3)
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
                if (i >= length) {
                    for (let l = 0; l <= 2; l++) {
                        for (let i02 = 0; i02 <= 3; i02++) {
                            null
                        }
                    }
                    for (let i1 = 0; i1 <= 1; i1++) {
                        null
                    }
                    null
                }
            }
            break;
        }
    }
}
basic.pause(500)
if (mistake) {
    basic.showIcon(IconNames.Sad)
    // custom.Victory()
    basic.pause(100)
    basic.showNumber(i - 1)
} else {
    basic.showIcon(IconNames.Happy)
    null
    // music.beginMelody(music.builtInMelody(Melodies.Entertainer),
    // MelodyOptions.Once)
    basic.pause(100)
    basic.showNumber(i)
}
function setSequence(): void {
    //Create a random sequence of (lights)
    sequence =[] //Clear any previous sequence in memory
    for (let n = 0; n < length; n++) {
        sequence.push(Math.random(4))
    }
}
