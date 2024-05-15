import Star from './Star.js';

const NUMBER_OF_STARTS = 500
const space = document.querySelector('.space')
const currentCenter = () => ({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5
});
let targetPoint = currentCenter()
const starts = Array.from({ length: NUMBER_OF_STARTS }).map((_,i) => new Star(space, i, { ...targetPoint }))

const animationByStar = (star) => {
    const playAnimation = () => {
        const keyframeEffect = star.generateEffect({... targetPoint });
        const animation = new Animation(keyframeEffect, document.timeline);
        animation.onfinish = playAnimation;
        animation.play();
    }
    playAnimation();
}
starts.forEach(animationByStar)

document.addEventListener('resize', () => {
    targetPoint = currentCenter();
});
document.addEventListener('touchstart', (evt) => {
    const [touch] = evt.touches;
    targetPoint = {
        x: touch.clientX,
        y: touch.clientY
    };
});
document.addEventListener('mouseleave', () => {
    targetPoint = currentCenter();
});
document.addEventListener('mousemove', (evt) => {
    targetPoint = {
        x: evt.clientX,
        y: evt.clientY
    };
});
