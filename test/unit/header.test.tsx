import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TestApplication } from "../mocks/app";

describe("В шапке отображаются ссылки на страницы магазина", () => {
  it("Название магазина является ссылкой на главную", async () => {
    const app = <TestApplication />

    const { getByRole } = render(app);
    const element = getByRole("link", { name: "Kogtetochka store" });

    expect(element).toHaveAttribute("href", "/")
  });

  it("Каталог", async () => {
    const app = <TestApplication />

    const { getByRole } = render(app);
    const element = getByRole("link", { name: "Catalog" });

    expect(element).toHaveAttribute("href", "/catalog")
  });

  it("Условия доставки", async () => {
    const app = <TestApplication />

    const { getByRole } = render(app);
    const element = getByRole("link", { name: "Delivery" });

    expect(element).toHaveAttribute("href", "/delivery")
  });

  it("Контакты", async () => {
    const app = <TestApplication />

    const { getByRole } = render(app);
    const element = getByRole("link", { name: "Contacts" });

    expect(element).toHaveAttribute("href", "/contacts")
  });

  it("Корзина", async () => {
    const app = <TestApplication />

    const { getByRole } = render(app);
    const element = getByRole("link", { name: "Cart" });

    expect(element).toHaveAttribute("href", "/cart")
  });
});