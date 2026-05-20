import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FaEraser, FaPaintBrush } from "react-icons/fa";

export type SketchPadHandle = {
  saveImage: () => void;
  clearCanvas: () => void;
};

type Tool = "brush" | "eraser";

const colors = [
  "#111111",
  "#e5ae00",
  "#1d47ff",
  "#e63946",
  "#2d7a35",
  "#ffffff",
];

const SketchPad = forwardRef<SketchPadHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState("#111111");
  const [size, setSize] = useState(5);

  useEffect(() => {
    clearCanvas();
  }, []);

  useImperativeHandle(ref, () => ({
    saveImage,
    clearCanvas,
  }));

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    isDrawing.current = true;
    canvas.setPointerCapture(e.pointerId);

    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getPos(e);

    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = tool === "eraser" ? "#f6efd9" : color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e?: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = false;

    if (e && canvasRef.current?.hasPointerCapture(e.pointerId)) {
      canvasRef.current.releasePointerCapture(e.pointerId);
    }
  };

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#f6efd9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function saveImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const output = document.createElement("canvas");
    output.width = 1200;
    output.height = 1400;

    const ctx = output.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#f6efd9";
    ctx.fillRect(0, 0, output.width, output.height);
    ctx.drawImage(canvas, 0, 0, output.width, 1100);

    ctx.fillStyle = "#111";
    ctx.font = "48px Comic Sans MS, Trebuchet MS, sans-serif";
    ctx.fillText("SIDE GATE SUMMER", 60, 1190);

    ctx.font = "30px Comic Sans MS, Trebuchet MS, sans-serif";
    ctx.fillText("Cookouts, Good People, & Summer Nights.", 60, 1250);

    ctx.font = "56px Comic Sans MS, Trebuchet MS, sans-serif";
    ctx.fillText("1998", 980, 1260);

    ctx.strokeStyle = "#1d47ff";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(60, 1275);
    ctx.lineTo(560, 1270);
    ctx.stroke();

    const dataUrl = output.toDataURL("image/png");

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      const imageWindow = window.open();
      if (imageWindow) {
        imageWindow.document.write(`
          <img 
            src="${dataUrl}" 
            style="width:100%;height:auto;" 
            alt="Side Gate Summer Sketch" 
          />
        `);
      }
      return;
    }

    const link = document.createElement("a");
    link.download = "side-gate-summer-sketch.png";
    link.href = dataUrl;
    link.click();
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 p-4 md:grid-cols-[minmax(0,1fr)_280px] md:p-5">
      <div className="min-w-0 space-y-4">
        <div className="sticky top-0 z-20 border-4 border-black bg-[#fff8df] p-3 shadow-xl md:hidden">
          <ToolControls
            tool={tool}
            setTool={setTool}
            color={color}
            setColor={setColor}
            size={size}
            setSize={setSize}
          />
        </div>

        <div className="border-4 border-black bg-[#f6efd9] p-3">
          <canvas
            ref={canvasRef}
            width={1200}
            height={1000}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            onPointerLeave={stopDrawing}
            className="block h-[58vh] w-full touch-none cursor-crosshair bg-[#f6efd9] md:h-[70vh]"
          />
        </div>
      </div>

      <aside className="hidden space-y-5 md:block">
        <div className="border-4 border-black bg-[#fff8df] p-4">
          <h1 className="font-hand text-4xl leading-none">
            SIDE GATE
            <br />
            SUMMER
          </h1>

          <div className="mt-2 h-2 w-44 -rotate-2 bg-[#e5ae00]" />

          <p className="mt-4 font-hand text-xl">Draw your own summer memory.</p>
        </div>

        <div className="border-4 border-black bg-[#fff8df] p-4">
          <h2 className="font-hand text-2xl">TOOLS:</h2>
          <ToolControls
            tool={tool}
            setTool={setTool}
            color={color}
            setColor={setColor}
            size={size}
            setSize={setSize}
          />
        </div>
      </aside>
    </section>
  );
});

type ToolControlsProps = {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  size: number;
  setSize: (size: number) => void;
};

function ToolControls({
  tool,
  setTool,
  color,
  setColor,
  size,
  setSize,
}: ToolControlsProps) {
  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap md:mt-4 md:grid md:gap-3 md:overflow-visible">
        <button
          type="button"
          onClick={() => setTool("brush")}
          className={`shrink-0 border-2 border-black px-3 py-2 font-hand ${
            tool === "brush" ? "bg-[#f6d66b]" : "bg-white"
          }`}
        >
          <span className="hidden md:inline">
            <FaPaintBrush />
          </span>
          Brush
        </button>

        <button
          type="button"
          onClick={() => setTool("eraser")}
          className={`shrink-0 border-2 border-black px-3 py-2 font-hand ${
            tool === "eraser" ? "bg-[#f6d66b]" : "bg-white"
          }`}
        >
          <span className="hidden md:inline">
            <FaEraser />
          </span>
          Eraser
        </button>

        <div className="flex shrink-0 flex-wrap items-center gap-2 md:mt-2">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setColor(c);
                setTool("brush");
              }}
              className={`h-9 w-9 border-2 border-black md:h-8 md:w-8 ${
                color === c && tool === "brush"
                  ? "ring-4 ring-[#1d47ff]"
                  : ""
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Select ${c}`}
            />
          ))}

          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              setTool("brush");
            }}
            className="h-9 w-12 cursor-pointer border-2 border-black bg-white md:h-8 md:w-10"
            aria-label="Choose custom color"
          />
        </div>
      </div>

      <label className="mt-3 flex items-center gap-2 font-hand">
        Size
        <input
          type="range"
          min="2"
          max="24"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full"
        />
      </label>
    </>
  );
}

SketchPad.displayName = "SketchPad";

export default SketchPad;