const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: './styles/antd.less',
  webpack(config) {
    return config;
  },
});
