const { clickElement, getText } = require("../../util.js");

const { Given, When, Then, Before, After } = require("cucumber");
const puppeteer = require("puppeteer");
const chai = require("chai");

const { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});
After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto("https://qamid.tmweb.ru/client/index.php", {
    timeout: 10000,
  });
});

When("user selects a session by date and time", async function () {
  return (
    await clickElement(this.page, "a:nth-child(5)"),
    await clickElement(this.page, "[data-seance-id='225']")
  );
});

When("user books a seet", async function () {
  return (
    await clickElement(
      this.page,
      "span[class='buying-scheme__chair buying-scheme__chair_standart']",
    ),
    await clickElement(this.page, ".acceptin-button")
  );
});

When(
  "user selects a session with vip seets by date and time",
  async function () {
    return (
      await clickElement(this.page, "a:nth-child(2)"),
      await clickElement(this.page, "[data-seance-id='218']")
    );
  },
);

When("user books a VIP seet", async function () {
  return (
    await clickElement(
      this.page,
      "span[class='buying-scheme__chair buying-scheme__chair_vip']",
    ),
    await clickElement(this.page, ".acceptin-button")
  );
});

When(
  "user selects a session with taken seets by date and time",
  async function () {
    return (
      await clickElement(this.page, "a:nth-child(2)"),
      await clickElement(this.page, "[data-seance-id='218']")
    );
  },
);

When("user tries to select a taken seet", async function () {
  return await clickElement(
    this.page,
    "span[class='buying-scheme__chair buying-scheme__chair_taken']",
  );
});

Then(
  "user sees the chosen seets conformation {string}",
  async function (string) {
    const actual = await getText(this.page, ".ticket__check-title");
    return chai.expect(actual).to.include(string);
  },
);

Then("user cant book a seet", async function () {
  const acceptinButton = await this.page.$(".acceptin-button");
  chai.expect(await acceptinButton.evaluate((btn) => btn.disabled)).to.be.true;
});
