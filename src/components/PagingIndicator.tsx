import Link from 'next/link';

import { IconArrowLeft, IconArrowRight } from './Icons';

type PagingIndicatorProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function PagingIndicator({
  currentPage,
  totalPages,
  basePath,
}: PagingIndicatorProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <div className="flex items-center justify-center space-x-4">
      <Link
        href={`${basePath}?page=${prevPage === 1 ? '' : `${prevPage}`}`}
        className={`p-2 rounded-full ${
          currentPage > 1
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
      >
        <IconArrowLeft />
      </Link>

      <span className="text-lg font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`${basePath}?page=${nextPage}`}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        aria-label="Next page"
      >
        <IconArrowRight />
      </Link>
    </div>
  );
}
