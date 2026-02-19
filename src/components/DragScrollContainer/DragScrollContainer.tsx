import { genRandomDragItem } from "@/lib/genRandomDragItem";
import { useState } from "react";
import DragItem from "../DragItem";

export default function DragScrollContainer() {
    const [items] = useState(() => {
        return Array.from({ length: 5 }).map(genRandomDragItem);
    });

    return (
        <div className="m-4 flex h-16 border-red-200 border-2">
            {items.map((item, index) => (
                <DragItem key={index} dragItem={item} />
            ))}
        </div>
    );
}
