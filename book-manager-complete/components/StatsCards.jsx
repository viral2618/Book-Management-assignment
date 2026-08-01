export default function StatsCards({ stats }) {
  const cards = [
    {
      label: "Total Books",
      value: stats.total,
      valueClass: "text-zinc-900 dark:text-zinc-50",
    },
    {
      label: "Want To Read",
      value: stats.wantToRead,
      valueClass: "text-sky-600 dark:text-sky-400",
    },
    {
      label: "Reading",
      value: stats.reading,
      valueClass: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Completed",
      value: stats.completed,
      valueClass: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {card.label}
          </p>
          <p className={`mt-1 text-3xl font-bold ${card.valueClass}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
