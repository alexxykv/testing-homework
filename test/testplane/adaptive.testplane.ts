const testCases = [
  [1400, 1050],
  [1200, 1050],
  [992, 1050],
  [768, 1050],
  [576, 1050],
  [540, 1050]
];

testCases.forEach(([width, height]) => {
  describe(`Вёрстка адаптируется под ширину экрана (${width}x${height})`, () => {
    beforeEach(async ({ browser }) => {
      await browser.setWindowSize(width, height);
    });

    it("Главная страница", async ({ browser }) => {
      await browser.url("hw/store");

      const element = await browser.$(".Application");
      await element.waitForDisplayed();

      await element.assertView("home");
    });

    it("Условия доставки", async ({ browser }) => {
      await browser.url("hw/store/delivery");

      const element = await browser.$(".Application");
      await element.waitForDisplayed();

      await element.assertView("delivery");
    });

    it("Контакты", async ({ browser }) => {
      await browser.url("hw/store/contacts");

      const element = await browser.$(".Application");
      await element.waitForDisplayed();

      await element.assertView("contacts");
    });

    it("Корзина", async ({ browser }) => {
      await browser.url("hw/store/cart");

      const element = await browser.$(".Application");
      await element.waitForDisplayed();

      await element.assertView("cart");
    });
  });
});