/* eslint-disable consistent-return */
const chalk = require('chalk');

const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const constants = require('generator-jhipster/generators/generator-constants');
const utils = require('generator-jhipster/generators/utils');

const writeFiles = require('./files').writeFiles;

const TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;

module.exports = class extends EntityClientGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        this.e2eTestsFramework = this.config.get('e2eTestsFramework') || [];
    }

    get writing() {
        return {
            writeAdditionalFile() {
                writeFiles.call(this);
            }
        };
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }

    addEntitySupportFileToIndex() {
        if (this.e2eTestsFramework.includes('cypress')) {
            try {
                const supportFileIndex = `${TEST_SRC_DIR}cypress/support/index.ts`;
                const importEntry = 'import \'./entities\';';
                utils.rewriteFile({
                    file: supportFileIndex,
                    needle: 'jhipster-needle-add-support-file',
                    splicable: [
                        this.stripMargin(importEntry)
                    ]
                }, this);
            } catch (e) {
                this.log(`${chalk.yellow('Cypress: Entities support file not added to index.js.\n')}`);
                this.debug('Error:', e);
            }
        }
    }
};
