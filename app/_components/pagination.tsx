"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-4 items-center mb-25">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-3 py-1 border rounded ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
        aria-disabled={currentPage <= 1}
      >
        Previous
      </Link>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-3 py-1 border rounded ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </div>
  );
}
