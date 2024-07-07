import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TestApplication } from "../mocks/app";
import { createStore } from "redux";
import { fakeCart, fakeDetails, fakeProducts } from "../mocks/store";

describe("Страница товара", () => {
  const initState = { cart: fakeCart, products: fakeProducts, details: fakeDetails };
  const mockStore = createStore(() => initState);

  it("На странице с подробной информацией отображаются: название, описание, цена, цвет, материал, кнопка \"Добавить в корзину\"", async () => {
    const app = <TestApplication path="/catalog/0" store={mockStore} />

    const { container } = render(app);

    const name = container.querySelectorAll(".ProductDetails-Name");
    const description = container.querySelectorAll(".ProductDetails-Description");
    const price = container.querySelectorAll(".ProductDetails-Price");
    const color = container.querySelectorAll(".ProductDetails-Color");
    const material = container.querySelectorAll(".ProductDetails-Material");
    const addToCart = container.querySelectorAll("button.ProductDetails-AddToCart.btn.btn-primary.btn-lg");

    expect(name).toHaveLength(1);
    expect(description).toHaveLength(1);
    expect(price).toHaveLength(1);
    expect(color).toHaveLength(1);
    expect(material).toHaveLength(1);
    expect(addToCart).toHaveLength(1);

    expect(name[0].textContent).toEqual(fakeDetails[0].name);
    expect(description[0].textContent).toEqual(fakeDetails[0].description);
    expect(price[0].textContent).toEqual(`$${fakeDetails[0].price}`);
    expect(color[0].textContent).toEqual(fakeDetails[0].color);
    expect(material[0].textContent).toEqual(fakeDetails[0].material);
    expect(addToCart[0].textContent).toEqual("Add to Cart");
  });

  it("Если товар уже добавлен в корзину, на странице товара должно отображаться сообщение об этом", async () => {
    const app = <TestApplication path="/catalog/0" store={mockStore} />

    const { container } = render(app);

    const badge = container.querySelectorAll(".CartBadge.text-success");

    expect(badge).toHaveLength(1);
    expect(badge[0].textContent).toEqual("Item in cart");
  });
});