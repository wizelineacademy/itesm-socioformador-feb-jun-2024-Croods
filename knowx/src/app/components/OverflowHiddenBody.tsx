export default function OverflowHiddenBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <body
      className={`${className} overflow-hidden bg-backgroundLight dark:bg-backgroundDark`}
    >
      {children}
    </body>
  );
}
