export function PointsSection({
  items,
  label,
}: {
  items: string[];
  label: string;
}) {
  return (
    <div className="pt-4">
      <span className="font-medium">{label}</span>

      {(items || []).map((item, index) => (
        <div key={index} className="text-gray-600">
          · {item}
        </div>
      ))}
    </div>
  );
}
