/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8msXN9vzLJj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="w-full h-full bg-gray-100 dark:bg-gray-900">
                <main className="px-4 mx-auto prose prose-gray md:px-0 dark:prose-invert">
                    {children}
                </main>
            </div>
        </div>
    )
}