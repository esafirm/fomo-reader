export default function CreationTime({ time }: { time: string }) {
  return (
    <div className="text-gray-600 text-sm pt-4">{toRelativeDate(time)}</div>
  );
}

// convert 2024-11-30T14:23:42.253+00:00 to 2 days ago
function toRelativeDate(date: string): string {
  const now = new Date();
  const inputDate = new Date(date);
  const diffTime = Math.abs(now.getTime() - inputDate.getTime());
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'just now';
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(inputDate);
}
