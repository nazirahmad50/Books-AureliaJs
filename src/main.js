import environment from "./environment";

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature("resources")
    .plugin("aurelia-validation")
    .plugin("aurelia-dialog")
    .plugin("aurelia-animator-css");

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  if (environment.testing) {
    aurelia.use.plugin("aurelia-testing");
  }

  aurelia.start().then(() => aurelia.setRoot());
}
