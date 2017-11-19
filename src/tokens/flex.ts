
export const ALIGN_VALUES = [
  "start", "center", "end", "stretch", "baseline",
] as const;

export const JUSTIFY_VALUES = [
  "start", "center", "end", "between", "around", "evenly",
] as const;

export type AlignToken   = (typeof ALIGN_VALUES)[number];
export type JustifyToken = (typeof JUSTIFY_VALUES)[number];

export const alignClassMap: Record<AlignToken, string> = {
  start:    "items-start",
  center:   "items-center",
  end:      "items-end",
  stretch:  "items-stretch",
  baseline: "items-baseline",
};

export const justifyClassMap: Record<JustifyToken, string> = {
  start:   "justify-start",
  center:  "justify-center",
  end:     "justify-end",
  between: "justify-between",
  around:  "justify-around",
  evenly:  "justify-evenly",
};
