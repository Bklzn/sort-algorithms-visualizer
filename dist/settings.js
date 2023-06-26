import sort from "./bubbleSort/sort.js";
import visual from "./visual.js";
const settings = {
    start: false,
    pause: true,
    stop: false,
    controls() {
        let container = document.createElement('div');
        container.classList.add('controls');
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 20%;
            display: flex;
            justify-content:space-evenly;
            align-items:center;
        `;
        container.appendChild(this.setButton('start/pause', this.startPause));
        container.appendChild(this.setButton('step', this.step));
        container.appendChild(this.setButton('shuffle', this.shuffle));
        document.body.appendChild(container);
    },
    algorithms() {
        let container = document.createElement('div');
        container.classList.add('algorithms');
        container.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20%;
            display: flex;
            justify-content:space-evenly;
            align-items:center;
        `;
        container.appendChild(this.setButton('bubble', sort.bubble, visual.values));
        document.body.appendChild(container);
    },
    pauseControl() {
        return new Promise((resolve) => {
            const checkPause = () => {
                if (settings.pause) {
                    setTimeout(checkPause, 20);
                }
                else {
                    resolve();
                }
            };
            checkPause();
        });
    },
    setButton(name, fn, ...args) {
        let button = document.createElement('button');
        button.textContent = name;
        button.style.cssText = `
        `;
        button.addEventListener('click', () => {
            fn(...args);
        });
        return button;
    },
    async shuffle() {
        settings.step();
        settings.stop = true;
        settings.pause = false;
        setTimeout(() => {
            settings.start = false;
            settings.pause = true;
            settings.stop = false;
        }, 100);
        document.body.removeChild(visual.container);
        visual.values = [];
        visual.init(10);
    },
    startPause() {
        if (!settings.start) {
            settings.start = true;
            sort.bubble(visual.values);
        }
        settings.pause = !settings.pause;
    },
    async step() {
        settings.startPause();
        setTimeout(() => {
            settings.pause = true;
        }, 30);
    },
};
export default settings;
