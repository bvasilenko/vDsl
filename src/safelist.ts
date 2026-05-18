// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
//
// Exhaustive list of every Tailwind utility class the DSL can emit at runtime.
//
// `dsl()` resolves spacing/display/flex props into class strings via template
// literals (e.g. `gap-${v}`). Tailwind's static content scanner cannot see
// runtime-built class names, so any package that precompiles a stylesheet
// (`tailwindcss -c ...`) must feed this array into its config `safelist` — or
// the generated CSS silently omits most of the spacing scale and DSL-authored
// components render with collapsed gaps and padding.
//
// This module is the single source of truth for that class surface: it is
// derived from the same token maps `resolve.ts` uses, so it cannot drift.
import { SPACE_PROPS, SPACE_VALUES, spaceClassMap } from "./tokens/space.js";
import { COLOR_CLASSES } from "./tokens/color.js";
import { displayClassMap } from "./tokens/display.js";
import { alignClassMap, justifyClassMap } from "./tokens/flex.js";

const spacing = SPACE_PROPS.flatMap((prop) =>
  SPACE_VALUES.map((value) => spaceClassMap[prop](value)),
);

const display = Object.values(displayClassMap);
const align   = Object.values(alignClassMap);
const justify = Object.values(justifyClassMap);

/**
 * Every Tailwind utility class `dsl()` can produce from spacing, color, display,
 * and flex alignment props. Pass to a Tailwind config's `safelist` when building
 * a precompiled stylesheet for DSL-authored components.
 *
 * Variant/size tokens are intentionally excluded: they resolve to custom
 * (non-Tailwind) classes a consuming package styles itself.
 */
export const dslSafelist: readonly string[] = [
  ...spacing,
  ...COLOR_CLASSES,
  ...display,
  ...align,
  ...justify,
];
