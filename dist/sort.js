import visual from "./visual.js";
import settings from "./settings.js";
const sort = {
    async bubble(array) {
        let n = array.length;
        let higlight = array[0];
        do {
            for (let i = 0; i < n - 1; i++) {
                if (array[i] != higlight) {
                    visual.getElement(higlight);
                    visual.elementFocusOff();
                }
                visual.getElement(array[i]);
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop) {
                    settings.stop = false;
                    return;
                }
                higlight = array[i];
                visual.getElement(array[i + 1]);
                await visual.promise(visual.sideElementFocusOn);
                if (array[i] > array[i + 1]) {
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    higlight = temp;
                    await settings.pauseControl();
                    if (settings.stop) {
                        settings.stop = false;
                        return;
                    }
                    await visual.promise(visual.swapElements, array[i], array[i + 1]);
                }
                await settings.pauseControl();
                if (settings.stop) {
                    settings.stop = false;
                    return;
                }
                visual.sideElementFocusOff();
            }
            n--;
        } while (n > 1);
        visual.getElement(higlight);
        await settings.pauseControl();
        if (settings.stop) {
            settings.stop = false;
            return;
        }
        await visual.promise(visual.elementFocusOff);
    },
    async quicksort(array, first, last) {
        let swap = async (arr, a, b) => {
            visual.getElement(arr[a]);
            await visual.promise(visual.sideElementFocusOn);
            await settings.pauseControl();
            if (settings.stop) {
                settings.stop = false;
                return;
            }
            visual.getElement(arr[b]);
            await visual.promise(visual.sideElementFocusOn);
            await settings.pauseControl();
            if (settings.stop) {
                settings.stop = false;
                return;
            }
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
            await settings.pauseControl();
            if (settings.stop) {
                settings.stop = false;
                return;
            }
            await visual.promise(visual.swapElements, array[a], array[b]);
            visual.getElement(arr[a]);
            await visual.promise(visual.sideElementFocusOff);
            await settings.pauseControl();
            if (settings.stop) {
                settings.stop = false;
                return;
            }
            visual.getElement(arr[b]);
            await visual.promise(visual.sideElementFocusOff);
            await settings.pauseControl();
            if (settings.stop) {
                settings.stop = false;
                return;
            }
        };
        let partition = async (array, first, last) => {
            let pivot = array[last];
            let i = first - 1;
            visual.getElement(pivot);
            await visual.promise(visual.elementFocusOn);
            await settings.pauseControl();
            if (settings.stop) {
                settings.stop = false;
                return;
            }
            for (let j = first; j <= last - 1; j++) {
                visual.getElement(array[j]);
                await visual.promise(visual.sideElementFocusOn);
                await settings.pauseControl();
                if (settings.stop) {
                    settings.stop = false;
                    return;
                }
                if (array[j] <= pivot) {
                    i++;
                    await swap(array, i, j);
                }
                else {
                    visual.getElement(array[i + 1]);
                    await visual.promise(visual.sideElementFocusOn);
                    await settings.pauseControl();
                    if (settings.stop) {
                        settings.stop = false;
                        return;
                    }
                    await visual.promise(visual.sideElementFocusOff);
                    await settings.pauseControl();
                    if (settings.stop) {
                        settings.stop = false;
                        return;
                    }
                    visual.getElement(array[j]);
                    await visual.promise(visual.sideElementFocusOff);
                    await settings.pauseControl();
                    if (settings.stop) {
                        settings.stop = false;
                        return;
                    }
                }
            }
            i++;
            await swap(array, i, last);
            visual.getElement(pivot);
            await visual.promise(visual.elementFocusOff);
            await settings.pauseControl();
            if (settings.stop) {
                settings.stop = false;
                return;
            }
            return i;
        };
        if (first >= last || first < 0)
            return;
        let pivot = await partition(array, first, last) || first;
        await this.quicksort(array, first, pivot - 1);
        await this.quicksort(array, pivot + 1, last);
    }
};
export default sort;
