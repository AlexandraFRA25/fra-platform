const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const marked = require('marked')
const R = require('ramda')
const { readParameterWithAllowedValues, readAllowedParameter } = require('../utils/sanityChecks')

const getDefinition = (name, lang) => {
  return fs.readFileAsync(`${__dirname}/${lang}/${name}.md`, 'utf8')
}

module.exports.init = app => {

  app.get('/definitions/:lang/:name', (req, res) => {
    try {
      const lang = readParameterWithAllowedValues(req, 'lang', ['en', 'es', 'fr', 'ru'])
      const name = readAllowedParameter(req, 'name', R.match(/^[a-z0-9]+$/i))
      const mdRes = getDefinition(name, lang)
      mdRes.then(markdown => {
        var renderer = new marked.Renderer()
        renderer.heading = function(text, level) {
          if (level < 3) {
            var escapedText = text.toLowerCase().substr(0, text.indexOf(' '))
            return '<h' + level + ' id="' + escapedText + '" class="anchor-link">' + text + '</h' + level + '>'
          } else {
            return '<h' + level + '>' + text + '</h' + level + '>'
          }
        }
        marked.setOptions({
          renderer: renderer,
          smartypants: true
        })
        const content = markdown ? marked(markdown) : ''
        res.send(`<html lang="fi">
          <head>
            <link rel="stylesheet" href="/css/definition.css"/>
          </head>
          <body>
          ${content}
          </body>
          </html>`)
      }).error(err => {
        console.error(err)
        if (err.code === 'ENOENT') {
          if (lang !== 'en') {
            res.redirect(`/definitions/en/${name}`)
          } else {
            res.status(404).send('404 / Page not found')
          }
        }
        else {
          res.status(500).send('An error occured')
        }
      })
    }
    catch (err) {
      console.error(err)
      res.status(500).send('An error occured.')
    }
  })
}
