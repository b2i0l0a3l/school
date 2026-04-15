import ButtonProps from "@/Util/Types/ButtonProps";

type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ExtendedButtonProps extends ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ReactNode;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
}

const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all relative overflow-hidden whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-br from-indigo-700 to-indigo-500 text-white shadow-[0_0_20px_rgba(67,56,202,0.2)] hover:shadow-[0_0_30px_rgba(67,56,202,0.4)] hover:-translate-y-[1px]',
    accent: 'bg-gradient-to-br from-teal-600 to-teal-400 text-white shadow-[0_0_20px_rgba(20,184,166,0.15)] hover:shadow-[0_0_30px_rgba(20,184,166,0.35)] hover:-translate-y-[1px]',
    outline: 'bg-transparent text-slate-400 border border-slate-700/50 hover:border-indigo-400 hover:text-indigo-400 hover:bg-indigo-500/10',
    ghost: 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/50',
    danger: 'bg-rose-500/15 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
    icon: 'p-2 w-9 h-9',
};

export default function Button({
    type = "button",
    text,
    onClick,
    disabled,
    className = '',
    variant = 'primary',
    size = 'md',
    icon,
    loading = false,
}: ExtendedButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        >
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-150 pointer-events-none" />
            
            {loading ? (
                <div className="w-4 h-4 border-2 border-slate-600 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
                    {text && <span>{text}</span>}
                </>
            )}
        </button>
    );
}