const path = require("path");
const config = (module.exports = require("openmrs/default-webpack-config"));
config.scriptRuleConfig.exclude =
  path.sep == "/"
    ? /(node_modules[^\/@openmrs\/esm\-patient\-common\-lib])/
    : /(node_modules[^\\@openmrs\/esm\-patient\-common\-lib])/;
config.overrides.resolve = {
  extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"],
  alias: {
    "@openmrs/esm-framework": "@openmrs/esm-framework/src/internal",
    "@openmrs/openmrs-form-engine-lib": "@openmrs/openmrs-form-engine-lib/src/index",
    "@ugandaemr/esm-ugandaemr-commons-lib":
      "@ugandaemr/esm-ugandaemr-commons-lib/src/index",
  },
};

module.exports = config;
