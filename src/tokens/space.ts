
export const SPACE_VALUES = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32] as const;

export type SpaceToken = (typeof SPACE_VALUES)[number];

export const SPACE_PROPS = [
  "p", "m",
  "pt", "pr", "pb", "pl", "px", "py",
  "mt", "mr", "mb", "ml", "mx", "my",
  "gap",
] as const;

export type SpaceProp = (typeof SPACE_PROPS)[number];

export const spaceClassMap: Record<SpaceProp, (value: SpaceToken) => string> = {
  p:   (v) => `p-${v}`,
  m:   (v) => `m-${v}`,
  pt:  (v) => `pt-${v}`,
  pr:  (v) => `pr-${v}`,
  pb:  (v) => `pb-${v}`,
  pl:  (v) => `pl-${v}`,
  px:  (v) => `px-${v}`,
  py:  (v) => `py-${v}`,
  mt:  (v) => `mt-${v}`,
  mr:  (v) => `mr-${v}`,
  mb:  (v) => `mb-${v}`,
  ml:  (v) => `ml-${v}`,
  mx:  (v) => `mx-${v}`,
  my:  (v) => `my-${v}`,
  gap: (v) => `gap-${v}`,
};
