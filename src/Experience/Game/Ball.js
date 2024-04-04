import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Ball {

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera.instance;

        this.BALL_RADIUS = this.experience.BALL_RADIUS;
        this.FIELD_LENGTH = this.experience.FIELD_LENGTH;
        this.setBall();
    }

    setBall() {
        this.ballGeometry = new THREE.SphereGeometry(this.BALL_RADIUS, 12, 12);
        this.ballMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true, transparent: true, opacity: 0.1 });
        this.ball = new THREE.Mesh(this.ballGeometry, this.ballMaterial);
        this.mainLight = new THREE.HemisphereLight(0xFFFFFF, 0x003300);
        this.scene.add(this.mainLight);
        this.scene.add(this.ball);
        this.camera.lookAt(this.ball.position);

        /* Position for menu */
        this.ball.position.y = 290;
        this.ball.position.x = 0;
        this.ball.position.z = this.FIELD_LENGTH / 2 - 80;
    }

    update() {
        this.ball.rotation.y += 0.007;
        this.ball.rotation.x += 0.004;
    }
}