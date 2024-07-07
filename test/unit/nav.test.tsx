import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TestApplication } from "../mocks/app";
import userEvent from "@testing-library/user-event"

describe("Навигационное меню \"Гамбургер\"", () => {
  beforeEach(async () => {
    window.innerWidth = 540;
    window.innerHeight = 1050;
    window.dispatchEvent(new Event("resize"));
  });

  it("При ширине меньше 576px навигационное меню должно скрываться за \"Гамбургер\"", async () => {
    const app = <TestApplication />

    const { getByRole } = render(app);
    const button = getByRole("button", { name: "Toggle navigation" });

    expect(button).toHaveStyle({ display: "inline-block" });
  });

  it("Навигационное меню открывается", async () => {
    const app = <TestApplication />
    const user = userEvent.setup()

    const { container, getByRole } = render(app);
    const button = getByRole("button", { name: "Toggle navigation" });
    const navbar = container.querySelector(".navbar-collapse");

    await user.click(button);

    expect(navbar).not.toHaveClass("collapse");
  });

  it("Навигационное меню закрывается при выборе элемента", async () => {
    const app = <TestApplication />
    const user = userEvent.setup()

    const { container, getByRole } = render(app);
    const navbar = container.querySelector(".navbar-collapse");

    const button = getByRole("button", { name: "Toggle navigation" });

    await user.click(button);

    const element = screen.getByRole("link", { name: "Catalog" });
    await user.click(element);

    expect(navbar).toHaveClass("collapse");
  });
});