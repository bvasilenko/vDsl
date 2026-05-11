// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko

export const SIZE_VALUES = ["sm", "md", "lg", "icon"] as const;

export type SizeToken = (typeof SIZE_VALUES)[number];

export const sizeClassMap: Record<SizeToken, string> = {
  sm:   "size-sm",
  md:   "size-md",
  lg:   "size-lg",
  icon: "size-icon",
};
