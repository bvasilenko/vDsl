// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { dslSafelist } from "../src/safelist.js";
import { resolveClasses } from "../src/resolve.js";
import { SPACE_PROPS, SPACE_VALUES } from "../src/tokens/space.js";
import { DISPLAY_VALUES } from "../src/tokens/display.js";
import { ALIGN_VALUES, JUSTIFY_VALUES } from "../src/tokens/flex.js";

const safe = new Set(dslSafelist);

describe("dslSafelist covers every spacing class dsl() can emit", () => {
  for (const prop of SPACE_PROPS) {
    for (const value of SPACE_VALUES) {
      it(`${prop}={${value}}`, () => {
        const [cls] = resolveClasses({ [prop]: value });
        expect(safe.has(cls)).toBe(true);
      });
    }
  }
});

describe("dslSafelist covers every display/align/justify class", () => {
  for (const value of DISPLAY_VALUES) {
    it(`display="${value}"`, () => {
      expect(resolveClasses({ display: value }).every((c) => safe.has(c))).toBe(true);
    });
  }
  for (const value of ALIGN_VALUES) {
    it(`align="${value}"`, () => {
      expect(resolveClasses({ align: value }).every((c) => safe.has(c))).toBe(true);
    });
  }
  for (const value of JUSTIFY_VALUES) {
    it(`justify="${value}"`, () => {
      expect(resolveClasses({ justify: value }).every((c) => safe.has(c))).toBe(true);
    });
  }
});

describe("dslSafelist has no duplicates", () => {
  it("is a set", () => {
    expect(dslSafelist.length).toBe(safe.size);
  });
});
