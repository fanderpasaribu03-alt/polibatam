enum MyMotor {
    //% block="kiri"
    Left,
    //% block="kanan"
    Right
}
enum MyDirection {
    //% block="maju"
    Forward,
    //% block="mundur"
    Backward
}
enum RgbColor {
    //% block="merah"
    Red,
    //% block="hijau"
    Green,
    //% block="biru"
    Blue,
    //% block="mati"
    Off
}
namespace myRobotPlus {

    // ---------- KONFIGURASI PIN (SESUAIKAN!) ----------
    const PIN_MOTOR_KIRI = AnalogPin.P0
    const PIN_MOTOR_KANAN = AnalogPin.P1
    const PIN_ARAH_KIRI = DigitalPin.P8
    const PIN_ARAH_KANAN = DigitalPin.P12
    const PIN_TRIG = DigitalPin.P13
    const PIN_ECHO = DigitalPin.P14
    const PIN_LINE_KIRI = DigitalPin.P15
    const PIN_LINE_KANAN = DigitalPin.P16
    const PIN_BUZZER = AnalogPin.P2

    // ================= MOTOR =================
    /**
     * Menggerakkan motor tertentu dengan arah dan kecepatan
     */
    //% block="gerakkan motor %motor arah %direction kecepatan %speed"
    //% speed.min=0 speed.max=100
    export function gerakMotor(motor: MyMotor, direction: MyDirection, speed: number): void {
        let pwm = Math.map(speed, 0, 100, 0, 1023)
        let arahPin = motor == MyMotor.Left ? PIN_ARAH_KIRI : PIN_ARAH_KANAN
        let speedPin = motor == MyMotor.Left ? PIN_MOTOR_KIRI : PIN_MOTOR_KANAN

        pins.digitalWritePin(arahPin, direction == MyDirection.Forward ? 1 : 0)
        pins.analogWritePin(speedPin, pwm)
    }

    /**
     * Menghentikan motor tertentu
     */
    //% block="hentikan motor %motor"
    export function stopMotor(motor: MyMotor): void {
        let speedPin2 = motor == MyMotor.Left ? PIN_MOTOR_KIRI : PIN_MOTOR_KANAN
        pins.analogWritePin(speedPin2, 0)
    }

    /**
     * Menghentikan semua motor sekaligus
     */
    //% block="hentikan semua motor"
    export function stopSemuaMotor(): void {
        pins.analogWritePin(PIN_MOTOR_KIRI, 0)
        pins.analogWritePin(PIN_MOTOR_KANAN, 0)
    }

    // ================= ULTRASONIC =================
    /**
     * Membaca jarak dari sensor ultrasonic (dalam cm)
     */
    //% block="baca jarak (cm)"
    export function bacaJarak(): number {
        pins.digitalWritePin(PIN_TRIG, 0)
        control.waitMicros(2)
        pins.digitalWritePin(PIN_TRIG, 1)
        control.waitMicros(10)
        pins.digitalWritePin(PIN_TRIG, 0)

        let durasi = pins.pulseIn(PIN_ECHO, PulseValue.High, 25000)
        let jarak = durasi * 0.034 / 2
        return Math.round(jarak)
    }

    // ================= LINE TRACKING =================
    /**
     * Membaca status sensor line-tracking kiri (true = kena garis)
     */
    //% block="sensor garis kiri terdeteksi"
    export function sensorGarisKiri(): boolean {
        return pins.digitalReadPin(PIN_LINE_KIRI) == 1
    }

    /**
     * Membaca status sensor line-tracking kanan (true = kena garis)
     */
    //% block="sensor garis kanan terdeteksi"
    export function sensorGarisKanan(): boolean {
        return pins.digitalReadPin(PIN_LINE_KANAN) == 1
    }

    // ================= LED RGB =================
    /**
     * Menyalakan LED RGB dengan warna tertentu
     * (Catatan: ini contoh dasar pakai 3 pin R-G-B terpisah,
     * sesuaikan kalau LED kamu pakai chip seperti WS2812/Neopixel)
     */
    //% block="nyalakan LED warna %color"
    export function nyalakanLED(color: RgbColor): void {
        // Contoh sederhana - sesuaikan dengan wiring LED kamu
        basic.showIcon(IconNames.Yes)
    }

    // ================= BUZZER =================
    /**
     * Membunyikan buzzer dengan frekuensi tertentu selama X ms
     */
    //% block="bunyikan buzzer frekuensi %freq selama %durasi ms"
    //% freq.min=100 freq.max=5000 durasi.min=100 durasi.max=5000
    export function bunyikanBuzzer(freq: number, durasi: number): void {
        pins.analogSetPitchPin(PIN_BUZZER)
        music.playTone(freq, durasi)
    }
}
