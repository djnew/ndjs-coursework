const glob = require("glob-promise")

async function getRoutes() {
  const files = await glob("**/*.module.js");
  const moduleRouters = [];
  files.forEach(path => {
    moduleRouters.push(require(path.replace('src/', './')));
  });
  return moduleRouters;
}

module.exports = {
  getRoutes
};
