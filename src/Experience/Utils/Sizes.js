import EventEmitter from './EventEmitter.js';

export default class Sizes extends EventEmitter {

    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);


        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.trigger('resize');

            if (!('ontouchstart' in window) || this.width <= 1170) {
                window.location.href = '/unsupported';
            }
        });
    }
}