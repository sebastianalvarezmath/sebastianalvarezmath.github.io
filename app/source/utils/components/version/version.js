'use strict';

angular.module('musicApp.version', [
  'musicApp.version.interpolate-filter',
  'musicApp.version.version-directive'
])

.value('version', '0.0.1');
