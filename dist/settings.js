import sort from "./bubbleSort/sort.js";
import visual from "./visual.js";
const settings = {
    start: false,
    pause: true,
    stop: false,
    controls() {
        let container = document.createElement('div');
        container.classList.add('controls');
        container.appendChild(this.setButton('start/pause', this.startPause));
        container.appendChild(this.setButton('step', this.step));
        container.appendChild(this.setButton('shuffle', this.shuffle));
        document.body.appendChild(container);
        this.startPauseStyle(container.children[0]);
    },
    algorithms() {
        let container = document.createElement('div');
        container.classList.add('algorithms');
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
        button.addEventListener('click', () => {
            fn(...args);
        });
        return button;
    },
    async shuffle() {
        if (!settings.start) {
            document.body.removeChild(visual.container);
            visual.values = [];
            visual.init(10);
            return;
        }
        settings.stop = true;
        settings.pause = false;
        let checkStop = () => {
            if (!settings.stop) {
                settings.start = false;
                settings.pause = true;
                document.body.removeChild(visual.container);
                visual.values = [];
                visual.init(10);
            }
            else
                setTimeout(checkStop, 30);
        };
        checkStop();
    },
    startPause() {
        if (!settings.start) {
            settings.start = true;
            sort.bubble(visual.values);
        }
        settings.pause = !settings.pause;
    },
    startPauseStyle(elem) {
        let button = elem;
        button.addEventListener('click', () => {
            button.style.cssText = '';
            if (!settings.pause)
                button.style.cssText = `
                border-color: var(--border2);
                background: var(--warning);
                `;
        });
    },
    step() {
        settings.startPause();
        setTimeout(() => {
            settings.pause = true;
        }, 30);
    },
};
export default settings;
