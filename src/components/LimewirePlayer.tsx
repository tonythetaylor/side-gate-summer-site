import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaStepForward, FaVolumeUp } from "react-icons/fa";

export default function LimewirePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", () => setPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    await audio.play();
    setPlaying(true);
  };

  return (
    <>
      <audio ref={audioRef} src="/music/outside-til-the-streetlights.wav" />

      <div className="fixed bottom-3 right-3 z-50 w-65 rotate-1 border-4 border-black bg-[#d4d0c8] shadow-[5px_5px_0px_#000] sm:bottom-4 sm:right-4 sm:w-[300px] md:bottom-6 md:right-6 md:w-[320px]">
        <div className="flex items-center justify-between bg-[#001a8d] px-2 py-1 text-white">
          <span className="truncate text-xs font-bold">
            LimeWire Media Player
          </span>

          <div className="flex gap-1">
            {["_", "□", "×"].map((item) => (
              <button
                key={item}
                type="button"
                className="h-4 w-4 border border-black bg-[#d9d9d9] text-[10px] leading-none text-black"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 p-2 sm:p-3">
          <div className="border-2 border-black bg-[#efe8d4] p-2">
            <p className="truncate font-mono text-[10px] sm:text-xs">
              outside_til_the_streetlights_FINAL2.mp3
            </p>

            <div className="mt-2 flex items-center justify-between text-[9px] sm:text-[10px]">
              <span>Connected to 3 peers</span>
              <span>192 kbps</span>
            </div>

            <div className="mt-2 h-3 overflow-hidden border border-black bg-black">
              <div className="limewave h-full w-full" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={togglePlayback}
                className="flex h-8 w-8 items-center justify-center border-2 border-black bg-[#f6d66b] active:translate-y-[1px] sm:h-9 sm:w-9"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <FaPause /> : <FaPlay />}
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white sm:h-9 sm:w-9"
                aria-label="Next"
              >
                <FaStepForward />
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white sm:h-9 sm:w-9"
                aria-label="Volume"
              >
                <FaVolumeUp />
              </button>
            </div>

            <div className="border-2 border-black bg-black px-2 py-1 font-mono text-xs text-[#4cff4c] sm:px-3 sm:py-2 sm:text-sm">
              {currentTime}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}