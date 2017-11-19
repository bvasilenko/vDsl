
export const VARIANT_VALUES = [
  "default", "primary", "secondary", "destructive", "ghost", "outline", "link",
] as const;

export type VariantToken = (typeof VARIANT_VALUES)[number];

export const variantClassMap: Record<VariantToken, string> = {
  default:     "variant-default",
  primary:     "variant-primary",
  secondary:   "variant-secondary",
  destructive: "variant-destructive",
  ghost:       "variant-ghost",
  outline:     "variant-outline",
  link:        "variant-link",
};
