import { type DslProps } from "./types.js";
import { resolveClasses } from "./resolve.js";

export function extractDataClass(props: DslProps): Record<string, string> {
  const classes = resolveClasses(props);
  if (classes.length === 0) return {};
  return { "data-class": classes.join(" ") };
}
