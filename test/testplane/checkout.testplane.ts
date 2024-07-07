describe("Заполнение формы", () => {
  it("Форма успешно отправляется", async ({ browser }) => {
    browser.execute('localStorage.clear()');
    await browser.url("hw/store/catalog/0");

    const addToCart = await browser.$(".ProductDetails-AddToCart.btn.btn-primary.btn-lg");
    await addToCart.waitForDisplayed();
    await addToCart.click();

    await browser.url("hw/store/cart");

    const name = await browser.$("input[id=\"f-name\"]");
    await name.waitForDisplayed();
    await name.setValue("Name");

    const phone = await browser.$("input[id=\"f-phone\"]");
    await phone.waitForDisplayed();
    await phone.setValue("1234567890");

    const address = await browser.$("textarea[id=\"f-address\"]");
    await address.waitForDisplayed();
    await address.setValue("Address");

    const submit = await browser.$("button.Form-Submit.btn.btn-primary");
    await submit.waitForDisplayed();
    await submit.click();

    const alert = await browser.$(".Cart-SuccessMessage.alert.alert-success");
    await alert.waitForDisplayed({ timeoutMsg: "Неудачно" });
    expect(await alert.isDisplayed()).toBeTruthy();
  });
});