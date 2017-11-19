import { describe, it, expect } from "vitest";
import { resolveClasses } from "../src/resolve.js";
import { SPACE_PROPS, SPACE_VALUES } from "../src/tokens/space.js";
import type { DslProps } from "../src/types.js";
import type { SpaceToken } from "../src/tokens/space.js";

function isSortedLexically(arr: string[]): boolean {
  return arr.every((v, i) => i === 0 || arr[i - 1]!.localeCompare(v) <= 0);
}

describe("resolveClasses — lexical sort invariant", () => {
  it("spec contract: { p: 2, m: 4 } → [\"m-4\", \"p-2\"]", () => {
    expect(resolveClasses({ p: 2, m: 4 })).toEqual(["m-4", "p-2"]);
  });

  it("single prop output is trivially sorted", () => {
    for (const prop of SPACE_PROPS) {
      const result = resolveClasses({ [prop]: 2 } as DslProps);
      expect(isSortedLexically(result)).toBe(true);
    }
  });

  it("output is sorted when props are supplied in any JS object key insertion order", () => {
    const orderedA = resolveClasses({ gap: 4, p: 2, mt: 8, display: "flex" });
    const orderedB = resolveClasses({ display: "flex", mt: 8, p: 2, gap: 4 });
    expect(orderedA).toEqual(orderedB);
    expect(isSortedLexically(orderedA)).toBe(true);
  });

  it("output is sorted across all space props simultaneously", () => {
    const allSpace: DslProps = Object.fromEntries(
      SPACE_PROPS.map((p, i) => [p, SPACE_VALUES[i % SPACE_VALUES.length] as SpaceToken])
    );
    const result = resolveClasses(allSpace);
    expect(isSortedLexically(result)).toBe(true);
  });

  it("output is sorted across all token categories simultaneously", () => {
    const result = resolveClasses({
      p: 4, m: 2, gap: 8,
      bg: "accent", color: "fg",
      variant: "primary", size: "md",
      display: "flex", align: "center", justify: "between",
    });
    expect(isSortedLexically(result)).toBe(true);
  });

  it("same-prefix classes (pt-, pb-, px-, py-) appear in lexical order", () => {
    const result = resolveClasses({ pt: 2, pb: 4, px: 1, py: 6 });
    expect(isSortedLexically(result)).toBe(true);
  });

  it("classes prefixed with 'p-' sort before 'pb-' (spec: lexical, not semantic)", () => {
    const result = resolveClasses({ p: 1, pb: 2 });
    expect(result[0]).toBe("p-1");
    expect(result[1]).toBe("pb-2");
  });

  it("empty input produces an empty sorted array", () => {
    expect(resolveClasses({})).toEqual([]);
  });

  it("each call with full props produces the same sorted result (determinism)", () => {
    const props: DslProps = { p: 4, m: 2, bg: "muted", variant: "ghost", size: "sm" };
    const results = Array.from({ length: 5 }, () => resolveClasses(props));
    for (const r of results) {
      expect(r).toEqual(results[0]);
    }
  });
});
