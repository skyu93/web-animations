import Star from './Star.js';

const NUMBER_OF_STARTS = 300
const space = document.querySelector('.space')
let targetPoint = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5
};
const starts = Array.from({ length: NUMBER_OF_STARTS }).map((_,i) => new Star(space, i, { ...targetPoint }))
const generateEffects = () => {
    return starts.map(star => star.generateEffect({...targetPoint}))
}

let animation = new Animation(new GroupEffect(generateEffects()), document.timeline)
animation.play()

window.addEventListener('resize', () => {
    animation = new Animation(new GroupEffect(generateEffects()), document.timeline);
    animation.play();
});
