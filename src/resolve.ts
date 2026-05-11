// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type DslProps } from "./types.js";
import { spaceClassMap, type SpaceProp } from "./tokens/space.js";
import { colorClassMap, type ColorProp } from "./tokens/color.js";
import { variantClassMap } from "./tokens/variant.js";
import { sizeClassMap } from "./tokens/size.js";
import { displayClassMap } from "./tokens/display.js";
import { alignClassMap, justifyClassMap } from "./tokens/flex.js";

function resolveSpaceClasses(props: DslProps): string[] {
  return (Object.keys(spaceClassMap) as SpaceProp[]).flatMap((prop) => {
    const value = props[prop];
    return value !== undefined ? [spaceClassMap[prop](value)] : [];
  });
}

function resolveColorClasses(props: DslProps): string[] {
  return (Object.keys(colorClassMap) as ColorProp[]).flatMap((prop) => {
    const value = props[prop];
    return value !== undefined ? [colorClassMap[prop](value)] : [];
  });
}

export function resolveClasses(props: DslProps): string[] {
  const classes: string[] = [
    ...resolveSpaceClasses(props),
    ...resolveColorClasses(props),
    ...(props.variant !== undefined ? [variantClassMap[props.variant]] : []),
    ...(props.size    !== undefined ? [sizeClassMap[props.size]]       : []),
    ...(props.display !== undefined ? [displayClassMap[props.display]] : []),
    ...(props.align   !== undefined ? [alignClassMap[props.align]]     : []),
    ...(props.justify !== undefined ? [justifyClassMap[props.justify]] : []),
  ];

  return classes.sort((a, b) => a.localeCompare(b));
}
