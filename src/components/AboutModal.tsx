type AboutModalProps = {
  onClose: () => void;
};

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <section className="max-w-lg border-4 border-black bg-[#efe8d4] shadow-2xl">
        <header className="flex items-center justify-between bg-[#001a8d] px-3 py-2 text-white">
          <span className="font-bold">about_sidegate.txt</span>

          <button
            type="button"
            onClick={onClose}
            className="h-6 w-6 border border-black bg-[#d9d9d9] text-black"
          >
            ×
          </button>
        </header>

        <div className="p-5 font-hand text-xl">
          <h2 className="text-4xl">SIDE GATE SUMMER</h2>

          <p className="mt-4">
            A Black Summer Story about cookouts, late-night drives, unread group
            chats, grown love, burnout, healing, and finding joy again.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 border-2 border-black bg-[#f6d66b] px-4 py-2 font-bold"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}