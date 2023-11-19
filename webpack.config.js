const path = require("path");
const config = (module.exports = require("openmrs/default-webpack-config"));
config.scriptRuleConfig.exclude = path.sep == "/";
config.overrides.resolve = {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"],
    alias: {
        "@openmrs/esm-framework": "@openmrs/esm-framework/src/internal",
        "@ugandaemr/esm-ugandaemr-commons-lib": "@ugandaemr/esm-ugandaemr-commons-lib/src/index",
    },
};

module.exports = config;