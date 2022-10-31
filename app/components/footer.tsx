import Link from "next/link";

const Footer = () => {
  return (
    <p className="text-gray-500 dark:text-gray-100">
      Made by{" "}
      <Link
        role="link"
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://twitter.com/max_leiter"
        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 hover:underline"
      >
        Max Leiter
      </Link>
      . Source/sponsor on{" "}
      <Link
        role="link"
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://github.com/MaxLeiter/easyarty"
        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 hover:underline"
      >
        GitHub
      </Link>
      .
    </p>
  );
};

export default Footer;
