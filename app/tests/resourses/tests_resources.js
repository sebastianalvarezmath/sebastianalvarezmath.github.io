
describe("suite tests", function() {
    beforeEach(module('musicApp.resources'));


    // Factory of interest is called globalData
    describe('factory: globalData', function() {
        var factory = null;

        beforeEach(inject(function(globalData) {
            factory = globalData;
        }));


        it('Should define atribute limitSearch', function() {
            expect(factory.limitSearch).toBe(8);
        });

        it('Should define atribute offsetAlbums', function() {
            expect(factory.offsetAlbums).toBe(0);
        });

        it('Should define atribute offsetArtists', function() {
            expect(factory.offsetArtists).toBe(0);
        });

        it('Should define atribute offsetTracks', function() {
            expect(factory.offsetTracks).toBe(0);
        });

        it('Should define atribute url_api', function() {
            expect(factory.url_api).toBe('https://api.spotify.com');
        });

        it('Should define atribute results', function() {
            expect(factory.results).toEqual(jasmine.objectContaining({'albums': {'json_data':[]},
                'artists': {'json_data':[]},
                'tracks': {'json_data':[]}}));
        });

        it('Should define atribute results', function() {
            expect(factory.results).toEqual({'albums': {'json_data':[]},
                'artists': {'json_data':[]},
                'tracks': {'json_data':[]}});
        });


        describe('Spotify requests', function () {

            var albumsRequestHandler, artistsRequestHandler, tracksRequestHandler, $httpBackend;
            var get_albums = 'https://api.spotify.com/v1/search?q=a&type=album&limit=8&offset=0';
            var get_artists = 'https://api.spotify.com/v1/search?q=a&type=artist&limit=8&offset=0';
            var get_tracks =  'https://api.spotify.com/v1/search?q=a&type=track&limit=8&offset=0';

            beforeEach(inject(function($injector) {                // Set up the mock http service responses
                $httpBackend = $injector.get('$httpBackend');
                // backend definition common for all tests
                albumsRequestHandler = $httpBackend.when('GET', get_albums)
                    .respond({albums: {items: ['album1', 'album2']}});

                artistsRequestHandler = $httpBackend.when('GET', get_artists)
                    .respond({artists: {items: ['artist1', 'artist2']}});

                tracksRequestHandler = $httpBackend.when('GET', get_tracks)
                    .respond({tracks: {items: ['track1', 'track2']}});

            }));

            it('should fetch albums request', function() {
                $httpBackend.expectGET(get_albums);
                var mycallback = {call: function (response) {
                    this.response = response;
                }};
                factory.get_albums_by_name('a', mycallback, function(){});
                $httpBackend.flush();
            });


            it('should fetch artists request', function() {
                $httpBackend.expectGET(get_artists);
                var mycallback = {call: function (response) {
                    this.response = response;
                }};
                factory.get_artists_by_name('a', mycallback, function(){});
                $httpBackend.flush();
            });

            it('should fetch tracks request', function() {
                $httpBackend.expectGET(get_tracks);
                var mycallback = {call: function (response) {
                    this.response = response;
                }};
                factory.get_tracks_by_name('a', mycallback, function(){});
                $httpBackend.flush();
            });

            it('Get Albums: should define response atribute on the callback', function () {

                var mycallback = {call: function (response) {
                                    this.response = response;
                }};

                $httpBackend.expectGET(get_albums);
                expect(mycallback.response).toBeUndefined();
                factory.get_albums_by_name('a', mycallback, function(){});
                $httpBackend.flush();
                expect(mycallback.response).toBeDefined();
                expect(mycallback.response.status).toEqual(200);
            });

            it('Get Artists: should define response atribute on the callback', function () {

                var mycallback = {call: function (response) {
                    this.response = response;
                }};

                $httpBackend.expectGET(get_artists);
                expect(mycallback.response).toBeUndefined();
                factory.get_artists_by_name('a', mycallback, function(){});
                $httpBackend.flush();
                expect(mycallback.response).toBeDefined();
                expect(mycallback.response.status).toEqual(200);
            });

            it('Get Tracks: should define response atribute on the callback', function () {

                var mycallback = {call: function (response) {
                    this.response = response;
                }};

                $httpBackend.expectGET(get_tracks);
                expect(mycallback.response).toBeUndefined();
                factory.get_tracks_by_name('a', mycallback, function(){});
                $httpBackend.flush();
                expect(mycallback.response).toBeDefined();
                expect(mycallback.response.status).toEqual(200);
            });

            it('should Search function works fine!', function () {
                $httpBackend.expectGET(get_albums);
                $httpBackend.expectGET(get_artists);
                $httpBackend.expectGET(get_tracks);

                factory.search_item('a', function(){}, function (){});
                $httpBackend.flush();
                expect(factory.results.albums.json_data).toEqual(['album1', 'album2']);
                expect(factory.results.artists.json_data).toEqual(['artist1', 'artist2']);
                expect(factory.results.tracks.json_data).toEqual(['track1', 'track2']);

            });

        });

    });

});

