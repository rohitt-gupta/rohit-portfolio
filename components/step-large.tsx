export default function StepLarge({ number, title }: { number: React.ReactNode; title: string }) {
  return (
    <div className="step flex items-center py-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 font-extrabold text-green-500 dark:border-gray-900">
        {number}
      </div>
      <h2 className="ml-3 font-bold tracking-tight">{title}</h2>
    </div>
  );
}
