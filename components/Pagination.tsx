import Link from "next/link"

export default function Pagination({
  path,
  currentPage,
  pageCount,
  filterPath
}: {
  path: string,
  currentPage: number,
  pageCount: number,
  filterPath?: string
}) {
  const getPages = () => {
    const pages: any[] = []
    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...')
      } else if (currentPage >= pageCount - 2) {
        pages.push('...', pageCount - 3, pageCount - 2, pageCount - 1, pageCount)
      } else {
        pages.push(1, '...', currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, '...', pageCount)
      }
    }
    return pages
  }

  return (
    <div className='w-full h-12 flex justify-center items-center bg-main-bg'>
      <div className="w-full h-full flex sm:hidden flex-row items-center justify-between p-2">
        <Link
          href={`${path}?page=${currentPage - 1}${filterPath ? filterPath : ''}`}
          className={`w-20 h-full flex items-center justify-center bg-logo-blue text-white font-medium ${currentPage == 1 && 'pointer-events-none'}`}
        >
          Previous
        </Link>
        <p>{currentPage}/{pageCount}</p>
        <Link
          href={`${path}?page=${currentPage + 1}${filterPath ? filterPath : ''}`}
          className={`w-20 h-full flex items-center justify-center  bg-logo-blue text-white font-medium ${currentPage == pageCount && 'pointer-events-none'}`}
        >
          Next
        </Link>
      </div>
      <div className="h-8 hidden sm:flex justify-between items-center bg-light-bg rounded-md">
        <Link
          href={`${path}?page=1${filterPath ? filterPath : ''}`}
          className={`w-8 h-full flex justify-center text-xl text-logo-blue font-semibold hover:bg-dark-bg ${currentPage == 1 && 'pointer-events-none'}`}
          aria-disabled={currentPage == 1}
        >
          &#171;
        </Link>
        <Link
          href={`${path}?page=${currentPage - 1}${filterPath ? filterPath : ''}`}
          className={`w-8 h-full flex justify-center items-center text-logo-blue font-semibold hover:bg-dark-bg ${currentPage == 1 && 'pointer-events-none'}`}
          aria-disabled={currentPage == 1}
        >
          &#60;
        </Link>

        {/* Page numbers */}
        {getPages().map((page, index) => (
          typeof page === 'number' ? (
            <Link
              key={index}
              href={`${path}?page=${page}${filterPath ? filterPath : ''}`}
              className={`w-10 h-full flex justify-center items-center font-medium hover:bg-dark-bg ${currentPage === page ? 'bg-dark-bg text-logo-blue' : 'text-white'}`}
            >
              {page}
            </Link>
          ) : (
            <span key={index} className="w-8 h-full flex justify-center items-center text-white">
              {page}
            </span>
          )
        ))}

        <Link
          href={`${path}?page=${currentPage + 1}${filterPath ? filterPath : ''}`}
          className={`w-8 h-full flex justify-center items-center text-logo-blue font-semibold hover:bg-dark-bg ${currentPage == pageCount && 'pointer-events-none'}`}
          aria-disabled={currentPage == pageCount}
        >
          &#62;
        </Link>
        <Link
          href={`${path}?page=${pageCount}${filterPath ? filterPath : ''}`}
          className={`w-8 h-full flex justify-center text-xl text-logo-blue font-semibold hover:bg-dark-bg ${currentPage == pageCount && 'pointer-events-none'}`}
          aria-disabled={currentPage == pageCount}
        >
          &#187;
        </Link>
      </div>
    </div>
  )
}
