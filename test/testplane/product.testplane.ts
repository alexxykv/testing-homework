describe("Страница товара", () => {
  it("Товар корректно отображается", async ({ browser }) => {
    browser.execute('localStorage.clear()');
    await browser.url("hw/store/catalog/0");

    const name = await browser.$(".ProductDetails-Name");
    await name.waitForDisplayed({ timeoutMsg: "Название товара отсутствует" });

    const description = await browser.$(".ProductDetails-Description");
    await description.waitForDisplayed({ timeoutMsg: "Описание товара отсутствует" });

    const price = await browser.$(".ProductDetails-Price");
    await price.waitForDisplayed({ timeoutMsg: "Цена товара отсутствует" });

    const color = await browser.$(".ProductDetails-Color");
    await color.waitForDisplayed({ timeoutMsg: "Цвет товара отсутствует" });

    const material = await browser.$(".ProductDetails-Material");
    await material.waitForDisplayed({ timeoutMsg: "Материал товара отсутствует" });

    expect(await name.getText()).not.toEqual("");
    expect(await description.getText()).not.toEqual("");
    expect(await price.getText()).not.toEqual("");
    expect(await color.getText()).not.toEqual("");
    expect(await material.getText()).not.toEqual("");
  });

  it("Товар успешно добавляется в корзину", async ({ browser }) => {
    await browser.url("hw/store/catalog/0");

    const addToCart = await browser.$(".ProductDetails-AddToCart.btn.btn-primary.btn-lg");
    await addToCart.waitForDisplayed();
    await addToCart.click();

    const badge = await browser.$(".CartBadge.text-success");
    await badge.waitForDisplayed();

    expect(await badge.getText()).toBe("Item in cart");

    browser.refresh();

    const badgeAfterRefresh = await browser.$(".CartBadge.text-success");
    await badgeAfterRefresh.waitForDisplayed();

    expect(await badgeAfterRefresh.getText()).toBe("Item in cart");
  });

  it("Если товар добавлен в корзину, повторное нажатие кнопки \"Добавить в корзину\" должно увеличивать его количество", async ({ browser }) => {
    await browser.url("hw/store/catalog/0");

    const addToCart = await browser.$(".ProductDetails-AddToCart.btn.btn-primary.btn-lg");
    await addToCart.waitForDisplayed();
    await addToCart.click();

    await browser.url("hw/store/cart");

    const count = await browser.$("tr[data-testid=\"0\"] .Cart-Count");
    await count.waitForDisplayed();

    expect(await count.getText()).toBe("2");
  });
});