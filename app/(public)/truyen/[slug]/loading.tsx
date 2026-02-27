export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24">
      {/* Hero skeleton */}
      <div className="border-b border-slate-800 bg-slate-900/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {/* Cover skeleton */}
            <div className="mx-auto w-48 shrink-0 md:mx-0">
              <div className="aspect-[3/4] animate-pulse rounded-2xl bg-slate-800" />
            </div>
            {/* Info skeleton */}
            <div className="flex flex-1 flex-col gap-4">
              <div className="h-3 w-20 animate-pulse rounded-full bg-slate-800" />
              <div className="h-10 w-72 animate-pulse rounded-2xl bg-slate-800" />
              <div className="h-4 w-48 animate-pulse rounded-full bg-slate-800" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-7 w-20 animate-pulse rounded-full bg-slate-800" />
                ))}
              </div>
              <div className="flex gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-16 animate-pulse rounded-xl bg-slate-800" />
                ))}
              </div>
              <div className="h-4 w-full max-w-md animate-pulse rounded-full bg-slate-800" />
              <div className="h-4 w-80 animate-pulse rounded-full bg-slate-800" />
              <div className="flex gap-3">
                <div className="h-11 w-36 animate-pulse rounded-xl bg-slate-800" />
                <div className="h-11 w-44 animate-pulse rounded-xl bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            <div className="h-7 w-48 animate-pulse rounded-xl bg-slate-800" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 w-full animate-pulse rounded-xl bg-slate-800/50" />
            ))}
          </div>
          <div className="space-y-3">
            <div className="h-7 w-40 animate-pulse rounded-xl bg-slate-800" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 w-full animate-pulse rounded-xl bg-slate-800/50" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
