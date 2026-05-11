// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { expectError, expectAssignable } from "tsd";
import { type DslProps } from "../src/types.js";

expectAssignable<DslProps>({ p: 0 });
expectAssignable<DslProps>({ p: 1 });
expectAssignable<DslProps>({ p: 2 });
expectAssignable<DslProps>({ p: 3 });
expectAssignable<DslProps>({ p: 4 });
expectAssignable<DslProps>({ p: 6 });
expectAssignable<DslProps>({ p: 8 });
expectAssignable<DslProps>({ p: 12 });
expectAssignable<DslProps>({ p: 16 });
expectAssignable<DslProps>({ p: 24 });
expectAssignable<DslProps>({ p: 32 });

expectError<DslProps>({ p: 5 });
expectError<DslProps>({ p: 7 });
expectError<DslProps>({ p: 9 });
expectError<DslProps>({ p: -1 });
expectError<DslProps>({ p: 100 });
expectError<DslProps>({ p: 999 });

expectError<DslProps>({ variant: "invalid" });
expectError<DslProps>({ variant: "Primary" });

expectError<DslProps>({ size: "xl" });
expectError<DslProps>({ size: "xs" });

expectError<DslProps>({ unknownProp: "value" });
expectError<DslProps>({ font: "sans" });

expectAssignable<DslProps>({ align: "start" });
expectAssignable<DslProps>({ align: "center" });
expectAssignable<DslProps>({ align: "end" });
expectAssignable<DslProps>({ align: "stretch" });
expectAssignable<DslProps>({ align: "baseline" });

expectError<DslProps>({ align: "left" });
expectError<DslProps>({ align: "right" });
expectError<DslProps>({ align: "flex-start" });

expectAssignable<DslProps>({ justify: "start" });
expectAssignable<DslProps>({ justify: "center" });
expectAssignable<DslProps>({ justify: "end" });
expectAssignable<DslProps>({ justify: "between" });
expectAssignable<DslProps>({ justify: "around" });
expectAssignable<DslProps>({ justify: "evenly" });

expectError<DslProps>({ justify: "flex-end" });
expectError<DslProps>({ justify: "right" });
expectError<DslProps>({ justify: "space-between" });

expectAssignable<DslProps>({ display: "block" });
expectAssignable<DslProps>({ display: "flex" });
expectAssignable<DslProps>({ display: "grid" });
expectAssignable<DslProps>({ display: "inline" });
expectAssignable<DslProps>({ display: "inline-flex" });
expectAssignable<DslProps>({ display: "inline-grid" });
expectAssignable<DslProps>({ display: "hidden" });

expectError<DslProps>({ display: "none" });
expectError<DslProps>({ display: "table" });
expectError<DslProps>({ display: "contents" });

expectAssignable<DslProps>({ bg: "bg" });
expectAssignable<DslProps>({ bg: "fg" });
expectAssignable<DslProps>({ bg: "muted" });
expectAssignable<DslProps>({ bg: "accent" });
expectAssignable<DslProps>({ bg: "destructive" });
expectAssignable<DslProps>({ bg: "success" });
expectAssignable<DslProps>({ bg: "warning" });

expectError<DslProps>({ bg: "red" });
expectError<DslProps>({ bg: "#fff" });
expectError<DslProps>({ bg: "blue-500" });

expectAssignable<DslProps>({ color: "fg" });
expectAssignable<DslProps>({ color: "muted" });
expectAssignable<DslProps>({ color: "accent" });

expectError<DslProps>({ color: "red" });
expectError<DslProps>({ color: "#000" });
expectError<DslProps>({ color: "text-gray-500" });

expectAssignable<DslProps>({
  p: 4, m: 2, gap: 8,
  bg: "accent", color: "fg",
  variant: "primary", size: "md",
  display: "flex", align: "center", justify: "between",
});
