const targetOrign = process.env.VUE_APP_BASEAPI;

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/theme.scss";
          @import "@/assets/css/common.scss";
        `,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: targetOrign,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
