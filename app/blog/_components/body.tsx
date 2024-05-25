import { PropsWithChildren } from "react";

export function BlogBody({ children }: PropsWithChildren) {
    return <main className="prose prose-gray dark:prose-invert">
        {children}
    </main>
}