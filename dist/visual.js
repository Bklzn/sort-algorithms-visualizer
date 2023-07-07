const visual = {
    values: [],
    length: 10,
    container: document.body,
    element: document.body,
    time: 0,
    factor: 10,
    init() {
        this.generateValues(this.length);
        this.setTime();
        this.setElements(this.values);
    },
    elementFocusOn() {
        visual.element.classList.add('focus');
    },
    elementFocusOff() {
        visual.element.classList.remove('focus');
    },
    generateValues(length) {
        for (let i = 0; i < length; i++) {
            let random;
            do {
                random = Math.floor(Math.random() * length + 1);
            } while (this.values.includes(random));
            this.values[i] = random;
        }
    },
    getElement(value) {
        this.element = this.container.querySelector(`.value${value}`);
    },
    promise(func, ...args) {
        return new Promise((resolve) => {
            func(...args);
            setTimeout(() => {
                resolve();
            }, this.time);
        });
    },
    setLength(value) {
        this.length = value;
    },
    setElements(values) {
        let container = document.createElement('div');
        container.classList.add(`container`);
        document.body.appendChild(container);
        this.container = container;
        for (let i = 0; i < values.length; i++) {
            this.setValueElement(container, values, i);
            this.setStyleElement(container, values, i);
        }
    },
    setStyleElement(elem, values, i) {
        let div = this.container.querySelector(`.value${values[i]}`);
        let containerH = elem.offsetHeight;
        let containerW = elem.offsetWidth;
        let length = values.length;
        let styles = {
            width: containerW / length / 10 > 1 ? containerW / length - 4 * (containerW / length / 10) : containerW / length - 4,
            height: containerH / length * values[i] - 2 * Math.max(containerW / length / 10, 1),
            left: containerW / length * i + Math.max(containerW / length / 10, 1),
            border: containerW / length / 10 < 1.5 ? 0 : containerW / length / 10,
            radius: Math.max(containerW / length / 10, 1) * 2.5,
        };
        div.style.cssText = `
        width: ${styles.width}px;
        height: ${styles.height}px;
        left: ${styles.left}px;
        border-width: ${styles.border}px;
        border-radius: ${styles.radius}px;
        transition: left ${this.time}ms ease, height 500ms ease;
        `;
    },
    setValueElement(elem, values, i) {
        let div = document.createElement('div');
        div.classList.add('element', `value${values[i]}`);
        elem.appendChild(div);
    },
    async setTime() {
        this.time = 500 * (1 - (this.factor / 100));
    },
    sideElementFocusOn() {
        visual.element.classList.add('side');
    },
    sideElementFocusOff() {
        visual.element.classList.remove('side');
    },
    swapElements(value1, value2) {
        let element1 = visual.container.querySelector(`.value${value1}`);
        let element2 = visual.container.querySelector(`.value${value2}`);
        let left1 = element1.style.left;
        let left2 = element2.style.left;
        element1.style.left = left2;
        element2.style.left = left1;
    },
    async updateStyles() {
        for (let i = 0; i < visual.length; i++) {
            visual.setStyleElement(visual.container, visual.values, i);
        }
    },
    async updateTime() {
        for (let i = 0; i < visual.length; i++) {
            let element = this.container.querySelector(`.value${this.values[i]}`);
            let transition = element.style.transition.split(',');
            transition[0] = `Left ${this.time}ms ease`;
            element.style.transition = transition[0].concat(',', transition[1]);
        }
    },
};
export default visual;
