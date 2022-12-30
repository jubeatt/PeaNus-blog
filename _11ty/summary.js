const tag = '<!-- summary -->'
const hasSummary = (content) => content.split(tag).length === 3
const isPreviewOnly = (content) => content.includes('<!--') && content.includes('-->')
const getSummary = (content) => {
  let summary = content.split(tag)[1]
  if (isPreviewOnly(summary)) {
    summary = '<p>' + summary.replace(/<!--|-->/gi, '') + '</p>'
  }
  return summary
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode('summary', function (content) {
    if (!hasSummary(content.post)) return ''
    const summary = getSummary(content.post)
    return summary
  })
}
