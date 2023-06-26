import visual from "../visual.js"
import settings from "../settings.js"

const sort = {
  async bubble(array: number[]){
    let n: number = array.length
    let higlight: number = array[0]
    do{
      for (let i = 0; i < n - 1; i++){
        if(array[i] != higlight) {
          visual.getElement(higlight)
          visual.elementFocusOff()
        }
        visual.getElement(array[i])
        await visual.promise(visual.elementFocusOn)
        await settings.pauseControl()
        if (settings.stop) 
          {
            console.log('end')
            return
        }
        higlight = array[i]
        visual.getElement(array[i + 1])
        await visual.promise(visual.sideElementFocusOn)
        if (array[i] > array[i + 1]){
            let temp = array[i]
            array[i] = array[i + 1]
            array[i + 1] = temp
            higlight = temp
            await settings.pauseControl()
            if (settings.stop) 
            {
              console.log('end')
              return
          }
            await visual.promise(visual.swapElements, array[i], array[i + 1])
        }
        await settings.pauseControl()
        if (settings.stop) 
          {
            console.log('end')
            return
        }
        visual.sideElementFocusOff()
      }
      n--
    }while(n > 1)
    visual.getElement(higlight)
    await settings.pauseControl()
    if (settings.stop) 
    {
      console.log('end')
      return
    }
    await visual.promise(visual.elementFocusOff)
    settings.start = false
  }
}
export default sort