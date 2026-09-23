export default function StepCheck({ title }: { title: string }) {
  return (
    <div className="font-small mb-2 flex items-baseline">
      <div>
        <svg
          className="mr-2 inline-block h-5 w-5 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <span className="content-center">{title}</span>
    </div>
  );
}
