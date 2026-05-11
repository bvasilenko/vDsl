// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type DslProps } from "./types.js";
import { spaceClassMap, type SpaceProp, type SpaceToken } from "./tokens/space.js";
import { colorClassMap, type ColorProp, type ColorToken } from "./tokens/color.js";
import { variantClassMap } from "./tokens/variant.js";
import { sizeClassMap } from "./tokens/size.js";
import { displayClassMap } from "./tokens/display.js";
import { alignClassMap, justifyClassMap } from "./tokens/flex.js";

function resolveMultiPropToken<P extends string, T>(
  props: DslProps,
  propList: readonly P[],
  classMap: Record<P, (v: T) => string>,
  getPropValue: (props: DslProps, prop: P) => T | undefined,
): string[] {
  return propList.flatMap((prop) => {
    const value = getPropValue(props, prop);
    return value !== undefined ? [classMap[prop](value)] : [];
  });
}

function resolveSingleProp<T extends string>(
  value: T | undefined,
  classMap: Record<T, string>,
): string[] {
  return value !== undefined ? [classMap[value]] : [];
}

export function resolveClasses(props: DslProps): string[] {
  return [
    ...resolveMultiPropToken<SpaceProp, SpaceToken>(
      props,
      Object.keys(spaceClassMap) as SpaceProp[],
      spaceClassMap,
      (p, k) => p[k],
    ),
    ...resolveMultiPropToken<ColorProp, ColorToken>(
      props,
      Object.keys(colorClassMap) as ColorProp[],
      colorClassMap,
      (p, k) => p[k],
    ),
    ...resolveSingleProp(props.variant, variantClassMap),
    ...resolveSingleProp(props.size,    sizeClassMap),
    ...resolveSingleProp(props.display, displayClassMap),
    ...resolveSingleProp(props.align,   alignClassMap),
    ...resolveSingleProp(props.justify, justifyClassMap),
  ].sort((a, b) => a.localeCompare(b));
}
