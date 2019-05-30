module.exports = {
  publicPath: './',
  devServer: {
    https: true,
    proxy: 'https://api.jue.sh'
  }
}