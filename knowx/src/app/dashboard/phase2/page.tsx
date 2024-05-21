// "use client";
import Image from "next/image";
import UserMenu from "@/app/components/UserMenu";
import { toggleCategory, addCategory } from "@/app/actions/search";
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
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-start flex-col">
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

        <div className="w-full relative p-14 snap-start">
          <h1 className="text-5xl text-center text-black dark:text-white">
            Select your Favorites
          </h1>
        </div>

        <div className="overflow-y-scroll h-[20rem] items-center justify-center p-3 no-scrollbar">
          <ul className="grid grid-cols-2 flex-wrap gap-8">
            {allObjects.map((feature, index) => (
              <button
                key={index}
                className={`text-xl rounded-xl py-3 px-8 text-wrap text-ellipsis overflow-hidden ${
                  categories.includes(feature)
                    ? "bg-purple-500 transition duration-100 ease-in-out"
                    : "bg-white hover:bg-purple-300 transition duration-100 ease-in-out"
                }`}
                onClick={() => toggleCategory(feature)}
              >
                <div className="text-black text-xl font-bold text-center">
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
