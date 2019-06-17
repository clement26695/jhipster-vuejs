
module.exports = {
    askForClient
};

function askForClient(meta) {
    if (!meta && this.existingProject) return;

    const applicationType = this.applicationType;

    const choices = [
        {
            value: 'vue',
            name: 'Vue.js'
        }
    ];

    const PROMPT = {
        type: 'list',
        name: 'clientFramework',
        when: () => (applicationType !== 'microservice' && applicationType !== 'uaa'),
        message: () => 'Which *Framework* would you like to use for the client?',
        choices,
        default: 'vue'
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    this.prompt(PROMPT).then((prompt) => {
        this.clientFramework = prompt.clientFramework;
        done();
    });
}

function askForTestOpts(meta) {
    if (!meta && this.existingProject) return;

    const choices = [];
    const defaultChoice = [];
    if (meta || !this.skipServer) {
        // all server side test frameworks should be added here
        choices.push({ name: 'Gatling', value: 'gatling' }, { name: 'Cucumber', value: 'cucumber' });
    }
    if (meta || !this.skipClient) {
        // all client side test frameworks should be added here
        choices.push({ name: 'Protractor', value: 'protractor' }, { name: 'Cypress', value: 'cypress' });
    }
    const PROMPT = {
        type: 'checkbox',
        name: 'testFrameworks',
        message: 'Besides JUnit and Jest, which testing frameworks would you like to use?',
        choices,
        default: defaultChoice
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    this.prompt(PROMPT).then(prompt => {
        this.testFrameworks = prompt.testFrameworks;
        done();
    });
}

