// "use client";
import { toggleCategory } from "@/app/actions/search";
import { getCategories } from "@/app/helper/cookies";
import P2_NewCategory from "@/app/components/Phase2/P2_NewCategory";
import { checkSession } from "@/app/actions/redirect";
import { redirect } from "next/navigation";
import Header from "@/app/components/Header";

export default async function Features() {
  if (!(await checkSession())) {
    redirect("/auth");
  }
  const { categories, allObjects } = getCategories();
  // const [newFeature, setNewFeature] = useState<string>("");
  // // const featuresList = categorySearchFunction
  // const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // const addNewFeature = () => {
  //   if (newFeature.trim() !== "") {
  //     //featuresList.push(newFeature);
  //     setFeaturesList([...featuresList, newFeature]);
  //     setNewFeature(""); // Clear input after adding the feature
  //   }
  // };

  // const toggleFeature = (feature: string) => {
  //   const isSelected = selectedFeatures.includes(feature);
  //   if (isSelected) {
  //     setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
  //   } else {
  //     setSelectedFeatures([...selectedFeatures, feature]);
  //   }
  // };

  // const { resolvedTheme } = useTheme();

  return (
    <main className="flex bg-backgroundLight dark:bg-backgroundDark">
      {/* <UserMenu className="absolute right-0 mr-3" /> */}
      <div className="mx-auto flex h-screen max-w-6xl flex-col flex-wrap content-center justify-start px-6 text-gray-600">
        {/* <section className="relative top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            className="relative top-0 left-0 right-0"
            src={"light" === "light" ? "/Logo.svg" : "/LogoDark.svg"}
            alt="KnowX Logo"
            width={50}
            height={50}
            priority
          />
        </section> */}

        <Header isDashboard={true} />

        <div className="relative w-full snap-start p-14">
          <h1 className="text-center text-5xl text-black dark:text-white">
            Select your Favorites
          </h1>
        </div>

        <div className="no-scrollbar h-[20rem] items-center justify-center overflow-y-scroll p-3">
          <ul className="grid grid-cols-2 flex-wrap gap-8">
            {allObjects.map((feature, index) => (
              <button
                key={index}
                className={`overflow-hidden text-ellipsis text-wrap rounded-xl px-8 py-3 text-xl ${
                  categories.includes(feature)
                    ? "bg-purple-500 transition duration-100 ease-in-out"
                    : "bg-white transition duration-100 ease-in-out hover:bg-purple-300"
                }`}
                onClick={() => toggleCategory(feature)}
              >
                <div className="text-center text-xl font-bold text-black">
                  {feature}
                </div>
              </button>
            ))}
          </ul>
        </div>
        <P2_NewCategory></P2_NewCategory>
      </div>
    </main>
  );
}
