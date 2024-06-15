import UserMenu from "./UserMenu"
import KnowXLogo from "./KnowXLogo"

export default function Header({
  isDashboard = true,
  title,
  userMenuShowBoth = false,
  children,
}: {
  isDashboard: boolean
  title?: string
  userMenuShowBoth?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto flex h-screen flex-wrap content-baseline justify-center text-gray-600">
      <header
        className={
          !title
            ? "relative left-0 right-0 top-0 flex h-fit w-full items-center justify-between py-3 pb-20"
            : "left-0 right-0 top-0 flex h-fit w-full items-center justify-between pb-8"
        }
      >
        {!title && <div className="invisible" />}

        <KnowXLogo title={title} />

        {title && (
          <h1 className="absolute left-0 right-0 select-none text-center text-5xl font-bold text-backgroundDark dark:text-backgroundLight">
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
  )
}
