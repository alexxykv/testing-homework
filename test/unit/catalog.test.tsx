import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TestApplication } from "../mocks/app";
import { createStore } from "redux";
import { fakeCart, fakeProducts } from "../mocks/store";

describe("Страница каталога", () => {
  const initState = { cart: fakeCart, products: fakeProducts };
  const mockStore = createStore(() => initState);

  it("В каталоге должны отображаться товары, список которых приходит с сервера", async () => {
    const app = <TestApplication path="/catalog" store={mockStore} />

    const { container } = render(app);

    fakeProducts.forEach(product => {
      const elements = container.querySelectorAll(`.ProductItem[data-testid="${product.id}"]`);

      expect(elements).toHaveLength(1);
      expect(elements[0]).toBeInTheDocument();
    });
  });

  it("Для каждого товара в каталоге отображаются: название, цена, ссылка на страницу товара", () => {
    const app = <TestApplication path="/catalog" store={mockStore} />

    const { container } = render(app);

    fakeProducts.forEach(product => {
      const element = container.querySelector(`.ProductItem[data-testid="${product.id}"]`);
      if (element) {
        const name = element.querySelectorAll('.ProductItem-Name');
        const price = element.querySelectorAll('.ProductItem-Price');
        const details = element.querySelectorAll('.ProductItem-DetailsLink');

        expect(name).toHaveLength(1);
        expect(price).toHaveLength(1);
        expect(details).toHaveLength(1);

        expect(name[0]).toBeInTheDocument();
        expect(price[0]).toBeInTheDocument();
        expect(details[0]).toBeInTheDocument();

        expect(name[0].textContent).toEqual(product.name);
        expect(price[0].textContent).toEqual(`$${product.price}`);
        expect(details[0]).toHaveAttribute('href', `/catalog/${product.id}`);
      }
    });
  });

  it("Если товар добавлен в корзину, в каталоге должно отображаться сообщение об этом", async () => {
    const app = <TestApplication path="/catalog" store={mockStore} />

    const { container } = render(app);

    Object.entries(fakeCart).forEach(([id, cartItem]) => {
      const element = container.querySelector(`.ProductItem[data-testid="${id}"]`);
      if (element) {
        const badge = element.querySelectorAll(".CartBadge.text-success");

        expect(badge).toHaveLength(1);
        expect(badge[0]).toBeInTheDocument();
        expect(badge[0].textContent).toEqual("Item in cart");
      }
    });
  });
});