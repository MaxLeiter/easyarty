import Link from "next/link"

export function BlogFooter({ prevHref: prev, nextHref: next }: {
    prevHref: string
    nextHref: string
}) {
   return <footer className="flex items-center justify-between px-4 py-8 text-sm text-gray-500 md:px-0 dark:text-gray-400">
        {prev && <Link href={prev} className="hover:text-gray-900 dark:hover:text-gray-200">
            Previous Post
        </Link>}
        {next && <Link href={next} className="hover:text-gray-900 dark:hover:text-gray-200">
            Next Post
        </Link>}
    </footer>
}
