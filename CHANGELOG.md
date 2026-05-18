# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2026-05-18

### Removed

- `@booga/vtheme` dependency. vDsl emits Tailwind class-name strings; it never
  imports vTheme. The dependency was dead weight, and its stale `^0.1.0` range
  (vTheme is at 0.2.2) misrepresented the contract. vTheme is the consumer's
  Tailwind preset, not vDsl's runtime dependency.

## [0.2.0] - 2026-05-18

### Fixed

- Color tokens (`color` / `bg` props) emitted arbitrary-value classes —
  `text-[var(--v-color-muted)]` — that never produced a color. vTheme stores
  each role as bare OKLCH channels (`95% 0.008 240`), so `color: var(--v-color-*)`
  is an invalid value the browser discards; every `color="muted"` rendered as the
  inherited default (black) instead of muted grey. Color tokens now resolve to
  vTheme's semantic role utilities (`text-muted-foreground`, `bg-accent`, …),
  which wrap those channels in `oklch(… / <alpha>)`. `color` and `bg` map
  separately: `color="muted"` → muted text role, `bg="muted"` → muted surface.

### Added

- `dslSafelist` — exhaustive array of every Tailwind utility class `dsl()` can
  emit at runtime (spacing, display, flex alignment). `dsl()` builds class names
  with template literals (`gap-${v}`), which Tailwind's static content scanner
  cannot detect. Any package that precompiles a stylesheet for DSL-authored
  components must feed this array into its Tailwind config `safelist`, or the
  generated CSS silently omits most of the spacing scale. Derived from the same
  token maps `resolveClasses` uses, so it cannot drift.

## [0.1.0] - 2026-05-11

### Added

- `dsl()` — HOC wrapping any React component to accept DSL props; resolves to `className` + `data-class` attribute
- `resolveClasses` — pure function: DSL props → lexically sorted Tailwind class array
- `extractDataClass` — DSL props → `{ "data-class": "..." }` for SSG semantic emit
- `dslSchema` — Zod strict schema validating all DSL props; rejects unknown keys at runtime
- `DslProps` — TypeScript type for the full DSL prop union
- `DslPropToken` — discriminated union of all allowed token values
- Space tokens: `0|1|2|3|4|6|8|12|16|24|32` across `p m pt pr pb pl px py mt mr mb ml mx my gap`
- Color tokens: `bg fg muted accent destructive success warning` via CSS variables
- Variant tokens: `default primary secondary destructive ghost outline link`
- Size tokens: `sm md lg icon`
- Display tokens: `block flex grid inline inline-flex inline-grid hidden`
- Flex tokens: `align` (`start center end stretch baseline`), `justify` (`start center end between around evenly`)

[Unreleased]: https://github.com/bvasilenko/vDsl/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/bvasilenko/vDsl/releases/tag/v0.2.1
[0.2.0]: https://github.com/bvasilenko/vDsl/releases/tag/v0.2.0
[0.1.0]: https://github.com/bvasilenko/vDsl/releases/tag/v0.1.0
