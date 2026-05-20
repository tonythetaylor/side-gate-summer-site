import { FaApple, FaSpotify } from "react-icons/fa";
import { SiTidal } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { tracks } from "../data/tracks";
import { links } from "../data/links";
import LimewirePlayer from "./LimewirePlayer";

type Props = {
  onOpenSketchpad: () => void;
};

export default function AlbumHome({ onOpenSketchpad }: Props) {
  return (
    <section className="grid gap-8 p-5 pb-36 md:grid-cols-[1.05fr_.95fr] md:p-8 md:pb-36 lg:p-10">
      <div className="min-w-0">
        <h1 className="font-hand text-6xl leading-none tracking-tight md:text-8xl">
          SIDE GATE
          <br />
          SUMMER
        </h1>

        <div className="mt-2 h-2 w-72 -rotate-2 bg-[#e5ae00]" />

        <p className="mt-5 max-w-2xl font-hand text-xl leading-snug md:text-2xl">
          A Black Summer Story about cookouts, late-night drives, unread group
          chats, grown love, burnout, healing, and finding joy again.
        </p>

        <div className="mt-8 max-w-[680px] overflow-hidden border-4 border-black bg-white p-2 shadow-xl md:-rotate-1">
          <img
            src="/side-gate-summer.png"
            alt="Side Gate Summer artwork"
            className="block w-full"
          />
        </div>
      </div>

      <aside className="min-w-0 space-y-6">
        <div className="border-4 border-black bg-[#fff8df] p-5 shadow-xl md:rotate-1">
          <h2 className="font-hand text-4xl underline decoration-[#1d47ff] decoration-4">
            Now Streaming
          </h2>

          <div className="mt-5 grid gap-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border-2 border-black bg-white px-4 py-3 text-lg font-bold hover:bg-[#f6d66b]"
              >
                <span className="flex items-center gap-3">
                  {link.name === "Apple Music" && <FaApple />}
                  {link.name === "Spotify" && <FaSpotify />}
                  {link.name === "TIDAL" && <SiTidal />}
                  {link.name}
                </span>
                <FiExternalLink />
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenSketchpad}
          className="w-full border-4 border-black bg-[#f6d66b] p-5 text-left font-hand text-3xl shadow-xl"
        >
          Open Side Gate Sketchpad
        </button>

        <div className="border-4 border-black bg-[#fff8df] p-5 shadow-xl">
          <h2 className="font-hand text-3xl">TRACKLIST:</h2>

          <ol className="mt-4 space-y-1 font-hand text-lg">
            {tracks.map((track, index) => (
              <li key={track}>
                {String(index + 1).padStart(2, "0")}. {track}
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <LimewirePlayer />
    </section>
  );
}