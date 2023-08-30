import MainPage from "../../screenobjects/MainPage";

const playHubPage = new MainPage();

// BMA-35
describe('View the MainPage page', () => {
  it('Verify Elements', async () => {
    await expect(playHubPage.getMainPageScreen()).toBeDisplayed();
  });
});
