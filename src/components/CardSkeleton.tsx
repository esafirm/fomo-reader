import Card from './Card';

export default function CardSkeleton() {
  return (
    <section className="py-4 space-y-4">
      <Card>
        <div className="animate-pulse space-y-4 bg asd">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
      </Card>

      <Card className="ml-8">
        <div className="animate-pulse space-y-4 bg asd">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
      </Card>

      <Card className="ml-8">
        <div className="animate-pulse space-y-4 bg asd">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
      </Card>
    </section>
  );
}
