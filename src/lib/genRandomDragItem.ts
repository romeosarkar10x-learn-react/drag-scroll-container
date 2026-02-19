import type { DragItemType } from "@/types/DragItem";

function toHexChar(n: number) {
    if (0 <= n && n <= 9) {
        return n.toString();
    }

    return String.fromCharCode(n - 10 + "a".charCodeAt(0));
}

function toHex(n: number, width: number = 2) {
    let string = "";

    while (n) {
        string += toHexChar(Math.trunc(n % 16));
        n = Math.trunc(n / 16);
    }

    while (string.length < width) {
        string = "0" + string;
    }

    return string;
}

function genRandomColor() {
    const array = new Uint8Array(3);

    crypto.getRandomValues(array);

    const b = array[0];
    const g = array[1];
    const r = array[2];

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function genWidth(n: number) {
    return `${n}px`;
}

function genRandomWidth() {
    return genWidth(genRandomNumberBetween(60, 180));
}

function genRandomNumberBetween(min: number, max: number) {
    const array = new Uint8Array(1);
    crypto.getRandomValues(array);

    const width = max - min;
    return min + Math.trunc((array[0] / 256) * (width + 1));
}

export function genRandomDragItem(): DragItemType {
    return {
        color: genRandomColor(),
        width: genRandomWidth(),
    };
}
