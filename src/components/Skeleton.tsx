export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-muted rounded-md ${className}`} />
  );
}

export function StationCardSkeleton() {
  return (
    <div className="bg-secondary/50 rounded-2xl overflow-hidden border border-border p-0">
      <Skeleton className="aspect-square rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
