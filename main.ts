namespace myRobot {
    /**
     * Menyalakan LED custom
     */
    //% block="nyalakan lampu robot"
    export function nyalakanLampu(): void {
        basic.showIcon(IconNames.Yes)
    }

    /**
     * Fungsi dengan parameter angka
     */
    //% block="gerak maju dengan kecepatan %speed"
    //% speed.min=0 speed.max=100
    export function gerakMaju(speed: number): void {
        // logika gerak motor di sini
        basic.showNumber(speed)
    }
}
myRobot.nyalakanLampu()
