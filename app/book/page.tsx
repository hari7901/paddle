// app/book/page.tsx
// Server Component – no hooks

import { Suspense } from "react";
import BookClient from "./BookClient"; // <- plain import

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <BookClient />
    </Suspense>
  );
}
