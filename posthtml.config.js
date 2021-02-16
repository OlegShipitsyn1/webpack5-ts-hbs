module.exports = ({ file, options, env }) => ({
  parser: 'posthtml-sugarml',
  plugins: {
    'posthtml-include': options.include,
    'posthtml-content': options.content,
    'htmlnano': env === 'production' ? {} : false
  }
})