describe("Страница каталога", () => {
  it("Для каждого товара в каталоге отображается название, цена и ссылка на страницу товара", async ({ browser }) => {
    await browser.url("hw/store/catalog");

    const products = await browser.$$(".ProductItem");
    products.forEach(async (product) => {
      const name = product.$(".ProductItem-Name");
      const price = product.$(".ProductItem-Price");
      const detailsLink = product.$(".ProductItem-DetailsLink");

      await name.waitForDisplayed({ timeoutMsg: "Название товара отсутствует" });
      await price.waitForDisplayed({ timeoutMsg: "Цена товара отсутствует" });
      await detailsLink.waitForDisplayed({ timeoutMsg: "Ссылка на страницу товара отсутствует" });
    })
  });

  it("Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом", async ({ browser }) => {
    browser.execute('localStorage.clear()');
    await browser.url("hw/store/catalog/0");

    const addToCart = await browser.$(".ProductDetails-AddToCart.btn.btn-primary.btn-lg");
    await addToCart.waitForDisplayed();
    await addToCart.click();

    await browser.url("hw/store/catalog");

    const badge = await browser.$(".ProductItem[data-testid=\"0\"] .CartBadge");
    await badge.waitForDisplayed();

    expect(await badge.getText()).toBe("Item in cart");
  });
});