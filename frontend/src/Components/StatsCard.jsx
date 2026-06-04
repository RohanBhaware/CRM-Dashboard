export default function StatsCard({
  title,
  value
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <h1 className="text-3xl font-bold mt-2">
        {value}
      </h1>

    </div>
  );
}