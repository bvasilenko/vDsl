import { describe, it, expect } from "vitest";
import { resolveClasses } from "../src/resolve.js";
import { SPACE_VALUES, SPACE_PROPS, spaceClassMap } from "../src/tokens/space.js";
import { COLOR_VALUES, COLOR_PROPS, colorClassMap } from "../src/tokens/color.js";
import { VARIANT_VALUES, variantClassMap } from "../src/tokens/variant.js";
import { SIZE_VALUES, sizeClassMap } from "../src/tokens/size.js";
import { DISPLAY_VALUES, displayClassMap } from "../src/tokens/display.js";
import { ALIGN_VALUES, alignClassMap, JUSTIFY_VALUES, justifyClassMap } from "../src/tokens/flex.js";
import type { DslProps } from "../src/types.js";
import type { SpaceToken } from "../src/tokens/space.js";
import type { ColorToken } from "../src/tokens/color.js";

describe("token class mapping — completeness and format", () => {
  describe("space tokens", () => {
    for (const prop of SPACE_PROPS) {
      describe(`prop "${prop}"`, () => {
        for (const value of SPACE_VALUES) {
          it(`value ${value} → exactly "${spaceClassMap[prop](value)}"`, () => {
            const props: DslProps = { [prop]: value as SpaceToken };
            expect(resolveClasses(props)).toEqual([spaceClassMap[prop](value)]);
          });
        }
      });
    }
  });

  describe("color tokens", () => {
    for (const prop of COLOR_PROPS) {
      describe(`prop "${prop}"`, () => {
        for (const value of COLOR_VALUES) {
          it(`value "${value}" → exactly "${colorClassMap[prop](value)}"`, () => {
            const props: DslProps = { [prop]: value as ColorToken };
            expect(resolveClasses(props)).toEqual([colorClassMap[prop](value)]);
          });
        }
      });
    }
  });

  describe("variant tokens", () => {
    for (const value of VARIANT_VALUES) {
      it(`value "${value}" → exactly "${variantClassMap[value]}"`, () => {
        expect(resolveClasses({ variant: value })).toEqual([variantClassMap[value]]);
      });
    }
  });

  describe("size tokens", () => {
    for (const value of SIZE_VALUES) {
      it(`value "${value}" → exactly "${sizeClassMap[value]}"`, () => {
        expect(resolveClasses({ size: value })).toEqual([sizeClassMap[value]]);
      });
    }
  });

  describe("display tokens", () => {
    for (const value of DISPLAY_VALUES) {
      it(`value "${value}" → exactly "${displayClassMap[value]}"`, () => {
        expect(resolveClasses({ display: value })).toEqual([displayClassMap[value]]);
      });
    }
  });

  describe("align tokens", () => {
    for (const value of ALIGN_VALUES) {
      it(`value "${value}" → exactly "${alignClassMap[value]}"`, () => {
        expect(resolveClasses({ align: value })).toEqual([alignClassMap[value]]);
      });
    }
  });

  describe("justify tokens", () => {
    for (const value of JUSTIFY_VALUES) {
      it(`value "${value}" → exactly "${justifyClassMap[value]}"`, () => {
        expect(resolveClasses({ justify: value })).toEqual([justifyClassMap[value]]);
      });
    }
  });
});
