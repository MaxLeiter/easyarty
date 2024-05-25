import type { MDXComponents } from "mdx/types";
import { BlogBody } from "./app/blog/_components/body";
import { BlogFooter } from "./app/blog/_components/footer";
import { BlogHeader } from "./app/blog/_components/header";
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Header: BlogHeader,
    Footer: BlogFooter,
    Body: BlogBody,
    h2: (props) => <h2 className="text-xl font-bold" {...props} />,
  };
}
