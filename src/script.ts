import settings from "./settings.js"
import visual from "./visual.js"

settings.controls()
settings.ranges()
visual.init()
window.addEventListener('resize', () => {
    for(let i = 0; i< visual.length; i++){
        visual.setStyleElement(visual.container, visual.values, i)
    }
})
// settings.algorithms()