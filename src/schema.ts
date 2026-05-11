// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";
import { SPACE_VALUES } from "./tokens/space.js";
import { COLOR_VALUES } from "./tokens/color.js";
import { VARIANT_VALUES } from "./tokens/variant.js";
import { SIZE_VALUES } from "./tokens/size.js";
import { DISPLAY_VALUES } from "./tokens/display.js";
import { ALIGN_VALUES, JUSTIFY_VALUES } from "./tokens/flex.js";

export const SpaceTokenSchema = z.union(
  SPACE_VALUES.map((v) => z.literal(v)) as [
    z.ZodLiteral<0>,
    z.ZodLiteral<1>,
    z.ZodLiteral<2>,
    z.ZodLiteral<3>,
    z.ZodLiteral<4>,
    z.ZodLiteral<6>,
    z.ZodLiteral<8>,
    z.ZodLiteral<12>,
    z.ZodLiteral<16>,
    z.ZodLiteral<24>,
    z.ZodLiteral<32>,
  ]
);

export const ColorTokenSchema   = z.enum(COLOR_VALUES);
export const VariantTokenSchema = z.enum(VARIANT_VALUES);
export const SizeTokenSchema    = z.enum(SIZE_VALUES);
export const DisplayTokenSchema = z.enum(DISPLAY_VALUES);
export const AlignTokenSchema   = z.enum(ALIGN_VALUES);
export const JustifyTokenSchema = z.enum(JUSTIFY_VALUES);
export const FlexTokenSchema    = z.union([AlignTokenSchema, JustifyTokenSchema]);

export const dslSchema = z.object({
  p:       SpaceTokenSchema.optional(),
  m:       SpaceTokenSchema.optional(),
  pt:      SpaceTokenSchema.optional(),
  pr:      SpaceTokenSchema.optional(),
  pb:      SpaceTokenSchema.optional(),
  pl:      SpaceTokenSchema.optional(),
  px:      SpaceTokenSchema.optional(),
  py:      SpaceTokenSchema.optional(),
  mt:      SpaceTokenSchema.optional(),
  mr:      SpaceTokenSchema.optional(),
  mb:      SpaceTokenSchema.optional(),
  ml:      SpaceTokenSchema.optional(),
  mx:      SpaceTokenSchema.optional(),
  my:      SpaceTokenSchema.optional(),
  gap:     SpaceTokenSchema.optional(),
  bg:      ColorTokenSchema.optional(),
  color:   ColorTokenSchema.optional(),
  variant: VariantTokenSchema.optional(),
  size:    SizeTokenSchema.optional(),
  display: DisplayTokenSchema.optional(),
  align:   AlignTokenSchema.optional(),
  justify: JustifyTokenSchema.optional(),
}).strict();
