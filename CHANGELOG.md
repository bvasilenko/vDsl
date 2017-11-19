# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/bvasilenko/vDsl/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/bvasilenko/vDsl/releases/tag/v0.1.0
