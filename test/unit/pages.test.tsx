import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TestApplication } from "../mocks/app";

describe("В магазине имеются страницы", () => {
  it("Главная", async () => {
    const app = <TestApplication path="/" />

    const { container } = render(app);
    const element = container.querySelector(".Home");

    expect(element).toBeInTheDocument();
  });

  it("Каталог", async () => {
    const app = <TestApplication path="/catalog" />

    const { container } = render(app);
    const element = container.querySelector(".Catalog");

    expect(element).toBeInTheDocument();
  });

  it("Условия доставки", async () => {
    const app = <TestApplication path="/delivery" />

    const { container } = render(app);
    const element = container.querySelector(".Delivery");

    expect(element).toBeInTheDocument();
  });

  it("Контакты", async () => {
    const app = <TestApplication path="/contacts" />

    const { container } = render(app);
    const element = container.querySelector(".Contacts");

    expect(element).toBeInTheDocument();
  });

  it("Корзина", async () => {
    const app = <TestApplication path="/cart" />

    const { container } = render(app);
    const element = container.querySelector(".Cart");

    expect(element).toBeInTheDocument();
  });
});
