import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TestApplication } from "../mocks/app";
import { fakeCart } from "../mocks/store";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import userEvent from "@testing-library/user-event";

describe("Страница корзины", () => {
  const basename = '/hw/store';
  const api = new ExampleApi(basename);
  const cart = new CartApi();

  it("В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
    cart.setState(fakeCart);
    const store = initStore(api, cart);
    const app = <TestApplication path="/cart" store={store} />

    const { container } = render(app);

    const element = container.querySelectorAll('.Application-Menu .nav-link[href="/cart"]');

    expect(element).toHaveLength(1);
    expect(element[0]).toBeInTheDocument();
    expect(element[0].textContent).toEqual("Cart (2)");
  });

  it("Если корзина пустая, должна отображаться ссылка на каталог товаров", async () => {
    cart.setState({});
    const store = initStore(api, cart);
    const app = <TestApplication path="/cart" store={store} />

    const { container } = render(app);

    const element = container.querySelectorAll('.Cart a[href="/catalog"]');

    expect(element).toHaveLength(1);
    expect(element[0]).toBeInTheDocument();
    expect(element[0].textContent).toEqual("catalog");
  });

  it("Содержимое корзины должно сохраняться между перезагрузками страницы", async () => {
    cart.setState(fakeCart);
    const store = initStore(api, cart);
    const app = <TestApplication path="/cart" store={store} />

    const { container } = render(app);

    const table = container.querySelectorAll(".Cart-Table");

    expect(table).toHaveLength(1);
    expect(table[0]).toBeInTheDocument();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
    window.location.reload();

    expect(window.location.reload).toHaveBeenCalled();
    expect(table[0]).toBeInTheDocument();
  });

  it("В корзине должна отображаться таблица с добавленными в нее товарами", async () => {
    cart.setState(fakeCart);
    const store = initStore(api, cart);
    const app = <TestApplication path="/cart" store={store} />

    const { container } = render(app);

    Object.entries(fakeCart).forEach(([id, _]) => {
      const element = container.querySelectorAll(`.Cart-Table tr[data-testid="${id}"]`);

      expect(element).toHaveLength(1);
      expect(element[0]).toBeInTheDocument();
    });
  });

  it("Для каждого товара должны корректно оторбажаются название, цена, количество, стоимость и общая сумма заказа", async () => {
    cart.setState(fakeCart);
    const store = initStore(api, cart);

    const app = <TestApplication path="/cart" store={store} />

    const { container } = render(app);

    let orderTotal = 0;

    Object.entries(fakeCart).forEach(([id, itemCart]) => {
      orderTotal += itemCart.price * itemCart.count;

      const name = container.querySelectorAll(`.Cart-Table tr[data-testid="${id}"] .Cart-Name`);
      const price = container.querySelectorAll(`.Cart-Table tr[data-testid="${id}"] .Cart-Price`);
      const count = container.querySelectorAll(`.Cart-Table tr[data-testid="${id}"] .Cart-Count`);
      const total = container.querySelectorAll(`.Cart-Table tr[data-testid="${id}"] .Cart-Total`);

      expect(name).toHaveLength(1);
      expect(price).toHaveLength(1);
      expect(count).toHaveLength(1);
      expect(total).toHaveLength(1);

      expect(name[0].textContent).toEqual(itemCart.name);
      expect(price[0].textContent).toEqual(`$${itemCart.price}`);
      expect(count[0].textContent).toEqual(itemCart.count.toString());
      expect(total[0].textContent).toEqual(`$${itemCart.price * itemCart.count}`);
    });

    const orderPrice = container.querySelectorAll('.Cart-Table .Cart-OrderPrice');
    expect(orderPrice).toHaveLength(1);
    expect(orderPrice[0].textContent).toEqual(`$${orderTotal}`);
  });

  it("В корзине должна быть кнопка \"Очистить корзину\", по нажатию которой все товары должны удаляться", async () => {
    cart.setState(fakeCart);
    const store = initStore(api, cart);
    const app = <TestApplication path="/cart" store={store} />

    const { container } = render(app);

    const productElements: Element[] = [];

    Object.entries(fakeCart).forEach(([id, _]) => {
      const element = container.querySelectorAll(`.Cart-Table tr[data-testid="${id}"]`);

      expect(element).toHaveLength(1);
      expect(element[0]).toBeInTheDocument();

      productElements.push(element[0]);
    });

    const user = userEvent.setup()
    const clearCart = container.querySelectorAll(".Cart-Clear");

    expect(clearCart).toHaveLength(1);
    expect(clearCart[0]).toBeInTheDocument();

    await user.click(clearCart[0]);

    productElements.forEach(element => {
      expect(element).not.toBeInTheDocument();
    });

    expect(cart.getState()).toStrictEqual({});
  });
});