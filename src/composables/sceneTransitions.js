import gsap from 'gsap';
import router from '../router';

export const enterGame = () => {
    const g = window.experience;
    opacityGame(g.ball, g.paddle, g.field, 1.0, 0.2);

    gsap.to(window.experience.walls.wallMaterial, {
        opacity: 0.1,
        delay: 1
    });

    gsap.to(window.experience.ball.ball.position, {
        y: 0,
        x: 0,
        z: 0,
        duration: 2.5,
        ease: "expo.inOut",
    })

    gsap.to(window.experience.camera.instance.position, {
        x: 0,
        y: 100,
        z: window.experience.FIELD_LENGTH / 2 + 500,
        duration: 2.5,
        ease: "expo.inOut",
        onComplete: () => {
            window.experience.localGameStarted = true;
        }
    });
}

export const leaveGame = () => {
    const g = window.experience;
    opacityGame(g.ball, g.paddle, g.field, 0.0, 0.0);

    gsap.to(window.experience.walls.wallMaterial, {
        opacity: 0.0
    });

    gsap.to(window.experience.camera.instance.position, {
        x: 0,
        y: 300,
        z: window.experience.FIELD_LENGTH / 2,
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => {
            gsap.to(window.experience.ball.ballMaterial, {
                opacity: 0.1
            });

            gsap.to(window.experience.ball.ball.position, {
                y: 290,
                x: 0,
                z: window.experience.FIELD_LENGTH / 2 - 80,
                duration: 1.5,
                ease: "expo.inOut",
            });

            window.experience.localGameStarted = false;
            window.experience.localGame.resetGame();
        }
    });

    router.push('/');
}

export const opacityGame = (ball, paddle, field, floatValue, fieldValue) => {
    gsap.to(ball.ballMaterial, {
        opacity: floatValue,
        duration: 1,
        ease: "expo.inOut"
    });

    gsap.to(field.fieldMaterial, {
        opacity: fieldValue,
        duration: 1,
        ease: "expo.inOut"
    });

    gsap.to(paddle.paddleMaterial, {
        opacity: floatValue,
        duration: 1,
        ease: "expo.inOut"
    });

    gsap.to(paddle.paddleMaterial, {
        opacity: floatValue,
        duration: 1,
        ease: "expo.inOut"
    });
}