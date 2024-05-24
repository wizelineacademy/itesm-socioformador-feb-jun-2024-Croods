import Header from "./Header";
import { Spinner } from "@nextui-org/react";

export default function LoadingScreen() {
  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={false} userMenuShowBoth={true}>
        <div className="flex w-2/3 justify-center">
          <Spinner size="lg" label="Loading..." color="secondary" />
        </div>
      </Header>
    </main>
  );
}
