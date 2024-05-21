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
};
