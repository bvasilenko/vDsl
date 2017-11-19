# vDsl

Prop DSL for typed UI composition. Components accept utility-class props (`p={2} mt={4} variant="primary"`); props compile to Tailwind class strings at render time. Same source emits `data-class` attributes for SSG semantic rewrite. Type-safe at authoring; runtime-validated via Zod; zero runtime overhead beyond a sorted string lookup.

## Install

```sh
npm install @booga/vdsl
```

## Usage

```ts
import { dsl, resolveClasses, extractDataClass, dslSchema } from "@booga/vdsl";

// Wrap any React component
const DslBox = dsl(Box);
<DslBox p={2} m={4} display="flex" align="center" />
// → className="flex items-center m-4 p-2" data-class="flex items-center m-4 p-2"

// Pure class resolution (no React)
resolveClasses({ p: 2, m: 4 }); // ["m-4", "p-2"]

// SSG attribute extraction
extractDataClass({ p: 2 }); // { "data-class": "p-2" }

// Runtime validation
dslSchema.parse({ p: 5 }); // throws — 5 not in SpaceToken union
```

## Space tokens

`0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24 | 32`

Props: `p m pt pr pb pl px py mt mr mb ml mx my gap`

## Color tokens

`bg fg muted accent destructive success warning` (from vTheme color scale, resolved as CSS variables)

## Variant tokens

`default primary secondary destructive ghost outline link`

## Size tokens

`sm md lg icon`

## Display tokens

`block flex grid inline inline-flex inline-grid hidden`

## Flex tokens

`align`: `start center end stretch baseline`  
`justify`: `start center end between around evenly`

## License

MIT © 2026 bvasilenko

For code of conduct, see https://www.contributor-covenant.org/version/2/1/code_of_conduct/
