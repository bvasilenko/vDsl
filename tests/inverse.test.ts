// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { resolveClasses } from "../src/resolve.js";
import { extractDataClass } from "../src/dataClass.js";
import type { DslProps } from "../src/types.js";

function tokenSetFromDataClass(attrs: Record<string, string>): string[] {
  return (attrs["data-class"] ?? "").split(" ").filter(Boolean).sort();
}

describe("extractDataClass — structural contract", () => {
  it("returns an empty object when no DSL props are given", () => {
    expect(extractDataClass({})).toEqual({});
  });

  it("produces exactly one key, 'data-class', when props are present", () => {
    expect(Object.keys(extractDataClass({ p: 2 }))).toEqual(["data-class"]);
  });

  it("data-class value is the resolved classes joined by a single space", () => {
    const props: DslProps = { p: 2, m: 4 };
    expect(extractDataClass(props)["data-class"]).toBe(resolveClasses(props).join(" "));
  });

  it("data-class is lexically sorted (same order as resolveClasses)", () => {
    const props: DslProps = { p: 4, gap: 2, mt: 8 };
    const classes  = resolveClasses(props);
    const fromAttr = extractDataClass(props)["data-class"]?.split(" ") ?? [];
    expect(fromAttr).toEqual(classes);
  });
});

describe("extractDataClass — token set equivalence with resolveClasses", () => {
  const MULTI_CATEGORY_CASES: DslProps[] = [
    { p: 2, m: 4 },
    { p: 2, pt: 1, pb: 4, gap: 8 },
    { p: 4, bg: "accent", variant: "primary", size: "md" },
    { display: "flex", align: "center", justify: "between" },
    {
      p: 2, m: 4, gap: 8,
      bg: "muted", color: "fg",
      variant: "ghost", size: "sm",
      display: "flex", align: "start", justify: "end",
    },
  ];

  for (const props of MULTI_CATEGORY_CASES) {
    const label = Object.keys(props).join(", ");
    it(`token set matches for { ${label} }`, () => {
      const classes  = resolveClasses(props);
      const fromAttr = tokenSetFromDataClass(extractDataClass(props));
      expect(fromAttr).toEqual([...classes].sort());
    });
  }

  const SINGLE_CATEGORY_CASES: DslProps[] = [
    { bg: "accent" },
    { color: "fg" },
    { variant: "primary" },
    { size: "md" },
    { display: "flex" },
    { align: "center" },
    { justify: "between" },
  ];

  for (const props of SINGLE_CATEGORY_CASES) {
    const label = Object.entries(props).map(([k, v]) => `${k}: "${v}"`).join(", ");
    it(`token set matches for single-category { ${label} }`, () => {
      const classes  = resolveClasses(props);
      const fromAttr = tokenSetFromDataClass(extractDataClass(props));
      expect(fromAttr).toEqual([...classes].sort());
    });
  }
});
