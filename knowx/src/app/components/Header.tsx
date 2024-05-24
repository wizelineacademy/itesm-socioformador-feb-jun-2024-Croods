import Image from "next/image";
import UserMenu from "./UserMenu";

export default function Header({
  isDashboard = true,
  title,
  userMenuShowBoth = false,
  children,
}: {
  isDashboard: boolean;
  title?: string;
  userMenuShowBoth?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto h-screen text-gray-600 flex flex-wrap justify-center content-baseline">
      <header
        className={
          !title
            ? "relative top-0 left-0 right-0 py-3 pb-20 flex justify-between items-center w-full h-fit"
            : "top-0 left-0 right-0 pb-8 flex justify-between items-center w-full h-fit"
        }
      >
        {!title && <div className="invisible" />}

        <Image
          className={
            !title
              ? "dark:invert absolute top-0 left-0 right-0 mr-auto ml-auto pt-3"
              : "dark:invert top-0 left-0 my-5 ml-8"
          }
          src={"/Logo.svg"}
          alt="KnowX Logo"
          width={50}
          height={50}
          priority
        />

        {title && (
          <h1 className="absolute left-0 right-0 text-5xl font-bold text-center text-backgroundDark dark:text-backgroundLight select-none">
            {title}
          </h1>
        )}

        <UserMenu
          className={!title ? "right-0 mr-3" : "right-0 mr-5"}
          isDashboard={isDashboard}
          showBoth={userMenuShowBoth}
        />
      </header>
      {children}
    </div>
  );
}
