// components/ui/counter.tsx
"use client";

import { useState } from "react";
import { Button } from "@/react/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
    initialValue?: number;
    min?: number;
    max?: number;
    icon?: React.ReactNode;
    label?: string;
}

export function Counter({
                            initialValue = 0,
                            min = 0,
                            max = 10,
                            icon,
                            label = "/10"
                        }: CounterProps) {
    const [value, setValue] = useState(initialValue);

    const increment = () => {
        const newValue = Math.min(value + 1, max);
        setValue(newValue);
    };

    const decrement = () => {
        const newValue = Math.max(value - 1, min);
        setValue(newValue);
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={decrement}
                disabled={value === min}
                className="h-10 w-10 rounded-md border-2 hover:bg-red-50"
            >
                <Minus className="h-7 w-7" />
            </Button>

            <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold text-primary-purple font-[tektur]">{value}</span>
                {icon}
                {label && <span className="text-lg text-muted-foreground font-[tektur] font-medium">{label}</span>}
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={increment}
                disabled={value === max}
                className="h-10 w-10 rounded-md border-2 hover:bg-green-50"
            >
                <Plus className="h-7 w-7" />
            </Button>
        </div>
    );
}