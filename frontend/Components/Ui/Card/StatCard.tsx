import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    iconColor?: 'indigo' | 'teal' | 'emerald' | 'amber';
    change?: number;
}

const colorMap = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]',
    teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
};

export default function StatCard({
    label,
    value,
    icon,
    iconColor = 'indigo',
    change,
}: StatCardProps) {
    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 hover:border-slate-500/50 hover:bg-slate-800/40 hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${colorMap[iconColor]}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide truncate">{label}</div>
                <div className="text-2xl font-bold text-slate-50 mt-0.5">{value}</div>
                {change !== undefined && (
                    <div className={`flex items-center gap-1 text-xs font-medium mt-1 ${change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        <span>{Math.abs(change)}%</span>
                        <span className="text-slate-500 font-normal ml-1">منذ الشهر الماضي</span>
                    </div>
                )}
            </div>
        </div>
    );
}
