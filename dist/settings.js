import sort from "./sort.js";
import visual from "./visual.js";
const settings = {
    sort: 'quick',
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
        container.appendChild(this.setSortBtn('bubble', this.setSort));
        container.appendChild(this.setSortBtn('cocktail', this.setSort));
        container.appendChild(this.setSortBtn('insert', this.setSort));
        container.appendChild(this.setSortBtn('quick', this.setSort));
        container.appendChild(this.setSortBtn('merge', this.setSort));
        container.appendChild(this.setSortBtn('selection', this.setSort));
        container.appendChild(this.setSortBtn('radix', this.setSort));
        container.appendChild(this.setSortBtn('shell', this.setSort));
        document.body.appendChild(container);
        container.querySelectorAll('label:nth-child(2)')[0].dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        }));
    },
    pauseControl() {
        return new Promise((resolve) => {
            const checkPause = () => {
                if (settings.pause) {
                    setTimeout(checkPause, 5);
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
    setSort(sort) {
        settings.sort = sort;
        let checkStop = () => {
            if (!settings.stop) {
                settings.start = false;
                settings.pause = true;
                settings.startPauseStyle();
                let bars = document.body.querySelectorAll('.container .element');
                bars.forEach((el) => {
                    el.classList.remove('focus', 'side');
                });
            }
            else
                setTimeout(checkStop, 10);
        };
        if (settings.start) {
            settings.stop = true;
            settings.pause = false;
            checkStop();
        }
    },
    setSortBtn(name, fn) {
        let div = document.createElement('div');
        let input = document.createElement('input');
        let label = document.createElement('label');
        input.id = name;
        input.type = 'radio';
        input.name = 'sort';
        label.setAttribute('for', name);
        label.textContent = name;
        input.addEventListener('change', () => {
            fn(name);
        });
        div.classList.add(name);
        div.append(input, label);
        return div;
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
        visual.updateTime();
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
                setTimeout(checkStop, 10);
        };
        checkStop();
    },
    async startAlgorithm() {
        switch (this.sort) {
            case 'bubble':
                await sort.bubble(visual.values);
                break;
            case 'cocktail':
                await sort.cocktail(visual.values);
                break;
            case 'insert':
                await sort.insert(visual.values, visual.length);
                break;
            case 'quick':
                await sort.quicksort(visual.values, 0, visual.length - 1);
                break;
            case 'merge':
                await sort.mergeSort(visual.values, 0, visual.length - 1);
                break;
            case 'selection':
                await sort.selection(visual.values);
                break;
            case 'radix':
                await sort.radix(visual.values);
                break;
            case 'shell':
                await sort.shell(visual.values);
                break;
        }
        settings.stop = false;
        settings.start = false;
        settings.pause = true;
        settings.startPauseStyle();
    },
    startPause() {
        if (!settings.start) {
            settings.start = true;
            settings.startAlgorithm();
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
        }, 10);
    },
    updateLabel(elem) {
        let label = document.body.querySelector(`label[for='${elem.id}']`);
        label.textContent = elem.value;
    },
};
export default settings;
