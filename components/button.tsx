export default function Button({ text, url }: { text: string; url: string }) {
  return (
    <a
      href={url}
      style={{ color: "#ffffff", textDecoration: "none" }}
      className="mr-2 inline-block rounded-md border border-gray-100 bg-black px-6 py-3 text-sm text-gray-50 dark:border dark:border-gray-100"
    >
      {text}
    </a>
  );
}
