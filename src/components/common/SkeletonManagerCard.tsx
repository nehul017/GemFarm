// components/SkeletonManagerCard.tsx
export default function SkeletonManagerCard() {
    return (
      <div className="bg-white shadow-xl px-3 py-4 rounded-lg mb-4 animate-pulse">
        <div className="grid grid-cols-[50px_1fr_20px] items-center gap-3">
          <div className="w-[50px] h-[50px] rounded-full bg-gray-300" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-32" />
            <div className="h-3 bg-gray-300 rounded w-48" />
            <div className="h-3 bg-gray-300 rounded w-24" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-4 bg-gray-300 rounded" />
            <div className="h-4 w-4 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    );
  }
  