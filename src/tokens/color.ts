// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko

export const COLOR_VALUES = [
  "bg", "fg", "muted", "accent", "destructive", "success", "warning",
] as const;

export type ColorToken = (typeof COLOR_VALUES)[number];

export const COLOR_PROPS = ["bg", "color"] as const;

export type ColorProp = (typeof COLOR_PROPS)[number];

export const colorClassMap: Record<ColorProp, (value: ColorToken) => string> = {
  bg:    (v) => `bg-[var(--v-color-${v})]`,
  color: (v) => `text-[var(--v-color-${v})]`,
};
