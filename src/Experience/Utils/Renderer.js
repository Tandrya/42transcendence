import * as THREE from 'three';
import Experience from '../Experience.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";

export default class Renderer {

    constructor() {
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.setInstance();
        this.setPostProcess();
        this.setBloom();
        this.setFilmPass();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false
        });
        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        this.instance.toneMappingExposure = 2;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    setPostProcess() {
        this.postProcess = {};
        this.postProcess.renderPass = new RenderPass(this.scene, this.camera.instance);
        this.renderTarget = new THREE.WebGLRenderTarget(
            this.sizes.width,
            this.sizes.height,
            {
                generateMipmaps: false,
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                encoding: THREE.sRGBEncoding,
                samples: 2
            }
        );
        this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget);
        this.postProcess.composer.setSize(this.sizes.width, this.sizes.height);
        this.postProcess.composer.setPixelRatio(this.sizes.pixelRatio);
        this.postProcess.composer.addPass(this.postProcess.renderPass);
    }

    setBloom() {
        this.unrealBloomPass = new UnrealBloomPass();
        this.unrealBloomPass.enabled = true;
        this.unrealBloomPass.strength = 0.8;
        this.unrealBloomPass.radius = 1;
        this.unrealBloomPass.threshold = 0;
        this.postProcess.composer.addPass(this.unrealBloomPass);
    }

    setFilmPass() {
        this.filmPass = new FilmPass(0.6, 0.025, 1024, false);
        this.filmPass.renderToScreen = true;
        this.postProcess.composer.addPass(this.filmPass);
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.postProcess.composer.render();
    }
}