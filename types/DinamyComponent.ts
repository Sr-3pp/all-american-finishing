import type { DinamyColumn } from "./DinamyColumn";
import type { DinamycTab } from "./DinamycTab";

export interface DinamyComponent {
  component: String;
  props: {
    css?: {
      class: String;
      style: String;
    };
    background?: {
      content: DinamyComponent[];
    };
    name?: String;
    text?: String | Number;
    content?: DinamyComponent[];
    tabs?: DinamycTab[];
    columns?: DinamyColumn[];
  };
}
