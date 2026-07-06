export default function SkeletonCard() {
  return (
    <div className="border border-zinc-800 rounded-xl p-6 animate-pulse">
      <div className="h-5 w-32 bg-zinc-800 rounded mb-5"></div>

      <div className="h-10 w-16 bg-zinc-700 rounded"></div>
    </div>
  );
}