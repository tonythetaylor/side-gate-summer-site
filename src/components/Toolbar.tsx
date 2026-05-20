import {
  FaEraser,
  FaFile,
  FaHome,
  FaQuestionCircle,
  FaSave,
} from "react-icons/fa";
import type { ViewMode } from "../App";

type ToolbarProps = {
  view: ViewMode;
  onHome: () => void;
  onNew: () => void;
  onSave: () => void;
  onClear: () => void;
  onHelp: () => void;
};

export default function Toolbar({
  view,
  onHome,
  onNew,
  onSave,
  onClear,
  onHelp,
}: ToolbarProps) {
  return (
    <>
      <nav className="flex gap-5 overflow-x-auto whitespace-nowrap border-b-2 border-[#777] px-4 py-2 text-base md:text-lg">
        <button onClick={onNew} className="hover:underline">
          File
        </button>
        <button
          onClick={view === "sketchpad" ? onClear : undefined}
          className="hover:underline"
        >
          Edit
        </button>
        <button onClick={onHome} className="hover:underline">
          View
        </button>
        <button onClick={onNew} className="hover:underline">
          Insert
        </button>
        <button className="hover:underline">Format</button>
        <button onClick={onHelp} className="hover:underline">
          Help
        </button>
      </nav>

      <section className="flex items-center gap-2 overflow-x-auto whitespace-nowrap border-b-2 border-[#aaa] px-4 py-3">
        <IconButton label="Home" onClick={onHome} icon={<FaHome />} />
        <IconButton label="New" onClick={onNew} icon={<FaFile />} />
        <IconButton
          label="Save"
          onClick={onSave}
          icon={<FaSave />}
          disabled={view !== "sketchpad"}
        />
        <IconButton
          label="Clear"
          onClick={onClear}
          icon={<FaEraser />}
          disabled={view !== "sketchpad"}
        />
        <IconButton label="Help" onClick={onHelp} icon={<FaQuestionCircle />} />
      </section>
    </>
  );
}

type IconButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

function IconButton({ label, icon, onClick, disabled }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex shrink-0 items-center gap-2 border-2 border-[#777] bg-[#ddd] px-3 py-2 text-sm shadow disabled:cursor-not-allowed disabled:opacity-40"
      title={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}