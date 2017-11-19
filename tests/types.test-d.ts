import { expectError, expectAssignable } from "tsd";
import { type DslProps } from "../src/types.js";

// Valid space tokens are assignable
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

// Values outside the SpaceToken union are rejected
expectError<DslProps>({ p: 5 });
expectError<DslProps>({ p: 7 });
expectError<DslProps>({ p: 9 });
expectError<DslProps>({ p: -1 });
expectError<DslProps>({ p: 100 });
expectError<DslProps>({ p: 999 });

// Invalid variant is rejected
expectError<DslProps>({ variant: "invalid" });
expectError<DslProps>({ variant: "Primary" });

// Invalid size is rejected
expectError<DslProps>({ size: "xl" });
expectError<DslProps>({ size: "xs" });

// Unknown props are rejected
expectError<DslProps>({ unknownProp: "value" });
expectError<DslProps>({ font: "sans" });
