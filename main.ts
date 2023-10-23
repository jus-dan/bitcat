input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    DFPlayerPro.MP3_playFilePathName("1.mp3")
})
input.onButtonPressed(Button.A, function () {
    strip.showRainbow(1, 360)
    strip.show()
})
input.onPinPressed(TouchPin.P2, function () {
    DFPlayerPro.MP3_playFilePathName("2.mp3")
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . #
        `)
    basic.clearScreen()
    animate = 1
})
input.onGesture(Gesture.Shake, function () {
    strip.clear()
    DFPlayerPro.MP3_control(DFPlayerPro.ControlType.playPause)
})
input.onButtonPressed(Button.B, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Green))
    strip.show()
})
input.onPinPressed(TouchPin.P1, function () {
    DFPlayerPro.MP3_playFilePathName("3.mp3")
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . #
        `)
    basic.clearScreen()
    animate = 1
})
let temp = 0
let animate = 0
let strip: neopixel.Strip = null
let booted = 0
basic.showIcon(IconNames.No)
music.setVolume(255)
DFPlayerPro.MP3_setSerial(SerialPin.P16, SerialPin.P8)
DFPlayerPro.MP3_ledMode(DFPlayerPro.ledType.ledOff)
DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.playOneSongAndPause)
let lautstärke = 10
DFPlayerPro.MP3_setVol(lautstärke)
strip = neopixel.create(DigitalPin.P9, 6, NeoPixelMode.RGB)
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
basic.forever(function () {
    temp = Math.round(Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, 0, 30))
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
