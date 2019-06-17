/* eslint-disable consistent-return */
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const writeFiles = require('./files').writeFiles;

module.exports = class extends EntityClientGenerator {
    constructor(args, opts) {
        opts.context.cypressTests = true;
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important
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
};
