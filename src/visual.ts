const visual: {
    values: number[],
    length: number,
    container: HTMLElement,
    element: HTMLElement,
    time: number
    factor: number

    init(): void
    elementFocusOn(): void
    elementFocusOff(): void
    generateValues(length: number): void
    getElement(value: number): void
    promise(func:(...args:any[]) => void, ...args: any[]): Promise<void>
    setLength(value: number): void
    setValueElement(elem: HTMLElement, values: number[], i: number): void
    setStyleElement(elem: HTMLElement, values: number[], i: number): void
    setElements(values: number[]): void
    setTime(): void
    sideElementFocusOn(): void
    sideElementFocusOff(): void
    swapElements(value1: number, value2: number): void
    updateStyles(): void
    updateTime(): void

} = {
    values: [],
    length: 10,
    container: document.body,
    element: document.body,
    time: 0,
    factor: 10,

    init() {
        this.generateValues(this.length)
        this.setTime()
        this.setElements(this.values)
    },
    elementFocusOn(){
        visual.element.classList.add('focus')
    },
    elementFocusOff(){
        visual.element.classList.remove('focus')
    },
    generateValues(length){
        for(let i=0; i < length; i++){
            let random: number
            do{
                random = Math.floor(Math.random() * length + 1)
            }while(this.values.includes(random))
            this.values[i] = random
        }
    },
    getElement(value){
        this.element = this.container.querySelector(`.value${value}`) as HTMLElement
    },
    promise(func,...args){
        return new Promise((resolve) => {
            func(...args)
            setTimeout(() => {
                resolve()
            },this.time)
        })
    },
    setLength(value){
        this.length = value
    },
    setElements(values){
        let container = document.createElement('div')
        container.classList.add(`container`)
        document.body.appendChild(container)
        this.container = container
        for(let i = 0; i< values.length; i++) {
            this.setValueElement(container, values, i)
            this.setStyleElement(container, values, i)
        }
    },
    setStyleElement(elem, values, i){
        let div = this.container.querySelector(`.value${values[i]}`) as HTMLElement
        let containerH = elem.offsetHeight
        let containerW = elem.offsetWidth
        let length = values.length
        let styles = {
            width: Math.max(containerW / length / 10 > 1?containerW / length - 4*(containerW / length / 10):containerW / length - 4, 0.6),
            height: containerH / length * values[i] - 2 * Math.max(containerW / length / 10, 1),
            left: containerW / length * i + containerW / length / 10,
            border: containerW / length / 10 < 1.5?0: containerW / length / 10,
            radius: Math.max(containerW / length / 10, 1) * 2.5,
        }
        div.style.cssText = `
        width: ${styles.width}px;
        height: ${styles.height}px;
        left: ${styles.left}px;
        border-width: ${styles.border}px;
        border-radius: ${styles.radius}px;
        transition: left ${this.time}ms ease, height 500ms ease;
        `
    },
    setValueElement(elem, values, i) {
        let div = document.createElement('div')
        div.classList.add('element', `value${values[i]}`)
        elem.appendChild(div)
    },
    async setTime(){
        this.time = 500 * (1 - (this.factor/100))
    },
    sideElementFocusOn(){
        visual.element.classList.add('side')
    },
    sideElementFocusOff(){
        visual.element.classList.remove('side')
    },
    swapElements(value1, value2){
        let element1 = visual.container.querySelector(`.value${value1}`) as HTMLElement
        let element2 = visual.container.querySelector(`.value${value2}`) as HTMLElement
        let left1 = element1.style.left
        let left2 = element2.style.left
        element1.style.left = left2
        element2.style.left = left1
    },
    async updateStyles(){
        for(let i = 0; i< visual.length; i++) {
            visual.setStyleElement(visual.container, visual.values, i)
        }
    },
    async updateTime(){
        for(let i = 0; i< visual.length; i++) {
            let element = this.container.querySelector(`.value${this.values[i]}`) as HTMLElement
            let transition = element.style.transition.split(',')
            transition[0] = `Left ${this.time}ms ease`
            element.style.transition = transition[0].concat(',', transition[1])
        }
    },
}

export default visual