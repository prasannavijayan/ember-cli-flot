/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-flot',
  included: function (app) {
    this.app = app;
    var configMessage = [];
    var fs = require("fs"), path = require('path');
    var o = app.options['ember-cli-flot'] || {};
    var flotPath = 'bower_components/flot/';

    var emberCLIVersion = app.project.emberCLIVersion().split(',').map(function (item) {
      return Number(item);
    });
    if (emberCLIVersion[1] === 0 || emberCLIVersion[2] < 8) {
      throw new Error('ember-cli-flot requires ember-cli version 0.1.8 or greater.\n');
    }

    app.import(flotPath + 'jquery.flot.js');

    // Import JS from flot
    if (o.plugins instanceof Array) {
      o.plugins.forEach(function (fileName) {
        app.import(flotPath + 'jquery.flot.' + fileName + '.js');
      });
      configMessage.push('some plugins loaded [' + o.plugins.join(',') + ']');
    }

    if (o.quiet !== false) {
      console.log('flot config: ', configMessage.join(', '));
    }
  }
};
