import sort from "./sort.js";
import visual from "./visual.js";
const settings = {
    start: false,
    startBtn: document.body,
    pause: true,
    stop: false,
    controls() {
        let container = document.createElement('div');
        container.classList.add('controls');
        container.appendChild(this.setButton('start / pause', this.startPause));
        container.appendChild(this.setButton('step', this.step));
        container.appendChild(this.setButton('shuffle', this.shuffle));
        document.body.appendChild(container);
        this.startBtn = container.children[0];
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
                    setTimeout(checkPause, 2);
                }
                else {
                    resolve();
                }
            };
            checkPause();
        });
    },
    ranges() {
        let container = document.createElement('div');
        container.classList.add('ranges');
        container.appendChild(this.setInputRange('time', this.setTime));
        container.appendChild(this.setInputRange('amount', this.setCount));
        document.body.appendChild(container);
    },
    setButton(name, fn, ...args) {
        let button = document.createElement('button');
        button.textContent = name;
        button.addEventListener('click', () => {
            fn(...args);
        });
        return button;
    },
    async setCount() {
        let range = document.getElementById('amount');
        visual.setLength(parseInt(range.value));
        settings.updateLabel(range);
        settings.shuffle();
    },
    setInputRange(id, fn, ...args) {
        let div = document.createElement('div');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.id = id;
        input.type = "range";
        input.min = "10";
        input.max = "100";
        input.value = "10";
        input.addEventListener('input', () => {
            fn(...args);
        });
        label.setAttribute('for', id);
        label.textContent = input.value;
        div.classList.add(id);
        div.appendChild(input);
        div.appendChild(label);
        return div;
    },
    setTime() {
        let range = document.getElementById('time');
        visual.factor = parseInt(range.value);
        visual.setTime();
        settings.updateLabel(range);
        for (let i = 0; i < visual.length; i++) {
            visual.setStyleElement(visual.container, visual.values, i);
        }
    },
    async shuffle() {
        if (!settings.start) {
            document.body.removeChild(visual.container);
            visual.values = [];
            visual.init();
            return;
        }
        settings.stop = true;
        settings.pause = false;
        let checkStop = () => {
            if (!settings.stop) {
                settings.start = false;
                settings.pause = true;
                settings.startPauseStyle();
                document.body.removeChild(visual.container);
                visual.values = [];
                visual.init();
            }
            else
                setTimeout(checkStop, 3);
        };
        checkStop();
    },
    startPause() {
        if (!settings.start) {
            settings.start = true;
            sort.bubble(visual.values);
        }
        settings.pause = !settings.pause;
        settings.startPauseStyle();
    },
    startPauseStyle() {
        let btn = this.startBtn;
        btn.style.cssText = '';
        if (!settings.pause)
            btn.style.cssText = `
            border-color: var(--border2);
            color: var(--warning);
            `;
    },
    step() {
        settings.startPause();
        setTimeout(() => {
            settings.pause = true;
            settings.startPauseStyle();
        }, 3);
    },
    updateLabel(elem) {
        let label = document.body.querySelector(`label[for='${elem.id}']`);
        label.textContent = elem.value;
    },
};
export default settings;
