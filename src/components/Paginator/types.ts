export type Props = {
  nextPage: string | null;
  previousPage: string | null;
  onChangePageHandler: (url: string) => void;
};
