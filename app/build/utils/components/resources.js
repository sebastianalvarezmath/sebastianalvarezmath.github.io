angular.module('musicApp.resources', [])

.factory('globalData',  ['$http',  function($http){
    return {

        url_api : 'https://api.spotify.com',
        url_token : 'https://accounts.spotify.com/api/token',
        client_id : 'c9557aed41e6498f959c37e99a986da5',
        client_key : '28c47f8c14a74d70ae3133bc928fd020',
        limitSearch: 8,
        offsetAlbums: 0,
        offsetArtists: 0,
        offsetTracks: 0,


        request: function (endpoint, method, data, headers, callback, progressHandler) {

            var self = this;

            $http({
                url: endpoint,
                method: method ? method : 'GET',
                data: data,
                headers: headers,
                withCredentials: false,
                eventHandlers: {
                    progress: progressHandler
                }
            }).then(function (response) {
                    callback.call(response);
                }, function(response) {
                    console.log("Something went wrong");
             });

        },
            
        get_albums_by_name : function (album_name, callback, progressHandler) {
            new_name = encodeURI(album_name, "UTF-8");
            url = this.url_api + '/v1/search?q=' + new_name +'&type=album' + '&limit=' + this.limitSearch + '&offset=' + this.offsetAlbums;
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },

        get_album_by_id : function (album_id, callback, progressHandler) {
            new_name = encodeURI(album_id, "UTF-8");
            url = this.url_api + '/v1/albums/' + new_name;
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },

        get_artists_by_name : function (artist_name, callback, progressHandler) {
            new_name = encodeURI(artist_name, "UTF-8");
            url = this.url_api + '/v1/search?q=' + new_name +'&type=artist' + '&limit=' + this.limitSearch + '&offset=' + this.offsetArtists;
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },

        get_artist_by_id : function (artist_id, callback, progressHandler) {
            new_name = encodeURI(artist_id, "UTF-8");
            url = this.url_api + '/v1/artists/' + new_name;
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },

        get_playlist_by_name : function (playlist_name, callback, progressHandler) {
            new_name = encodeURI(playlist_name, "UTF-8");
            url = this.url_api + '/v1/search?q=' + new_name +'&type=playlist' + '&limit=' + this.limitSearch;
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },

        get_tracks_by_name : function (track_name, callback, progressHandler) {
            new_name= encodeURI(track_name, "UTF-8");
            url = this.url_api + '/v1/search?q=' + new_name +'&type=track' + '&limit=' + this.limitSearch + '&offset=' + this.offsetTracks;
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },

        get_track_by_id : function (track_id, callback, progressHandler) {
            new_name= encodeURI(track_id, "UTF-8");
            url = this.url_api + '/v1/tracks/' + new_name;
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },

        get_tracks_by_album : function (album_id, callback, progressHandler) {
            new_name= encodeURI(album_id, "UTF-8");
            url = this.url_api + '/v1/albums/' + new_name + '/tracks';
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },



        get_albums_by_artist : function (artist_id, callback, progressHandler) {
            new_name = encodeURI(artist_id, "UTF-8");
            url = this.url_api + '/v1/artists/' + new_name + '/albums';
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },

        get_top_tracks_by_artist : function (artist_id, callback, progressHandler) {
            new_name = encodeURI(artist_id, "UTF-8");
            url = this.url_api + '/v1/artists/' + new_name + '/top-tracks';
            this.request(url, 'GET', {}, {}, callback, progressHandler);
        },


        albums_info: function albums(callback) {
            this.json_data = {};

            this.call = function (response){
                if (response.status == 200) {
                    this.json_data = response.data['albums'].items;

                }else{
                    console.log('Ha ocurrido algun error, status: ' + response_status)
                }
                if (!!callback){
                    callback(response);
                }
            }

        },

        tracks_info: function tracks(callback) {
            this.json_data = {};

            this.call = function (response){
                if (response.status == 200) {
                    this.json_data = response.data['tracks'].items;
                }else{
                    console.log('Ha ocurrido algun error, status: ' + response_status)
                }
                if (!!callback){
                    callback(response);
                }
            }

        },

        artists_info: function artists(callback) {
            this.json_data = {};

            this.call = function (response){
                if (response.status == 200) {
                    this.json_data = response.data['artists'].items;
                }else{
                    console.log('Ha ocurrido algun error, status: ' + response_status)
                }
                if (!!callback){
                    callback(response);
                }
            };
            
        },

        playlists_info: new function playlists() {
            this.json_data = {};

            this.call = function (response){
                if (response.status == 200) {
                    this.json_data = response.data['playlists'].items;
                }else{
                    console.log('Ha ocurrido algun error, status: ' + response_status)
                }
            }

        },


        search_item : function(item, progressHandler, finishedHandler){
            var self  =  this;

            if (item == null){
                return ;
            }

            if (item.length == 0){
                return ;
            }

            var completed_request = 0;

            function check_request(){
                completed_request += 1;
                if (completed_request >= 3){
                    self.results = {'albums': req_albums_info,
                                    'artists': req_artists_info,
                                    'tracks': req_tracks_info};
                    if (!!finishedHandler){
                        finishedHandler(self.results);
                    }
                }
            }

            var req_albums_info = new self.albums_info(check_request);
            var req_artists_info = new self.artists_info(check_request);
            var req_tracks_info = new self.tracks_info(check_request);

            this.get_albums_by_name(item, req_albums_info, progressHandler);
            this.get_artists_by_name(item, req_artists_info, progressHandler);
            this.get_tracks_by_name(item, req_tracks_info, progressHandler);

        },

        results: {'albums': {'json_data':[]},
                  'artists': {'json_data':[]},
                  'tracks': {'json_data':[]}},


        search: function (topic, item, progressHandler) {

            var self = this;

            function asign_result() {
                self.results[topic] = req_info;
            }

            if (topic == 'artists'){
                var req_info = new self.artists_info(asign_result);
                this.get_artists_by_name(item, req_info, progressHandler);
            } else if (topic == 'tracks'){
                var req_info = new self.tracks_info(asign_result);
                this.get_tracks_by_name(item, req_info, progressHandler);
            } else if (topic == 'albums'){
                var req_info = new self.albums_info(asign_result);
                this.get_albums_by_name(item, req_info, progressHandler);
            }

        }



    }
}]);