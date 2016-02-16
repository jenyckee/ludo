#Browsersync - Webpack

## Rationale

### What's out there 
CommonJS & AMD & (ES6 modules)

- CommonJS (Like node.js)
```
require("module");
require("../file.js");
exports.doStuff = function() {};
module.exports = someValue;
```

- AMD (Like require.js)
```
require(["module", "../file"], function(module, file) { /* ... */ });
define("mymodule", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
```
-ES6 

```
import "jquery";
export function doStuff() {}
module "localModule" {}
```

### Being able to do a shrinkwrap

Currently not possible in Bower, current proposed approach is a lockfile. See
[https://github.com/bower/bower/issues/505]()

### Serve only parts of SPAs
Webpack is smart enough to 

### Loaders

### Plugins
