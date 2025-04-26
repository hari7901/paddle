// app/book-slots/page.tsx
// Server Component – no hooks

import { Suspense } from "react";
import BookSlotsClient from "./BookSlotsClient"; // <- plain import

export default function BookSlotsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <BookSlotsClient />
    </Suspense>
  );
}
