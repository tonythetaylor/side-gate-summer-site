import { useRef, useState } from "react";
import WordPadShell from "./components/WordPadShell";
import AlbumHome from "./components/AlbumHome";
import SketchPad from "./components/SketchPad";
import AboutModal from "./components/AboutModal";
import type { SketchPadHandle } from "./components/SketchPad";

export type ViewMode = "home" | "sketchpad";

export default function App() {
  const [view, setView] = useState<ViewMode>("home");
  const [aboutOpen, setAboutOpen] = useState(false);
  const sketchRef = useRef<SketchPadHandle | null>(null);

  const handleSave = () => {
    if (view === "sketchpad") sketchRef.current?.saveImage();
  };

  const handleClear = () => {
    if (view === "sketchpad") sketchRef.current?.clearCanvas();
  };

  return (
    <>
      <WordPadShell
        view={view}
        onHome={() => setView("home")}
        onNew={() => setView("sketchpad")}
        onSave={handleSave}
        onClear={handleClear}
        onHelp={() => setAboutOpen(true)}
      >
        {view === "home" ? (
          <AlbumHome onOpenSketchpad={() => setView("sketchpad")} />
        ) : (
          <SketchPad ref={sketchRef} />
        )}
      </WordPadShell>

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </>
  );
}