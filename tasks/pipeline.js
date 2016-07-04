/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'bower_components/bootstrap/dist/css/bootstrap.css',
  'bower_components/ng-dialog/css/*.min.css',
  'bower_components/font-awesome/css/font-awesome.min.css',
  'bower_components/font-awesome/css/font-awesome.css.map',
  'bower_components/ngprogress/ngProgress.css',
  'bower_components/angular-loading-bar/build/loading-bar.css',
  'bower_components/angular-toastr/dist/angular-toastr.css',
  'bower_components/jquery-timepicker-jt/jquery.timepicker.css',


  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/angular-toastr/dist/angular-toastr.js',
  'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
  'bower_components/angular-smart-table/dist/smart-table.min.js',
  'bower_components/ng-dialog/js/ngDialog.min.js',
  'bower_components/angular-cookies/angular-cookies.min.js',
  'bower_components/ngprogress/build/ngprogress.min.js',
  'bower_components/lodash/dist/lodash.js',
  'bower_components/restangular/dist/restangular.js',
  'bower_components/angular-route-styles/route-styles.js',
  'bower_components/angular-loading-bar/build/loading-bar.js',
  'bower_components/jquery-timepicker-jt/jquery.timepicker.js',
  'bower_components/angular-jquery-timepicker/src/timepickerdirective.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/module.js',
  'js/modules/**/*module.js',
  'js/modules/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];







// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  return require('path').join('assets/',tplPath);
});


