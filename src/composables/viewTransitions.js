import gsap from 'gsap';

export const enterView = (element) => {
    gsap.from(element, {
        autoAlpha: 0,
        yPercent: -10,
        duration: 1,
        ease: "expo.inOut",
    });
}

export const leaveView = (element, done) => {
    gsap.to(element, {
        autoAlpha: 0,
        duration: 1,
        ease: "expo.inOut",
        onComplete: done
    });
}