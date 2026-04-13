import { CardProps } from "@/Util/Types/CardProps";

export default function Card({ children, className = '', header, footer }: CardProps) {
    return (
        <div className={`bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-200 hover:border-indigo-500/25 hover:shadow-[0_0_20px_rgba(67,56,202,0.15)] ${className}`}>
            {header && (
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800/50">
                    <div className="[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-slate-100 flex items-center justify-between w-full">
                        {header}
                    </div>
                </div>
            )}
            <div>{children}</div>
            {footer && <div className="mt-4 pt-4 border-t border-slate-800/50">{footer}</div>}
        </div>
    );
}
