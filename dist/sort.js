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
                if (settings.stop)
                    return;
                higlight = array[i];
                visual.getElement(array[i + 1]);
                await visual.promise(visual.sideElementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                if (array[i] > array[i + 1]) {
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    higlight = temp;
                    await visual.promise(visual.swapElements, array[i], array[i + 1]);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                }
                visual.sideElementFocusOff();
                await settings.pauseControl();
                if (settings.stop)
                    return;
            }
            n--;
        } while (n > 1);
        visual.getElement(higlight);
        await visual.promise(visual.elementFocusOff);
        await settings.pauseControl();
        if (settings.stop)
            return;
    },
    async cocktail(array) {
        let higlight = array[0];
        let idx1 = 0;
        let idx2 = array.length - 1;
        while (idx1 <= idx2) {
            let newidx1 = idx2;
            let newidx2 = idx1;
            for (let i = idx1; i < idx2; i++) {
                if (array[i] != higlight) {
                    visual.getElement(higlight);
                    visual.elementFocusOff();
                }
                visual.getElement(array[i]);
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                higlight = array[i];
                visual.getElement(array[i + 1]);
                await visual.promise(visual.sideElementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                if (array[i] > array[i + 1]) {
                    [array[i], array[i + 1]] = [array[i + 1], array[i]];
                    newidx2 = i;
                    await visual.promise(visual.swapElements, array[i], array[i + 1]);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                }
                visual.sideElementFocusOff();
                await settings.pauseControl();
                if (settings.stop)
                    return;
            }
            idx2 = newidx2;
            for (let i = idx2; i > idx1; i--) {
                if (array[i] != higlight) {
                    visual.getElement(higlight);
                    visual.elementFocusOff();
                }
                visual.getElement(array[i]);
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                higlight = array[i];
                visual.getElement(array[i - 1]);
                await visual.promise(visual.sideElementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                if (array[i] < array[i - 1]) {
                    [array[i], array[i - 1]] = [array[i - 1], array[i]];
                    newidx1 = i;
                    await visual.promise(visual.swapElements, array[i], array[i - 1]);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                }
                await visual.promise(visual.sideElementFocusOff);
                await settings.pauseControl();
                if (settings.stop)
                    return;
            }
            idx1 = newidx1;
        }
        visual.getElement(higlight);
        await visual.promise(visual.elementFocusOff);
        await settings.pauseControl();
        if (settings.stop)
            return;
    },
    async insert(array, length) {
        for (let i = 1; i <= length; i++) {
            let higlight = array[i - 1];
            visual.getElement(higlight);
            await visual.promise(visual.sideElementFocusOn);
            await settings.pauseControl();
            if (settings.stop)
                return;
            for (let j = i; i > 0 && array[j - 1] > array[j]; j--) {
                let temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
                visual.getElement(array[j - 1]);
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                await visual.promise(visual.swapElements, array[j], array[j - 1]);
                await settings.pauseControl();
                if (settings.stop)
                    return;
            }
            await visual.promise(visual.elementFocusOff);
            await settings.pauseControl();
            if (settings.stop)
                return;
            visual.getElement(higlight);
            await visual.promise(visual.sideElementFocusOff);
            await settings.pauseControl();
            if (settings.stop)
                return;
        }
    },
    async mergeSort(array, begin, end) {
        let merge = async (array, left, mid, right) => {
            let subArrayOne = mid - left + 1;
            let subArrayTwo = right - mid;
            let leftArray = new Array(subArrayOne);
            let rightArray = new Array(subArrayTwo);
            for (let i = 0; i < subArrayOne; i++) {
                leftArray[i] = array[left + i];
                visual.getElement(leftArray[i]);
                visual.promise(visual.sideElementFocusOn);
            }
            for (let i = 0; i < subArrayTwo; i++) {
                rightArray[i] = array[mid + 1 + i];
                visual.getElement(rightArray[i]);
                visual.promise(visual.sideElementFocusOn);
            }
            let indexOne = 0, indexTwo = 0, indexMerged = left;
            let higlight;
            while (indexOne < subArrayOne && indexTwo < subArrayTwo) {
                visual.getElement(array[indexMerged]);
                higlight = array[indexMerged];
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                if (leftArray[indexOne] <= rightArray[indexTwo]) {
                    visual.getElement(leftArray[indexOne]);
                    await visual.promise(visual.elementFocusOn);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                    await visual.promise(visual.elementFocusOff);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                    array[indexMerged] = leftArray[indexOne];
                    indexOne++;
                }
                else {
                    visual.getElement(rightArray[indexTwo]);
                    await visual.promise(visual.elementFocusOn);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                    await visual.promise(visual.elementFocusOff);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                    array[indexMerged] = rightArray[indexTwo];
                    indexTwo++;
                }
                visual.getElement(higlight);
                await visual.promise(visual.elementFocusOff);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                indexMerged++;
            }
            while (indexOne < subArrayOne) {
                visual.getElement(array[indexMerged]);
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                visual.getElement(leftArray[indexOne]);
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                await visual.promise(visual.elementFocusOff);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                visual.getElement(array[indexMerged]);
                await visual.promise(visual.elementFocusOff);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                array[indexMerged] = leftArray[indexOne];
                indexOne++;
                indexMerged++;
            }
            while (indexTwo < subArrayTwo) {
                visual.getElement(array[indexMerged]);
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                visual.getElement(rightArray[indexTwo]);
                await visual.promise(visual.elementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                await visual.promise(visual.elementFocusOff);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                visual.getElement(array[indexMerged]);
                await visual.promise(visual.elementFocusOff);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                array[indexMerged] = rightArray[indexTwo];
                indexTwo++;
                indexMerged++;
            }
            await visual.promise(visual.updateStyles);
            for (let i = array.length - 1; i >= 0; i--) {
                visual.getElement(array[i]);
                visual.promise(visual.sideElementFocusOff);
            }
        };
        if (begin >= end || settings.stop)
            return;
        let mid = Math.floor(begin + (end - begin) / 2);
        await this.mergeSort(array, begin, mid);
        if (settings.stop)
            return;
        await this.mergeSort(array, mid + 1, end);
        if (settings.stop)
            return;
        await merge(array, begin, mid, end);
        if (settings.stop)
            return;
    },
    async quicksort(array, first, last) {
        let swap = async (arr, a, b) => {
            visual.getElement(arr[a]);
            await visual.promise(visual.sideElementFocusOn);
            await settings.pauseControl();
            if (settings.stop)
                return;
            visual.getElement(arr[b]);
            await visual.promise(visual.sideElementFocusOn);
            await settings.pauseControl();
            if (settings.stop)
                return;
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
            await settings.pauseControl();
            if (settings.stop)
                return;
            await visual.promise(visual.swapElements, array[a], array[b]);
            visual.getElement(arr[a]);
            await visual.promise(visual.sideElementFocusOff);
            await settings.pauseControl();
            if (settings.stop)
                return;
            visual.getElement(arr[b]);
            await visual.promise(visual.sideElementFocusOff);
            await settings.pauseControl();
            if (settings.stop)
                return;
        };
        let partition = async (array, first, last) => {
            let pivot = array[last];
            let i = first - 1;
            visual.getElement(pivot);
            await visual.promise(visual.elementFocusOn);
            await settings.pauseControl();
            if (settings.stop)
                return;
            for (let j = first; j <= last - 1; j++) {
                visual.getElement(array[j]);
                await visual.promise(visual.sideElementFocusOn);
                await settings.pauseControl();
                if (settings.stop)
                    return;
                if (array[j] <= pivot) {
                    i++;
                    await swap(array, i, j);
                }
                else {
                    visual.getElement(array[i + 1]);
                    await visual.promise(visual.sideElementFocusOn);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                    await visual.promise(visual.sideElementFocusOff);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                    visual.getElement(array[j]);
                    await visual.promise(visual.sideElementFocusOff);
                    await settings.pauseControl();
                    if (settings.stop)
                        return;
                }
            }
            i++;
            await swap(array, i, last);
            visual.getElement(pivot);
            await visual.promise(visual.elementFocusOff);
            await settings.pauseControl();
            if (settings.stop)
                return;
            return i;
        };
        if (first >= last || first < 0)
            return;
        let pivot = await partition(array, first, last) || first;
        await this.quicksort(array, first, pivot - 1);
        if (settings.stop)
            return;
        await this.quicksort(array, pivot + 1, last);
        if (settings.stop)
            return;
    },
};
export default sort;
