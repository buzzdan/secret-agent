'use strict';

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'server.js',
      max_restarts: 4,
      node_args: "--inspect=5859",
      watch: ["./app/**/*.js", "server.js"]
    }
  ]
 };