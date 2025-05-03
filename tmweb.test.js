const { clickElement, getText } = require("./util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Go to cinema tests", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("happy booking a standart seet", async () => {
    await clickElement(page, "a:nth-child(5)");
    await clickElement(page, "[data-seance-id='225']");
    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_standart']",
    );
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Вы выбрали билеты:";
    await expect(actual).toContain(expected);
  }, 30000);

  test("happy booking a vip seet", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(page, "[data-seance-id='218']");
    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_vip']",
    );
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Вы выбрали билеты:";
    await expect(actual).toContain(expected);
  }, 30000);

  test("sad booking a taken seet", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(page, "[data-seance-id='218']");
    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_taken']",
    );
    const acceptinButton = await page.$(".acceptin-button");
    expect(await acceptinButton.evaluate((btn) => btn.disabled)).toEqual(true);
  }, 30000);
});
