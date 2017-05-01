'use strict';

angular.module('musicApp.startPage', ['ngRoute'])

.config(['$routeProvider' , function($routeProvider) {

    $routeProvider.when('/start', {
        templateUrl: 'startPage/startPage.html'
    });

}])
.controller('startPageCtrl', ['globalData', '$mdDialog', '$http', '$scope', '$timeout', '$scope', function(globalData, $mdDialog, $http, $scope, $timeout, $window) {
    var self = this;

    self.spotifyApi = globalData;
    self.searchText = "";
    self.progress = 0;
    self.firstSearch = false;

    self.setAllDefault = function () {
        this.spotifyApi.offsetartists = 0;
        this.spotifyApi.offsetalbums = 0;
        this.spotifyApi.offsettracks = 0;
    };

    self.States = {
        noSearch: 'noSearch',
        noResults: 'noResults',
        searching: 'searching',
        showingResults: 'showingResults'
    };
    self.state = self.States.noSearch;


    self.nextPage = function (topic) {
        var offset = 'offset' + topic;
        this.spotifyApi[offset] += this.spotifyApi.limitSearch;
        self.spotifyApi.search(topic.toLowerCase(), self.searchText, self.progressUpdate);
    };

    self.previousPage =  function(topic){
        var offset = 'offset' + topic;
        this.spotifyApi[offset] -=  this.spotifyApi.limitSearch;
        self.spotifyApi.search(topic.toLowerCase(), self.searchText, self.progressUpdate);
    };

    self.disableNextPage = function (topic) {
        var target = topic.toLowerCase();
        return !(this.spotifyApi.results[target].json_data.length > 0 && this.spotifyApi.results[target].json_data.length == this.spotifyApi.limitSearch)
    };

    self.disablePreviousPage =function (topic) {
        var offset = 'offset' + topic;
        return (this.spotifyApi[offset] - this.spotifyApi.limitSearch) < 0;
    };


    self.progressUpdate = function(progress){
        self.progress = 100.0 * progress.loaded / progress.total;
    };
    
    self.search = function(){
        self.setAllDefault();
        self.state = self.States.searching;
        self.firstSearch = true;
        $('html,body').animate(
            {
                scrollTop: $("#results").offset().top
            },
        'slow');
        globalData.search_item(self.searchText, self.progressUpdate, self.finishedSearch);
    };

    self.finishedSearch = function(results){
        if ((results.artists.json_data.length > 0) || (results.albums.json_data.length > 0) || (results.tracks.json_data.length > 0)){
            self.state = self.States.showingResults;
        } else {
            self.state = self.States.noResults;
        }
    };

    self.focus = function() {
        document.getElementById('searchBarInput').focus();
    };

    self.pressedKey = function(keyEvent){
        if (keyEvent.which === 13){
            self.search();
        }
    };

    $scope.showView = function (selectedItem, type){
        var info = {
            selectedItem: selectedItem,
            selectedItemInfo: new function(){
                this.data={}; this.call=function(response){if (response.status == 200) {
                this.data = response.data;
            }else{
                console.log('Something went wrong, status: ' + response.status);
            }}},
            percentLoaded: 0
        };
        var newScope = $scope.$new(true);
        newScope.get_tracks_album = function(album){return $scope.showView(album, 'album')};

        if (type == 'artist'){
            self.spotifyApi.get_albums_by_artist(selectedItem.id, info.selectedItemInfo, self.progressUpdate);
        } else if (type == 'album'){
            self.spotifyApi.get_album_by_id(selectedItem.id, info.selectedItemInfo, self.progressUpdate);
        }

        newScope.info = info;
        $mdDialog.show({
                clickOutsideToClose: true,
                scope: newScope,
                preserveScope: false,
                plain: true,
                templateUrl: 'templates/' + type + 'Page.html'
            }
        )

    }

}]
);
