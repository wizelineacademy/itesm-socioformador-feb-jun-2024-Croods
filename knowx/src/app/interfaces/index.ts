export type User = {
  id: number;
  name?: string;
};

export type P1_SearchResultProps = {
  content: string;
  index: number;
  willSearch: (index: number, content: string) => void;
};
