import type { DinamyComponent } from "./DinamyComponent";

export interface Entry {
  id: String;
  banner: String;
  title: String;
  created_at: Date;
  resume?: String;
  content: DinamyComponent[];
}
