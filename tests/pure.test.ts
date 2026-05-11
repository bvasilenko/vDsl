// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { resolveClasses } from "../src/resolve.js";
import { extractDataClass } from "../src/dataClass.js";

describe("resolveClasses — referential purity", () => {
  it("produces equal output for equal input on successive calls", () => {
    const props = { p: 2, m: 4 } as const;
    expect(resolveClasses(props)).toEqual(resolveClasses(props));
  });

  it("produces a new array instance on every call", () => {
    const props = { p: 2 } as const;
    expect(resolveClasses(props)).not.toBe(resolveClasses(props));
  });

  it("does not read any state written by a prior call", () => {
    const first = resolveClasses({ p: 2 });
    first.push("injected");
    expect(resolveClasses({ p: 2 })).toEqual(["p-2"]);
  });

  it("does not modify the input object", () => {
    const props = Object.freeze({ p: 2 } as const);
    expect(() => resolveClasses(props)).not.toThrow();
  });

  it("returns an empty array when props is an empty object", () => {
    expect(resolveClasses({})).toEqual([]);
  });

  it("treats props with all-undefined values identically to empty props", () => {
    expect(resolveClasses({ p: undefined })).toEqual([]);
  });
});

describe("extractDataClass — referential purity", () => {
  it("produces equal output for equal input on successive calls", () => {
    const props = { p: 2, m: 4 } as const;
    expect(extractDataClass(props)).toEqual(extractDataClass(props));
  });

  it("produces a new object instance on every call", () => {
    const props = { p: 2 } as const;
    expect(extractDataClass(props)).not.toBe(extractDataClass(props));
  });

  it("does not modify the input object", () => {
    const props = Object.freeze({ p: 2, bg: "accent" } as const);
    expect(() => extractDataClass(props)).not.toThrow();
  });

  it("treats props with all-undefined values identically to empty props", () => {
    expect(extractDataClass({ p: undefined })).toEqual({});
  });
});
