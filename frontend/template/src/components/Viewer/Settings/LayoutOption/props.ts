import { Layout } from "../../../../types/viewer";

export type LayoutOptionProps = {
  title: string;
  layout: Layout;
  selected: boolean;
  onClick: VoidFunction;
};
