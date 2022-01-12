module.exports = {
  apps : [{
    name: 'opms-api',
    script: 'dist/shared/infra/http/server.js',
    interpreter: 'node@12.22.7'
  }]
};
