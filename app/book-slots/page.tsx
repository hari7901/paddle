// app/book-slots/page.tsx
// (Server Component – no hooks)

import dynamic from "next/dynamic";

// Dynamically import the real client component
const BookSlotsClient = dynamic(() => import("./BookSlotsClient"), {
  ssr: false, // ⬅️  prevents hooks from running during SSR
});

export default function BookSlotsPage() {
  return <BookSlotsClient />;
}
