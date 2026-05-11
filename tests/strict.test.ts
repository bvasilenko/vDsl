// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { dslSchema } from "../src/schema.js";
import { SPACE_VALUES, SPACE_PROPS } from "../src/tokens/space.js";
import { COLOR_VALUES, COLOR_PROPS } from "../src/tokens/color.js";
import { VARIANT_VALUES } from "../src/tokens/variant.js";
import { SIZE_VALUES } from "../src/tokens/size.js";
import { DISPLAY_VALUES } from "../src/tokens/display.js";
import { ALIGN_VALUES, JUSTIFY_VALUES } from "../src/tokens/flex.js";

const INVALID_VALUES_BY_PROP: Record<string, unknown[]> = {
  p:       [5, 7, 9, 11, -1, 100, 999, "2", null, true, 0.5],
  m:       [5, -1, "4", null],
  pt:      [5, -1, "1"],
  variant: ["invalid", "Primary", "PRIMARY", "btn-primary", 0, null],
  size:    ["xl", "xs", "xxl", "2xl", 0, null],
  bg:      ["red", "#fff", "primary", "accent-light", 0, null],
  color:   ["red", "#fff", "primary", "blue-500", null],
  display: ["table", "contents", "none", "run-in", 0, null],
  align:   ["left", "right", "top", "bottom", "flex-start", null],
  justify: ["left", "right", "middle", "flex-end", "normal", null],
};

describe("dslSchema — acceptance of all valid tokens", () => {
  describe("space props accept every SpaceToken value", () => {
    for (const prop of SPACE_PROPS) {
      for (const value of SPACE_VALUES) {
        it(`{ ${prop}: ${value} } is valid`, () => {
          expect(dslSchema.safeParse({ [prop]: value }).success).toBe(true);
        });
      }
    }
  });

  describe("color props accept every ColorToken value", () => {
    for (const prop of COLOR_PROPS) {
      for (const value of COLOR_VALUES) {
        it(`{ ${prop}: "${value}" } is valid`, () => {
          expect(dslSchema.safeParse({ [prop]: value }).success).toBe(true);
        });
      }
    }
  });

  describe("variant accepts every VariantToken value", () => {
    for (const value of VARIANT_VALUES) {
      it(`{ variant: "${value}" } is valid`, () => {
        expect(dslSchema.safeParse({ variant: value }).success).toBe(true);
      });
    }
  });

  describe("size accepts every SizeToken value", () => {
    for (const value of SIZE_VALUES) {
      it(`{ size: "${value}" } is valid`, () => {
        expect(dslSchema.safeParse({ size: value }).success).toBe(true);
      });
    }
  });

  describe("display accepts every DisplayToken value", () => {
    for (const value of DISPLAY_VALUES) {
      it(`{ display: "${value}" } is valid`, () => {
        expect(dslSchema.safeParse({ display: value }).success).toBe(true);
      });
    }
  });

  describe("align accepts every AlignToken value", () => {
    for (const value of ALIGN_VALUES) {
      it(`{ align: "${value}" } is valid`, () => {
        expect(dslSchema.safeParse({ align: value }).success).toBe(true);
      });
    }
  });

  describe("justify accepts every JustifyToken value", () => {
    for (const value of JUSTIFY_VALUES) {
      it(`{ justify: "${value}" } is valid`, () => {
        expect(dslSchema.safeParse({ justify: value }).success).toBe(true);
      });
    }
  });

  it("accepts an empty object", () => {
    expect(dslSchema.safeParse({}).success).toBe(true);
  });

  it("accepts all props simultaneously when all are valid", () => {
    expect(dslSchema.safeParse({
      p: 2, m: 4, pt: 1, pr: 2, pb: 3, pl: 4, px: 2, py: 4,
      mt: 1, mr: 2, mb: 3, ml: 4, mx: 2, my: 4, gap: 8,
      bg: "accent", color: "fg",
      variant: "primary", size: "md",
      display: "flex", align: "center", justify: "between",
    }).success).toBe(true);
  });
});

describe("dslSchema — rejection of invalid token values", () => {
  for (const [prop, invalids] of Object.entries(INVALID_VALUES_BY_PROP)) {
    describe(`prop "${prop}"`, () => {
      for (const value of invalids) {
        it(`rejects { ${prop}: ${JSON.stringify(value)} }`, () => {
          expect(dslSchema.safeParse({ [prop]: value }).success).toBe(false);
        });
      }
    });
  }
});

describe("dslSchema — strict: unknown props", () => {
  it("rejects an object with only an unknown key", () => {
    expect(dslSchema.safeParse({ unknownProp: "value" }).success).toBe(false);
  });

  it("rejects a mix of valid known props and one unknown key", () => {
    expect(dslSchema.safeParse({ p: 2, foo: "bar" }).success).toBe(false);
  });

  it("rejects a prop named 'font' (not in schema)", () => {
    expect(dslSchema.safeParse({ font: "sans" }).success).toBe(false);
  });

  it("rejects a prop named 'className' (not a DSL prop)", () => {
    expect(dslSchema.safeParse({ className: "p-2" }).success).toBe(false);
  });

  it("rejects a prop named 'style' (not a DSL prop)", () => {
    expect(dslSchema.safeParse({ style: {} }).success).toBe(false);
  });
});
