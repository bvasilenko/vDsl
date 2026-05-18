// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import * as publicApi from "../src/index.js";
import { dslSchema } from "../src/schema.js";

const VALUE_EXPORTS = [
  "dsl",
  "resolveClasses",
  "extractDataClass",
  "dslSafelist",
  "dslSchema",
  "SpaceTokenSchema",
  "ColorTokenSchema",
  "VariantTokenSchema",
  "SizeTokenSchema",
  "DisplayTokenSchema",
  "AlignTokenSchema",
  "JustifyTokenSchema",
  "FlexTokenSchema",
] as const;

const SCHEMA_EXPORTS = [
  "dslSchema",
  "SpaceTokenSchema",
  "ColorTokenSchema",
  "VariantTokenSchema",
  "SizeTokenSchema",
  "DisplayTokenSchema",
  "AlignTokenSchema",
  "JustifyTokenSchema",
  "FlexTokenSchema",
] as const;

const DSL_PROP_KEYS = Object.keys(dslSchema.shape);

describe("public API barrel — value export surface", () => {
  const api = publicApi as Record<string, unknown>;

  for (const name of VALUE_EXPORTS) {
    it(`"${name}" is exported and defined`, () => {
      expect(api[name]).toBeDefined();
    });
  }

  it("no DSL prop key is exported as a standalone module value", () => {
    for (const key of DSL_PROP_KEYS) {
      expect(key in api).toBe(false);
    }
  });

  it("does not export HTML attribute names or React reserved props", () => {
    for (const name of ["className", "style", "children", "key", "ref"]) {
      expect(name in api).toBe(false);
    }
  });
});

describe("public API barrel — Zod schema instances are parseable", () => {
  const api = publicApi as unknown as Record<string, { safeParse: (v: unknown) => { success: boolean } }>;

  for (const name of SCHEMA_EXPORTS) {
    it(`"${name}" has a safeParse method (is a Zod schema instance)`, () => {
      expect(typeof api[name]?.safeParse).toBe("function");
    });
  }
});
