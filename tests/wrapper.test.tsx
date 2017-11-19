import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { dsl } from "../src/dsl.js";
import { resolveClasses } from "../src/resolve.js";
import { dslSchema } from "../src/schema.js";

type PlainDivProps = React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode };
const Div = (props: PlainDivProps) => <div {...props} />;

type PlainButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode };
const Button = (props: PlainButtonProps) => <button {...props} />;

const DslDiv    = dsl(Div);
const DslButton = dsl(Button);

const ALL_DSL_KEYS = Object.keys(dslSchema.shape);

describe("dsl() HOC — className composition", () => {
  it("attaches resolved DSL classes to className", () => {
    render(<DslButton p={2}>x</DslButton>);
    expect(screen.getByRole("button").className).toContain("p-2");
  });

  it("data-class attribute matches resolveClasses output", () => {
    const props = { p: 2, m: 4 } as const;
    render(<DslButton {...props}>x</DslButton>);
    const expected = resolveClasses(props).join(" ");
    expect(screen.getByRole("button")).toHaveAttribute("data-class", expected);
  });

  it("merges DSL classes before existing className prop (DSL classes first)", () => {
    render(<DslButton p={2} className="custom">x</DslButton>);
    const { className } = screen.getByRole("button");
    expect(className).toContain("p-2");
    expect(className).toContain("custom");
    expect(className.indexOf("p-2")).toBeLessThan(className.indexOf("custom"));
  });

  it("does not produce a leading or trailing space when no user className is given", () => {
    render(<DslButton p={2}>x</DslButton>);
    const { className } = screen.getByRole("button");
    expect(className).not.toMatch(/^\s|\s$/);
  });

  it("does not set className when no DSL props and no user className", () => {
    render(<DslButton>x</DslButton>);
    expect(screen.getByRole("button").className).toBe("");
  });

  it("resolves all space props to className", () => {
    render(<DslDiv p={2} m={4} gap={8}>x</DslDiv>);
    const { className } = screen.getByText("x");
    expect(className).toContain("p-2");
    expect(className).toContain("m-4");
    expect(className).toContain("gap-8");
  });

  it("resolves color, variant, size, display, align, justify to className", () => {
    render(
      <DslDiv bg="accent" color="fg" variant="primary" size="md" display="flex" align="center" justify="between">
        x
      </DslDiv>
    );
    const { className } = screen.getByText("x");
    expect(className).toContain("bg-[var(--v-color-accent)]");
    expect(className).toContain("text-[var(--v-color-fg)]");
    expect(className).toContain("variant-primary");
    expect(className).toContain("size-md");
    expect(className).toContain("flex");
    expect(className).toContain("items-center");
    expect(className).toContain("justify-between");
  });
});

describe("dsl() HOC — data-class attribute", () => {
  it("omits data-class when no DSL props are provided", () => {
    render(<DslButton>x</DslButton>);
    expect(screen.getByRole("button")).not.toHaveAttribute("data-class");
  });

  it("data-class is lexically sorted", () => {
    render(<DslButton p={4} m={2}>x</DslButton>);
    const value = screen.getByRole("button").getAttribute("data-class") ?? "";
    const parts = value.split(" ");
    expect(parts).toEqual([...parts].sort((a, b) => a.localeCompare(b)));
  });

  it("data-class contains all resolved token classes", () => {
    const props = { p: 2, bg: "accent", variant: "primary" } as const;
    render(<DslButton {...props}>x</DslButton>);
    const value = screen.getByRole("button").getAttribute("data-class") ?? "";
    const expected = resolveClasses(props);
    for (const cls of expected) {
      expect(value).toContain(cls);
    }
  });
});

describe("dsl() HOC — prop forwarding and DOM hygiene", () => {
  it("forwards non-DSL HTML attributes to the underlying element", () => {
    render(<DslButton p={2} aria-label="close" data-testid="btn">x</DslButton>);
    const el = screen.getByTestId("btn");
    expect(el).toHaveAttribute("aria-label", "close");
  });

  it("forwards children correctly", () => {
    render(<DslDiv p={2}>hello</DslDiv>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("no DSL prop key reaches the DOM as an attribute", () => {
    render(<DslButton p={2} m={4} bg="accent" variant="primary" size="md" display="flex" align="center" justify="between">x</DslButton>);
    const el = screen.getByRole("button");
    for (const key of ALL_DSL_KEYS) {
      expect(el).not.toHaveAttribute(key);
    }
  });

  it("dsl() wrapping is stable across re-renders (not re-created on each render)", () => {
    const { rerender } = render(<DslButton p={2}>x</DslButton>);
    rerender(<DslButton p={4}>x</DslButton>);
    expect(screen.getByRole("button").className).toContain("p-4");
    expect(screen.getByRole("button").className).not.toContain("p-2");
  });
});
