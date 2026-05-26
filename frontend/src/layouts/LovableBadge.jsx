export default function LovableBadge() {
  return (
    <aside
      id="lovable-badge"
      className="fixed bottom-3 right-3 z-[1000000]"
    >
      <a
        target="_blank"
        href="https://lovable.dev"
        rel="noopener noreferrer"
        className="rounded bg-black px-3 py-2 text-xs text-white"
      >
        Edit with Lovable
      </a>
    </aside>
  );
}