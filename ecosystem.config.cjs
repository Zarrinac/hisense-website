module.exports = {
  apps: [
    {
      name: "hisense-ir",
      cwd: "/var/www/hisense-ir/app",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_MEDIA_BASE_URL: "/media",
        DATABASE_URL: "postgresql://reza_sf:Rsf22606645!!@localhost:5432/zarrin?schema=public",
      },
    },
  ],
};

