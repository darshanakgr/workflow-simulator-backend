const shell = require("shelljs");

shell.cp("-R", "client/build/", "dist/public/");
