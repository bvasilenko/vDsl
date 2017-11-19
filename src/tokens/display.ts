
export const DISPLAY_VALUES = [
  "block", "flex", "grid", "inline", "inline-flex", "inline-grid", "hidden",
] as const;

export type DisplayToken = (typeof DISPLAY_VALUES)[number];

export const displayClassMap: Record<DisplayToken, string> = {
  block:        "block",
  flex:         "flex",
  grid:         "grid",
  inline:       "inline",
  "inline-flex": "inline-flex",
  "inline-grid": "inline-grid",
  hidden:       "hidden",
};
