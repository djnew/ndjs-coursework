const glob = require("glob-promise")

async function getSockets() {
  const files = await glob("**/*.socket.js");
  const moduleRouters = [];
  files.forEach(path => {
    moduleRouters.push(require(path.replace('src/', './')));
  });
  return moduleRouters;
}

module.exports = {
  getSockets
};
