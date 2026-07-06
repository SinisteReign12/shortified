import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
    return (
        <div className="p-4 md:p-10">

            <div className="h-10 w-56 bg-zinc-800 rounded animate-pulse mb-8"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />

            </div>

            <div className="border border-zinc-800 rounded-xl h-80 animate-pulse bg-zinc-900 mb-8"></div>

            <div className="border border-zinc-800 rounded-xl h-48 animate-pulse bg-zinc-900"></div>

        </div>
    );
}