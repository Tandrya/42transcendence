import gsap from 'gsap';

export const introAnimation = (loading, loadingScreen, experience) => {
  gsap.to(loadingScreen.value, {
    opacity: 0,
    duration: 0.8,
    ease: 'expo.inOut',
    onComplete: () => {
      loading.value = false;
      gsap.to(experience.ball.ball.position, {
        y: 290,
        duration: 1,
        ease: 'expo.out'
      });

      gsap.to(experience.camera.instance.position, {
        x: 0,
        y: 300,
        z: experience.FIELD_LENGTH / 2,
        duration: 2.5,
        ease: "expo.inOut",
      });

      gsap.to('#homePage', {
        autoAlpha: 1,
        duration: 1.5,
        delay: 0.5,
        ease: "expo.inOut",
      });

      gsap.to('.header', {
        autoAlpha: 1,
        duration: 1.5,
        delay: 0.5,
        ease: "expo.inOut",
      });
    }
  });
}

export const initLoadingScreen = (obj, start, end, duration, onCompletion) => {
  let startTimestamp = null;
  let animationCompleted = false;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);

    obj.innerHTML = `${currentValue}%`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else if (!animationCompleted && currentValue >= 97) {
      animationCompleted = true;
      obj.innerHTML = '100%';
      initiateCompletionAnimation(onCompletion);
    }
  };
  window.requestAnimationFrame(step);
}

const initiateCompletionAnimation = (onCompletion) => {
  const exp = window.experience;

  if (exp) {
    gsap.set(exp.ball.ball.position, { y: 350 });
    gsap.set(exp.camera.instance.position, { y: 1250 });
    gsap.set('#homePage', { autoAlpha: 0 });
    gsap.set('.header', { autoAlpha: 0 });
  }

  if (onCompletion && typeof onCompletion === 'function') {
    onCompletion();
  }
}