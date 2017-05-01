

angular.module('musicApp.directives')

.directive('artistInfoBox', [function(){
    function link(scope, element){
        scope.spanInformation = function(){
            scope.setSelectedItem({itemInfo: scope.information, type: 'artist'});
        }
    }
    return {
        link: link,
        scope: {
            information: '=',   // Information about the single or the artist or the album to model.
            setSelectedItem: '&'
        },
        templateUrl: 'templates/infoBoxArtistTemplate.html'
    }
}]
)
;
