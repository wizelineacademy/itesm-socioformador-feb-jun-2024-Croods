import { SimpleHistoryType, FullHistoryType } from "@/interfaces"

export const mockHistory: SimpleHistoryType[] = [
  {
    id: 1,
    search: "test",
    timestamp: new Date("2021-01-01"),
    feedback: 1,
  },
  {
    id: 2,
    search: "test2",
    timestamp: new Date("2021-01-02"),
    feedback: 2,
  },
  {
    id: 3,
    search: "test3",
    timestamp: new Date("2021-01-03"),
    feedback: 3,
  },
]

export const mockFullHistory: FullHistoryType[] = [
  {
    id: 1,
    search: "test",
    generatedTopics:
      "Netflix,  Hulu,  Amazon Prime Video,  Disney+,  HBO Max,  Apple TV+,  Peacock,  Paramount+,  Discovery+,  ESPN+",
    selectedTopics:
      "Netflix,  Hulu,  Amazon Prime Video,  Disney+,  Peacock,  Paramount+,  Discovery+,  ESPN+",
    generatedCategories:
      "Description, Price, Content Library, Streaming Quality, Offline Viewing, Supported Devices, Family Plan, Ad-Free Experience",
    selectedCategories: "Description,  Price, Family Plan,  Ad-Free Experience",
    addedCategories: "Region lock",
    searchResults: `{"categories":["Description","Screen size","Smart TV capabilities","Sound quality"],"results":[{"Name":"LG","Description":"Known for excellent color accuracy and superior image quality.","Categories":[{"Name":"Description","Value":"Excellent color accuracy and superior image quality."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"Google TV built-in, making it easy to use and access various streaming services."},{"Name":"Sound quality","Value":"N/A"}]},{"Name":"Samsung","Description":"Known for their QLED TVs that are extremely bright, making them a great fit for group watching in rooms with ambient light or glare.","Categories":[{"Name":"Description","Value":"QLED TVs that are extremely bright, great for group watching in rooms with ambient light or glare."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"N/A"},{"Name":"Sound quality","Value":"N/A"}]},{"Name":"Sony","Description":"Known for amazing picture quality and color accuracy, with decades of experience creating imaging equipment for professional cinematographers and videographers.","Categories":[{"Name":"Description","Value":"Amazing picture quality and color accuracy, with decades of experience in imaging equipment."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"Google TV built-in, making it easy to use and access various streaming services."},{"Name":"Sound quality","Value":"Excellent built-in audio, especially in their top-end smart TVs."}]},{"Name":"TCL","Description":"A great budget TV brand if you can get their 5-Series or 6-Series.","Categories":[{"Name":"Description","Value":"A great budget TV brand if you can get their 5-Series or 6-Series."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"N/A"},{"Name":"Sound quality","Value":"N/A"}]}]}`,
    timeOfSearch: new Date("2024-06-01 21:58:48.954+00"),
    feedback: -1,
  },
  {
    id: 2,
    search: "test2",
    generatedTopics: "Netflix,  Hulu,  Amazon Prime Video,  Discovery+,  ESPN+",
    selectedTopics: "Netflix,  Hulu",
    generatedCategories:
      "Description, Supported Devices, Family Plan, Ad-Free Experience",
    selectedCategories: "Description, Ad-Free Experience",
    addedCategories: "Region lock, Price",
    searchResults: `{"categories":["Description","Screen size","Smart TV capabilities","Sound quality"],"results":[{"Name":"LG","Description":"Known for excellent color accuracy and superior image quality.","Categories":[{"Name":"Description","Value":"Excellent color accuracy and superior image quality."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"Google TV built-in, making it easy to use and access various streaming services."},{"Name":"Sound quality","Value":"N/A"}]},{"Name":"Samsung","Description":"Known for their QLED TVs that are extremely bright, making them a great fit for group watching in rooms with ambient light or glare.","Categories":[{"Name":"Description","Value":"QLED TVs that are extremely bright, great for group watching in rooms with ambient light or glare."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"N/A"},{"Name":"Sound quality","Value":"N/A"}]},{"Name":"Sony","Description":"Known for amazing picture quality and color accuracy, with decades of experience creating imaging equipment for professional cinematographers and videographers.","Categories":[{"Name":"Description","Value":"Amazing picture quality and color accuracy, with decades of experience in imaging equipment."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"Google TV built-in, making it easy to use and access various streaming services."},{"Name":"Sound quality","Value":"Excellent built-in audio, especially in their top-end smart TVs."}]},{"Name":"TCL","Description":"A great budget TV brand if you can get their 5-Series or 6-Series.","Categories":[{"Name":"Description","Value":"A great budget TV brand if you can get their 5-Series or 6-Series."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"N/A"},{"Name":"Sound quality","Value":"N/A"}]}]}`,
    timeOfSearch: new Date("2024-06-13 17:37:22.269+00"),
    feedback: 0,
  },
  {
    id: 3,
    search: "test3",
    generatedTopics: "Netflix,  Hulu,  Amazon Prime Video,  Discovery+,  ESPN+",
    selectedTopics: "Netflix,  Hulu",
    generatedCategories:
      "Description, Supported Devices, Family Plan, Ad-Free Experience",
    selectedCategories: "Description, Ad-Free Experience",
    addedCategories: "Region lock, Price",
    searchResults: `{"categories":["Description","Screen size","Smart TV capabilities","Sound quality"],"results":[{"Name":"LG","Description":"Known for excellent color accuracy and superior image quality.","Categories":[{"Name":"Description","Value":"Excellent color accuracy and superior image quality."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"Google TV built-in, making it easy to use and access various streaming services."},{"Name":"Sound quality","Value":"N/A"}]},{"Name":"Samsung","Description":"Known for their QLED TVs that are extremely bright, making them a great fit for group watching in rooms with ambient light or glare.","Categories":[{"Name":"Description","Value":"QLED TVs that are extremely bright, great for group watching in rooms with ambient light or glare."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"N/A"},{"Name":"Sound quality","Value":"N/A"}]},{"Name":"Sony","Description":"Known for amazing picture quality and color accuracy, with decades of experience creating imaging equipment for professional cinematographers and videographers.","Categories":[{"Name":"Description","Value":"Amazing picture quality and color accuracy, with decades of experience in imaging equipment."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"Google TV built-in, making it easy to use and access various streaming services."},{"Name":"Sound quality","Value":"Excellent built-in audio, especially in their top-end smart TVs."}]},{"Name":"TCL","Description":"A great budget TV brand if you can get their 5-Series or 6-Series.","Categories":[{"Name":"Description","Value":"A great budget TV brand if you can get their 5-Series or 6-Series."},{"Name":"Screen size","Value":"N/A"},{"Name":"Smart TV capabilities","Value":"N/A"},{"Name":"Sound quality","Value":"N/A"}]}]}`,
    timeOfSearch: new Date("2024-06-04 21:32:05.076+00"),
    feedback: 1,
  },
]
