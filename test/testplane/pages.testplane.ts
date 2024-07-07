describe("Страницы имеют статическое содержимое", () => {
  it("Главная", async ({ browser }) => {
    await browser.url("hw/store");
    await browser.setWindowSize(1920, 1080);

    const element = await browser.$(".Home");
    await element.waitForDisplayed();

    await element.assertView("home");
  });

  it("Условия доставки", async ({ browser }) => {
    await browser.url("hw/store/delivery");
    await browser.setWindowSize(1920, 1080);

    const element = await browser.$(".Delivery");
    await element.waitForDisplayed();

    await element.assertView("delivery");
  });

  it("Контакты", async ({ browser }) => {
    await browser.url("hw/store/contacts");
    await browser.setWindowSize(1920, 1080);

    const element = await browser.$(".Contacts");
    await element.waitForDisplayed();

    await element.assertView("contacts");
  });
});