var Metalsmith              = require('metalsmith');
var collections             = require('metalsmith-collections');
var handlebars              = require('handlebars');
var layouts                 = require('metalsmith-layouts');
var markdown                = require('metalsmith-markdown');
var pagination              = require('metalsmith-pagination');
var permalinks              = require('metalsmith-permalinks');

Metalsmith(__dirname)

    .metadata({
        sitename: "Site Name",
        siteurl: "siteurl"
    })
    .source('./src')
    .destination('./build')
    .clean(true)
    .use(collections({
        posts: 'posts/*.md'
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':date/:title',
        date: 'YYYY/MM',
        relative: false
    }))
    .use( layouts({
        engine: 'handlebars',
        directory: 'templates'
    }))
    .build( function(err) {
        if (err) throw err;
    });
