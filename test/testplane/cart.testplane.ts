describe("Страница корзины", () => {
  it("Кнопка \"Очистить корзину\" работает", async ({ browser }) => {
    browser.execute('localStorage.clear()');
    await browser.url("hw/store/catalog/0");

    const addToCart = await browser.$(".ProductDetails-AddToCart.btn.btn-primary.btn-lg");
    await addToCart.waitForDisplayed();
    await addToCart.click();

    await browser.url("hw/store/cart");

    const table = await browser.$(".Cart-Table");
    await table.waitForDisplayed();

    const clearCart = await browser.$(".Cart-Clear");
    await clearCart.waitForDisplayed();
    await clearCart.click();

    expect(await table.isDisplayed()).toBeFalsy();
  });
});