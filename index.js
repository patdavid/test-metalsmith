var Metalsmith       = require('metalsmith');
var collections      = require('metalsmith-collections');
var handlebars       = require('handlebars');
var layouts          = require('metalsmith-layouts');
var markdown         = require('metalsmith-markdown');
var paginate         = require('metalsmith-pagination');
var permalinks       = require('metalsmith-permalinks');
var debug            = require('metalsmith-debug');


Metalsmith(__dirname)

    .metadata({
        sitename: "Site Name",
        siteurl: "siteurl"
    })
    .source('./src')
    .destination('./build')
    .use(collections({
        posts: 'posts/**/*.md',
        sortBy: 'date',
        reverse: true
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':date/:title',
        date: 'YYYY/MM',
        relative: false
    }))
    .use( paginate({
        'collections.posts': {
            perPage: 10,
            layout: 'main.hbt',
            first: 'index.html',
            path: 'index-:num.html'
        }
    }))
    .use( layouts({
        engine: 'handlebars',
        directory: 'templates'
    }))
    .build( function(err) {
        if (err) throw err;
    });
