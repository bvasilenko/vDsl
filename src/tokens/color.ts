// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko

export const COLOR_VALUES = [
  "bg", "fg", "muted", "accent", "destructive", "success", "warning",
] as const;

export type ColorToken = (typeof COLOR_VALUES)[number];

export const COLOR_PROPS = ["bg", "color"] as const;

export type ColorProp = (typeof COLOR_PROPS)[number];

// Color tokens resolve to @booga/vtheme's semantic role utilities, NOT to raw
// `var(--v-color-*)` references. vTheme stores each role as bare OKLCH channels
// (`95% 0.008 240`); a raw `color: var(--v-color-muted)` is an invalid color
// value and the browser discards it, leaving text the inherited default. The
// role utilities below wrap those channels in `oklch(... / <alpha>)`, so they
// are the only correct surface for the DSL to emit.
//
// `color` and `bg` map differently on purpose: a surface role (`muted`) and its
// paired text role (`muted-foreground`) are distinct. `color="muted"` means
// muted *text*; `bg="muted"` means the muted *surface*.
const textRoleMap: Record<ColorToken, string> = {
  bg:          "text-background",
  fg:          "text-foreground",
  muted:       "text-muted-foreground",
  // `accent` and `muted` are light surface roles; their readable text
  // counterpart is the paired `-foreground` role. `destructive/success/warning`
  // are saturated roles that read correctly as text directly.
  accent:      "text-accent-foreground",
  destructive: "text-destructive",
  success:     "text-success",
  warning:     "text-warning",
};

const bgRoleMap: Record<ColorToken, string> = {
  bg:          "bg-background",
  fg:          "bg-foreground",
  muted:       "bg-muted",
  accent:      "bg-accent",
  destructive: "bg-destructive",
  success:     "bg-success",
  warning:     "bg-warning",
};

export const colorClassMap: Record<ColorProp, (value: ColorToken) => string> = {
  bg:    (v) => bgRoleMap[v],
  color: (v) => textRoleMap[v],
};

// Every class `colorClassMap` can emit — consumed by the safelist so precompiled
// stylesheets include role utilities the runtime builds dynamically.
export const COLOR_CLASSES: readonly string[] = [
  ...Object.values(textRoleMap),
  ...Object.values(bgRoleMap),
];
