// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { createElement, type ElementType } from "react";
import { dslSchema } from "./schema.js";
import { resolveClasses } from "./resolve.js";
import { extractDataClass } from "./dataClass.js";
import { type DslProps, type DslComponent } from "./types.js";

const DSL_KEYS = new Set<string>(Object.keys(dslSchema.shape));

function partitionProps(
  props: DslProps & Record<string, unknown>
): { dslProps: DslProps; remainingProps: Record<string, unknown> } {
  const dslProps: Record<string, unknown> = {};
  const remainingProps: Record<string, unknown> = {};

  for (const key of Object.keys(props)) {
    if (DSL_KEYS.has(key)) {
      dslProps[key] = props[key];
    } else {
      remainingProps[key] = props[key];
    }
  }

  return { dslProps: dslProps as DslProps, remainingProps };
}

export function dsl<E extends ElementType>(component: E): DslComponent<E> {
  const wrapped = (props: DslProps & Record<string, unknown>) => {
    const { dslProps, remainingProps } = partitionProps(props);

    const resolvedClasses = resolveClasses(dslProps);
    const dataClassAttrs  = extractDataClass(dslProps);

    const existingClassName = typeof remainingProps.className === "string"
      ? remainingProps.className
      : undefined;

    const mergedClassName = [
      ...resolvedClasses,
      ...(existingClassName ? [existingClassName] : []),
    ].join(" ") || undefined;

    return createElement(component as ElementType, {
      ...remainingProps,
      ...dataClassAttrs,
      ...(mergedClassName !== undefined ? { className: mergedClassName } : {}),
    });
  };

  return wrapped as unknown as DslComponent<E>;
}
