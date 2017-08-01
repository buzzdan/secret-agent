'use strict';

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'index.js',
      max_restarts: 4,
      node_args: "--inspect=5859",
      watch: ['app','config'],
    }
  ]
 };