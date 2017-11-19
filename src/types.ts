import { type z } from "zod";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";
import { type dslSchema } from "./schema.js";
import { type SpaceToken } from "./tokens/space.js";
import { type ColorToken } from "./tokens/color.js";
import { type VariantToken } from "./tokens/variant.js";
import { type SizeToken } from "./tokens/size.js";
import { type DisplayToken } from "./tokens/display.js";
import { type AlignToken, type JustifyToken } from "./tokens/flex.js";

export type DslProps = z.infer<typeof dslSchema>;

export type DslPropToken =
  | SpaceToken
  | ColorToken
  | VariantToken
  | SizeToken
  | DisplayToken
  | AlignToken
  | JustifyToken;

export type DslComponent<E extends ElementType> = (
  props: DslProps & Omit<ComponentPropsWithoutRef<E>, keyof DslProps>
) => React.ReactElement | null;
