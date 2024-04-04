import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Paddle {

    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene

        this.PADDLE_WIDTH = this.experience.PADDLE_WIDTH
        this.PADDLE_HEIGHT = this.experience.PADDLE_HEIGHT
        this.FIELD_LENGTH = this.experience.FIELD_LENGTH

        this.setPaddle()
    }

    setPaddle() {
        this.paddleGeometry = new THREE.BoxGeometry(this.PADDLE_WIDTH, this.PADDLE_HEIGHT, 40, 10, 5, 10)
        this.paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xD9D9D9, wireframe: true, transparent: true, opacity: 0.0 })

        this.paddleOne = new THREE.Mesh(this.paddleGeometry, this.paddleMaterial)
        this.paddleOne.position.z = this.FIELD_LENGTH / 2
        this.scene.add(this.paddleOne)

        this.paddleTwo = new THREE.Mesh(this.paddleGeometry, this.paddleMaterial)
        this.paddleTwo.position.z = -this.FIELD_LENGTH / 2
        this.scene.add(this.paddleTwo)
    }

    update() { }
}