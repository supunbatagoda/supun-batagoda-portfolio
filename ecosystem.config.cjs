/**
 * PM2 runs both Node servers. Nginx should proxy the public site to Nuxt
 * (127.0.0.1:3000) and API requests to NestJS (127.0.0.1:3001).
 */
module.exports = {
  apps: [
    {
      name: 'portfolio-frontend',
      cwd: '/var/www/meeshlabs/supunbatagoda/current/frontend',
      script: '.output/server/index.mjs',
      interpreter: 'node',
      env_production: {
        NODE_ENV: 'production',
        NITRO_HOST: '127.0.0.1',
        NITRO_PORT: 3000,
      },
    },
    {
      name: 'portfolio-backend',
      cwd: '/var/www/meeshlabs/supunbatagoda/current/backend',
      script: 'dist/main.js',
      interpreter: 'node',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
