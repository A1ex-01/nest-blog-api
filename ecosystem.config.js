module.exports = {
  apps: [
    {
      name: 'nest-blog-api',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
