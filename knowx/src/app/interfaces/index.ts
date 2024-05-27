export type User = {
  id: number;
  name?: string;
};

export type P1_SearchResultProps = {
  content: string;
  index: number;
  isFavorite: boolean;
};

export type SimpleHistoryType = {
  id: number;
  search: string | null;
  timestamp: Date | null;
  feedback: number | null;
};

export type FullHistoryType = {
  id: number;
  search: string | null;
  generatedTopics: string | null;
  selectedTopics: string | null;
  generatedCategories: string | null;
  selectedCategories: string | null;
  addedCategories: string | null;
  searchResults: string | null;
  timeOfSearch: Date | null;
  feedback: number | null;
};
