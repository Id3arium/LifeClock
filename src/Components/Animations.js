import anime from 'animejs';

export const animateIntro = () => { return anime.timeline({
    easing: 'linear',
  })
  .add({
    targets: 'h2, h3',
    translateY: [-50,0],
    opacity: [0, 1],
    delay: anime.stagger(2500, {start:1500}),
  })
  .add({
    targets: '.header > p, .date-picker',
    opacity: [0, 1],
    duration: 750,
    delay: 1500,
  })
}

export const animateContent = (onChangeBegin, ref) => {
    return anime.timeline({  })
    .add({
        targets: '.cards-wrapper > *',
        duration: anime.stagger(100, {from: 'center', start:250, easing: 'linear'}),
        delay: anime.stagger(100, {from: 'center' , start:250, easing: 'linear'}),
        translateX: [anime.stagger([500,-500]),0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
    })
    .add({
        targets: '.footer > *',
        translateY: [-25,0],
        opacity: [0, 1],
        delay: anime.stagger(3500, {start:10000}),
        easing: 'easeOutQuad',
        changeBegin: (anim) => {
            onChangeBegin(ref)
        }
    })
}