const zModifier = window.innerHeight
const calc3DPoint = (target, x, y, z) => {
    const scale = zModifier / (zModifier + z)
    const x3D = x * scale + target.x
    const y3D = y * scale + target.y
    return [x3D, y3D, scale]
}
const getRandom3DPoint = (target) => {
    const x = Math.random() * window.innerWidth - target.x
    const y = Math.random() * window.innerHeight - target.y
    const z = Math.random() * zModifier
    return [x, y, z]
}
export default class Star {
    pointFrom = [0,0,0]
    pointTo = [0,0,0]
    constructor(target, index, point) {
        this.el = document.createElement('div')
        this.el.classList.add('star')
        this.el.innerHTML = index
        this.setupAnimation(point)
        target.append(this.el)
    }

    setupAnimation(point) {
        const [x, y, z] = getRandom3DPoint(point)
        this.pointFrom = calc3DPoint(point, x, y, z)
        this.pointTo = calc3DPoint(point, x, y, z - zModifier)
    }

    get keyframes(){
        return [
            {
                transform: `
                            translate(${this.pointFrom[0]}px, ${this.pointFrom[1]}px)
                            scale(${this.pointFrom[2]})
                        `,
            },
            {
                transform: `
                            translate(${this.pointTo[0]}px, ${this.pointTo[1]}px)
                            scale(${this.pointTo[2]})
                        `,
            }
        ]
    }
}
