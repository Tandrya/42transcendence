import gsap from 'gsap'
import Experience from '../Experience.js';

export default class LocalGame {

    constructor() {
        /* Game elements */
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.time = this.experience.time;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera.instance;
        this.field = this.experience.field;
        this.ball = this.experience.ball.ball;
        this.ballMaterial = this.experience.ball.ballMaterial;
        this.paddleTwo = this.experience.paddle.paddleTwo;
        this.paddleOne = this.experience.paddle.paddleOne;

        /* Game constant */
        this.WIDTH = this.experience.WIDTH;
        this.HEIGHT = this.experience.HEIGHT;
        this.VIEW_ANGLE = this.experience.VIEW_ANGLE;
        this.ASPECT = this.experience.WIDTH / this.experience.HEIGHT;
        this.NEAR = this.experience.NEAR;
        this.FAR = this.experience.FAR;
        this.FIELD_WIDTH = this.experience.FIELD_WIDTH;
        this.FIELD_LENGTH = this.experience.FIELD_LENGTH;
        this.BALL_RADIUS = this.experience.BALL_RADIUS;
        this.PADDLE_WIDTH = this.experience.PADDLE_WIDTH;
        this.PADDLE_HEIGHT = this.experience.PADDLE_HEIGHT;

        /* Keys */
        this.leftKeyPressed = false;
        this.rightKeyPressed = false;

        /* Scores */
        this.scorePaddleOne = 0;
        this.scorePaddleTwo = 0;
    }

    startBallMovement() {
        let direction = Math.random() > 0.5 ? -1 : 1;
        this.ball.$velocity = {
            x: 0,
            z: direction * (this.time.delta * 2)
        };
        this.ball.$stopped = false;
    }

    processCpuPaddle() {
        let ballPos = this.ball.position,
            cpuPos = this.paddleTwo.position;
        if (cpuPos.x - 100 > ballPos.x && cpuPos.x > -450) {
            cpuPos.x -= Math.min(cpuPos.x - ballPos.x, 15);
        } else if (cpuPos.x - 100 < ballPos.x && cpuPos.x < 450) {
            cpuPos.x += Math.min(ballPos.x - cpuPos.x, 15);
        }
    }

    processBallMovement() {
        if (!this.ball.$velocity) {
            this.startBallMovement();
        }

        if (this.ball.$stopped) {
            return;
        }

        this.updateBallPosition();

        this.ball.position.x += this.ball.$velocity.x * 0.5;
        this.ball.position.z += this.ball.$velocity.z * 0.5;

        if (this.isSideCollision()) {
            this.ball.$velocity.x *= -1;
        }

        if (this.isPaddle1Collision()) {
            this.hitBallBack(this.paddleOne);
        }

        if (this.isPaddle2Collision()) {
            this.hitBallBack(this.paddleTwo);
        }

        if (this.isPastPaddle1()) {
            this.scorePaddleTwo++;
            const scoreBoard = document.querySelector('.score__value');
            scoreBoard.innerHTML = this.scorePaddleOne + ' - ' + this.scorePaddleTwo;
            this.scored('paddleTwo');
        }

        if (this.isPastPaddle2()) {
            this.scorePaddleOne++;
            const scoreBoard = document.querySelector('.score__value');
            scoreBoard.innerHTML = this.scorePaddleOne + ' - ' + this.scorePaddleTwo;
            this.scored('paddleOne');
        }
    }

    isPastPaddle1() {
        return this.ball.position.z > this.paddleOne.position.z + 100;
    }

    isPastPaddle2() {
        return this.ball.position.z < this.paddleTwo.position.z - 100;
    }

    updateBallPosition() {
        let ballPos = this.ball.position;
        ballPos.x += this.ball.$velocity.x;
        ballPos.z += this.ball.$velocity.z;
    }

    isSideCollision() {
        let ballX = this.ball.position.x,
            halfFieldWidth = this.FIELD_WIDTH / 2;
        return ballX - this.BALL_RADIUS < -halfFieldWidth || ballX + this.BALL_RADIUS > halfFieldWidth;
    }

    hitBallBack(paddle) {
        this.ball.$velocity.x = (this.ball.position.x - paddle.position.x) / 5;
        this.ball.$velocity.z *= -1;
    }

    isPaddle2Collision() {
        return this.ball.position.z - (this.BALL_RADIUS) <= this.paddleTwo.position.z &&
            this.isBallAlignedWithPaddle(this.paddleTwo);
    }

    isPaddle1Collision() {
        return this.ball.position.z + (this.BALL_RADIUS * 2) >= this.paddleOne.position.z &&
            this.isBallAlignedWithPaddle(this.paddleOne);
    }

    isBallAlignedWithPaddle(paddle) {
        let halfPaddleWidth = this.PADDLE_WIDTH / 2,
            paddleX = paddle.position.x,
            ballX = this.ball.position.x;
        return ballX > paddleX - halfPaddleWidth &&
            ballX < paddleX + halfPaddleWidth;
    }

    scored(paddle) {
        this.stopBall();
        gsap.to(this.ballMaterial, {
            opacity: 0,
            duration: 0.5,
        });
        setTimeout(() => {
            this.reset();
        }, 600);
    }

    stopBall() {
        this.ball.$stopped = true;
    }

    reset() {
        this.ball.position.x = 0;
        this.ball.position.y = 200;
        this.ball.position.z = 0;

        gsap.to(this.paddleTwo.position, {
            x: 0
        });

        gsap.to(this.ballMaterial, {
            opacity: 1,
            duration: 0.5,
        });

        gsap.to(this.ball.position, {
            y: 0,
            duration: 0.5,
        });

        setTimeout(() => {
            this.ball.$velocity = null;
        }, 600);
    }

    resetGame() {
        this.ball.position.x = 0;
        this.ball.position.y = 0;
        this.ball.position.z = 0;

        this.paddleOne.position.x = 0;
        this.paddleTwo.position.x = 0;
    }

    handleKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key == 'ArrowRight') {
                this.rightKeyPressed = true;
            } else if (e.key == 'ArrowLeft') {
                this.leftKeyPressed = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key == 'ArrowRight') {
                this.rightKeyPressed = false;
            } else if (e.key == 'ArrowLeft') {
                this.leftKeyPressed = false;
            }
        });
    }

    update() {
        this.processBallMovement();
        this.processCpuPaddle();
        this.handleKeyboard();

        if (this.rightKeyPressed && this.paddleOne.position.x < 450) {
            this.paddleOne.position.x += this.time.delta;
            this.camera.position.x += 5;
        }
        if (this.leftKeyPressed && this.paddleOne.position.x > -450) {
            this.paddleOne.position.x -= this.time.delta;
            this.camera.position.x -= 5;
        }
    }
}