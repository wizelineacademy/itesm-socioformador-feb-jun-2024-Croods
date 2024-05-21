export type User = {
  id: number;
  name?: string;
};

export type P1_SearchResultProps = {
  content: string;
  index: number;
  isFavorite: boolean;
  // willSearch: (index: number, content: string) => void;
};

export type SimpleHistoryType = {
  id: number;
  search: string | null;
  timestamp: Date | null;
};
