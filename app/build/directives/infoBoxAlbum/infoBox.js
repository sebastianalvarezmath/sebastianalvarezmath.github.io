

angular.module('musicApp.directives')

.directive('albumInfoBox', [function(){
    function link(scope, element){
        scope.spanInformation = function(){
            scope.setSelectedItem({itemInfo: scope.information, type: 'album'});
        }
    }
    return {
        link: link,
        scope: {
            information: '=',   // Information about the single or the artist or the album to model.
            setSelectedItem: '&'
        },
        templateUrl: 'templates/infoBoxAlbumTemplate.html'
    }
}]
)
;
