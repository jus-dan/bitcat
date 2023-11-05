input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	
})
function Starte () {
    basic.clearScreen()
    booted = 0
    DFPlayerPro.MP3_setSerial(SerialPin.P16, SerialPin.P8)
    DFPlayerPro.MP3_ledMode(DFPlayerPro.ledType.ledOff)
    DFPlayerPro.MP3_promtMode(DFPlayerPro.PromtType.promtOff)
    DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.playOneSongAndPause)
    lautstärke = 10
    DFPlayerPro.MP3_setVol(lautstärke)
    strip = neopixel.create(DigitalPin.P9, 7, NeoPixelMode.RGB)
    strip.setBrightness(60)
    animate = 0
    booted = 1
    basic.showLeds(`
        . . . . .
        # . . . #
        # # # # #
        . # # # .
        . . . . .
        `)
}
input.onButtonPressed(Button.A, function () {
    strip.showRainbow(1, 360)
    strip.show()
})
input.onPinPressed(TouchPin.P2, function () {
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . #
        `)
    basic.clearScreen()
    animate = 1
    DFPlayerPro.MP3_playFilePathName("dog.mp3")
})
input.onGesture(Gesture.Shake, function () {
    strip.clear()
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    Starte()
})
input.onButtonPressed(Button.B, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Green))
    strip.show()
})
input.onPinPressed(TouchPin.P1, function () {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . #
        `)
    basic.clearScreen()
    animate = 1
    DFPlayerPro.MP3_playFilePathName("cat.mp3")
})
let temp = 0
let animate = 0
let strip: neopixel.Strip = null
let lautstärke = 0
let booted = 0
Starte()
basic.forever(function () {
    temp = Math.round(Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, 0, 20))
    if (temp != lautstärke) {
        lautstärke = temp
        DFPlayerPro.MP3_setVol(lautstärke)
    }
    basic.pause(50)
})
basic.forever(function () {
    if (booted == 1) {
        strip.rotate(1)
        strip.show()
        basic.pause(200)
    }
})
basic.forever(function () {
    if (animate == 1) {
        for (let index = 0; index < 4; index++) {
            basic.showLeds(`
                # . . . #
                # # # # #
                # . . . #
                . # # # .
                . . . . .
                `)
            basic.showLeds(`
                . . . . .
                # . . . #
                # # # # #
                . # # # .
                . . . . .
                `)
        }
        animate = 0
    }
})
