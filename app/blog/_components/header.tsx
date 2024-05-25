import Link from "next/link";

export function BlogHeader({ children }) {
    return <header className="px-4 py-4 md:px-0">
        <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold" prefetch={false}>
                easyarty
            </Link>
        </div>
        <h1 className="mt-4 text-3xl font-bold">{children}</h1>
    </header>
}