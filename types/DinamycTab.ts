import type { DinamyComponent } from "./DinamyComponent";

export interface DinamycTab {
  label: {
    icon: String;
    name: String;
  };
  content: DinamyComponent[];
}
