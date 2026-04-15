import React from "react";

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
    return (
        <div className="flex flex-col space-y-2 text-center mb-6">
            <h1 className="text-3xl font-bold bg-linear-to-l from-indigo-400 to-teal-400 bg-clip-text text-transparent">
                {title}
            </h1>
            <p className="text-sm text-slate-400">
                {subtitle}
            </p>
        </div>
    );
}
