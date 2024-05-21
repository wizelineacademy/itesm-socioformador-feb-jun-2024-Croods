export default function OverflowHiddenBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <body
      className={`${className} overflow-hidden dark:bg-backgroundDark bg-backgroundLight`}
    >
      {children}
    </body>
  );
}
