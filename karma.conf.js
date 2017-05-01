//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
        'build/bower_components/angular/angular.min.js',
        'build/bower_components/angular-mocks/angular-mocks.js',
        'source/app.js',
        'source/utils/components/resources.js',
        'tests/resourses/*'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
