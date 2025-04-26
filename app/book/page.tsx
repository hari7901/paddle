// app/book/page.tsx
// (Server Component – no hooks)

import dynamic from "next/dynamic";

const BookClient = dynamic(() => import("./BookClient"), { ssr: false });

export default function BookPage() {
  return <BookClient />;
}
