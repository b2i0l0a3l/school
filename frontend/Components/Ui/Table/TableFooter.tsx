import { usePaginationStore } from "@/Context/paginationStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";

function TableFooter({ pageCount }: { pageCount: number }) {
  const setPage = usePaginationStore((state) => state.setPage);
  const page = usePaginationStore((state) => state.pageIndex);

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 p-4 border-t border-slate-700/50 bg-slate-900/40">
      <button
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 bg-transparent text-slate-400 hover:text-indigo-400 hover:border-indigo-400 hover:bg-indigo-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        aria-label="الصفحة السابقة"
      >
        <ChevronRight size={16} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all
            ${page === p 
              ? "bg-gradient-to-br from-indigo-600 to-indigo-500 text-white border-transparent shadow-[0_0_15px_rgba(79,70,229,0.25)]" 
              : "border border-slate-700 text-slate-400 hover:text-indigo-400 hover:border-indigo-400 hover:bg-indigo-500/10"
            }`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 bg-transparent text-slate-400 hover:text-indigo-400 hover:border-indigo-400 hover:bg-indigo-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        onClick={() => setPage(page + 1)}
        disabled={page === pageCount}
        aria-label="الصفحة التالية"
      >
        <ChevronLeft size={16} />
      </button>
    </div>
  );
}

export default memo(TableFooter);