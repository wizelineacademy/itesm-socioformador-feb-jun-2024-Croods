import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Header from "@/app/components/Header";

export default function NotFound() {
  return (
    <Header isDashboard={false} userMenuShowBoth={true}>
      <div className="flex h-[70%] flex-col items-center justify-center gap-2">
        <FaceFrownIcon className="w-20 text-gray-400" />
        <h2 className="text-3xl font-semibold">404 Not Found</h2>
        <Link
          href="/history"
          className="mt-4 rounded-md bg-backgroundDark dark:bg-backgroundLight px-4 py-2 text-md text-backgroundLight dark:text-backgroundDark transition-opacity hover:opacity-80"
        >
          Go Back
        </Link>
      </div>
    </Header>
  );
}
