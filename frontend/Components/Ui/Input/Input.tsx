"use client";

import { useState } from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    icon?: React.ReactNode;
}

export default function Input({
    label,
    icon,
    className = '',
    disabled,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && (
                <label className="text-sm font-medium text-slate-300">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    disabled={disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full px-4 py-2.5 bg-slate-900/60 border rounded-xl text-slate-100 text-sm outline-none transition-all duration-200 placeholder:text-slate-500
                        ${isFocused ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)] bg-slate-800/80 ring-1 ring-indigo-500/50' : 'border-slate-700/50 hover:border-slate-500/50 hover:bg-slate-800/60'}
                        ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-900/30' : ''}
                        ${icon ? 'pr-11' : ''}`}
                    {...props}
                />
                {icon && (
                    <span className={`absolute top-1/2 right-3 -translate-y-1/2 transition-colors duration-200 pointer-events-none 
                        ${isFocused ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                        {icon}
                    </span>
                )}
            </div>
        </div>
    );
}
