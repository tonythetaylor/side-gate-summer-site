import Toolbar from "./Toolbar";
import type { ReactNode } from "react";
import type { ViewMode } from "../App";

type Props = {
  children: ReactNode;
  view: ViewMode;
  onHome: () => void;
  onNew: () => void;
  onSave: () => void;
  onClear: () => void;
  onHelp: () => void;
};

export default function WordPadShell({
  children,
  view,
  onHome,
  onNew,
  onSave,
  onClear,
  onHelp,
}: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#008080] p-4 text-black">
      <section className="absolute left-1/2 top-6 flex h-[calc(100vh-5rem)] w-[min(96vw,1450px)] -translate-x-1/2 flex-col overflow-hidden border-2 border-black bg-[#c0c0c0] shadow-[6px_6px_0px_rgba(0,0,0,0.45)]">
        <header className="flex items-center justify-between bg-[#001a8d] px-2 py-1 text-white">
          <span className="truncate text-sm font-bold">
            {view === "home"
              ? "sidegate_summer - WordPad"
              : "sidegate_sketchpad - WordPad"}
          </span>

          <div className="ml-3 flex shrink-0 gap-1">
            {["_", "□", "×"].map((item) => (
              <button
                key={item}
                type="button"
                className="grid h-5 w-5 place-items-center border border-black bg-[#d9d9d9] text-xs leading-none text-black"
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <div className="border-b border-[#808080] bg-[#c0c0c0]">
          <Toolbar
            view={view}
            onHome={onHome}
            onNew={onNew}
            onSave={onSave}
            onClear={onClear}
            onHelp={onHelp}
          />
        </div>

        <div className="flex-1 overflow-y-auto bg-[#efe8d4]">{children}</div>

        <footer className="flex flex-col gap-1 border-t-2 border-[#888] bg-[#c0c0c0] px-3 py-2 font-hand text-sm md:flex-row md:items-center md:justify-between">
          <span>For Help, press F1</span>
          <span>Cookouts, Good People, & Summer Nights.</span>
          <span>1998</span>
        </footer>
      </section>
    </main>
  );
}