const { test } = require('@playwright/test');

class PowerShellPage {

    constructor(page) {
        this.page = page;

        this.codeEditor = '.ace_text-input';
        this.execute = '//a[@title="Execute the script as a background job. (Ctrl+E)"]';
        this.new = '//a[@title="Clear the editor and start creating a new script. (Alt+N)"]';
    }

    async clickNew() {
        await this.page.click(this.new);
    }

    async clickExecute() {
        await this.page.click(this.execute);
    }

    async enterCodeScript(script) {
        await this.page.fill(this.codeEditor, script);
    }



}

module.exports = PowerShellPage;