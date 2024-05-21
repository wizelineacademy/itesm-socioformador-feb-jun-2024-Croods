import Image from "next/image";
import UserMenu from "./UserMenu";

export default function Header({
  isDashboard = true,
  title,
}: {
  isDashboard: boolean;
  title?: string;
}) {
  return (
    <header
      className={
        !title
          ? "fixed top-0 left-0 right-0 py-3 flex justify-center items-center"
          : "fixed top-0 left-0 right-0 py-8 flex justify-center items-center"
      }
    >
      <Image
        className={
          !title
            ? "dark:invert relative top-0 left-0 right-0"
            : "dark:invert absolute top-0 left-0 my-5 ml-8"
        }
        src={"/Logo.svg"}
        alt="KnowX Logo"
        width={50}
        height={50}
        priority
      />

      {title && (
        <h1 className="text-5xl font-bold text-center text-backgroundDark dark:text-backgroundLight">
          {title}
        </h1>
      )}

      <UserMenu
        className={!title ? "absolute right-0 mr-3" : "absolute right-0 mr-5"}
        isDashboard={isDashboard}
      />
    </header>
  );
}
