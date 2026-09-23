import Link from "next/link";

const CLASSES =
  "mr-2 inline-block rounded-md border border-gray-100 bg-black px-6 py-3 text-sm text-gray-50 no-underline dark:border dark:border-gray-100";

export default function Button({ text, url }: { text: string; url: string }) {
  if (url.startsWith("/")) {
    return (
      <Link href={url} className={CLASSES} style={{ color: "#ffffff" }}>
        {text}
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={CLASSES}
      style={{ color: "#ffffff" }}
    >
      {text}
    </a>
  );
}
