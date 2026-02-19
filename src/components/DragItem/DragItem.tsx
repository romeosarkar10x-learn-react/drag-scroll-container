import type { DragItemType } from "@/types/DragItem";
import { useEffect, useRef } from "react";

export default function DragItem({ dragItem }: { dragItem: DragItemType }) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        ref.current.style.backgroundColor = dragItem.color;
        ref.current.style.width = dragItem.width;
    }, [dragItem]);

    return <div ref={ref} className="drag-item h-full"></div>;
}
