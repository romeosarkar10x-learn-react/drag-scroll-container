import type { DragItemType } from "@/types/DragItem";
import type { PositionType } from "@/types/pos";
import { useEffect, useRef } from "react";

function parseMargin(margin: string) {
    if (margin === "") {
        return 0;
    }

    return parseInt(margin);
}

export default function DragItem({ dragItem }: { dragItem: DragItemType }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const gapElemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current || !gapElemRef.current) {
            return;
        }

        const elem = ref.current;
        const gapElem = gapElemRef.current;

        elem.style.backgroundColor = dragItem.color;
        elem.style.width = dragItem.width;

        const mouseDownEventListener = (e: MouseEvent) => {
            const initialGap = gapElem.style.width;
            const initialPos: PositionType = { x: e.clientX, y: e.clientY };

            function documentMouseMoveEventListener(e: MouseEvent) {
                const pos: PositionType = { x: e.clientX, y: e.clientY };
                gapElem.style.width = `${Math.max(0, parseMargin(initialGap) + pos.x - initialPos.x)}px`;
            }

            console.log("mousedown");
            document.addEventListener("mousemove", documentMouseMoveEventListener);

            document.addEventListener(
                "mouseup",
                () => {
                    console.log("mouseup");
                    document.removeEventListener("mousemove", documentMouseMoveEventListener);
                },
                { once: true },
            );
        };

        elem.addEventListener("mousedown", mouseDownEventListener);

        return () => {
            elem.removeEventListener("mousedown", mouseDownEventListener);
        };
    }, [dragItem]);

    return (
        <div className="flex">
            <div ref={gapElemRef}></div>
            <div ref={ref} className="drag-item h-full cursor-grab active:cursor-grabbing"></div>
        </div>
    );
}
