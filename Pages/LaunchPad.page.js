const { test } = require('@playwright/test');

class LaunchPadPage {

    constructor(page) {
        this.page = page;

        this.horizon = '//a[@title="Horizon"]';

    }

    async AccessHorizon() {
        await this.page.click(this.horizon);
    }


}

module.exports = LaunchPadPage;