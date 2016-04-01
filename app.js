webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var browser_1 = __webpack_require__(119);
	var http_1 = __webpack_require__(224);
	var router_1 = __webpack_require__(239);
	var SearchComponent_1 = __webpack_require__(263);
	var ArtistComponent_1 = __webpack_require__(494);
	var TrackComponent_1 = __webpack_require__(495);
	var AlbumComponent_1 = __webpack_require__(496);
	var SpotifyService_1 = __webpack_require__(266);
	__webpack_require__(497);
	var RoutesDemoApp = (function () {
	    function RoutesDemoApp(router) {
	        this.router = router;
	    }
	    RoutesDemoApp = __decorate([
	        core_1.Component({
	            selector: 'router-app',
	            directives: [router_1.ROUTER_DIRECTIVES],
	            template: "\n  <router-outlet></router-outlet>\n  "
	        }),
	        router_1.RouteConfig([
	            { path: '/', name: 'root', redirectTo: ['Search'] },
	            { path: '/search', name: 'Search', component: SearchComponent_1.SearchComponent },
	            { path: '/artists/:id', name: 'Artists', component: ArtistComponent_1.ArtistComponent },
	            { path: '/tracks/:id', name: 'Tracks', component: TrackComponent_1.TrackComponent },
	            { path: '/albums/:id', name: 'Albums', component: AlbumComponent_1.AlbumComponent },
	        ]), 
	        __metadata('design:paramtypes', [router_1.Router])
	    ], RoutesDemoApp);
	    return RoutesDemoApp;
	})();
	browser_1.bootstrap(RoutesDemoApp, [
	    router_1.ROUTER_PROVIDERS,
	    http_1.HTTP_PROVIDERS,
	    SpotifyService_1.SPOTIFY_PROVIDERS,
	    core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: RoutesDemoApp }),
	    core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' }),
	    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
	]).catch(function (err) { return console.error(err); });


/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(122);
	var router_1 = __webpack_require__(239);
	var AddRestSQLComponent_1 = __webpack_require__(264);
	var RestSQLComponent_1 = __webpack_require__(265);
	var SpotifyService_1 = __webpack_require__(266);
	var SearchComponent = (function () {
	    function SearchComponent(spotify, router, routeParams) {
	        this.spotify = spotify;
	        this.router = router;
	        this.routeParams = routeParams;
	    }
	    SearchComponent.prototype.ngOnInit = function () {
	        this.search();
	    };
	    SearchComponent.prototype.submit = function (query) {
	        this.router.navigate(['/Search', { query: query }]);
	        this.search();
	    };
	    SearchComponent.prototype.search = function () {
	        var _this = this;
	        this.query = this.routeParams.get('query');
	        if (!this.query) {
	            return;
	        }
	        this.spotify
	            .searchTrack(this.query)
	            .subscribe(function (res) { return _this.renderResults(res); });
	    };
	    SearchComponent.prototype.renderResults = function (res) {
	        this.results = null;
	        if (res && res.tracks && res.tracks.items) {
	            this.results = res.tracks.items;
	        }
	    };
	    SearchComponent = __decorate([
	        core_1.Component({
	            selector: 'search',
	            directives: [RestSQLComponent_1.RestSQLComponent, AddRestSQLComponent_1.AddRestSQLComponent, router_1.RouterLink, common_1.CORE_DIRECTIVES],
	            template: "\n  <h1>Search</h1>\n\n  <p>\n    <input type=\"text\" #newquery\n      [value]=\"query\"\n      (keydown.enter)=\"submit(newquery.value)\">\n    <button (click)=\"submit(newquery.value)\">Search</button>\n  </p>\n\n  <div *ngIf=\"results\">\n    <div *ngIf=\"!results.length\">\n      No tracks were found with the term '{{ query }}'\n    </div>\n\n    <div *ngIf=\"results.length\">\n      <h1>Results</h1>\n\n      <div class=\"row\">\n        <div class=\"col-sm-6 col-md-4\" *ngFor=\"#t of results\">\n          <div class=\"thumbnail\">\n            <div class=\"content\">\n              <img src=\"{{ t.album.images[0].url }}\" class=\"img-responsive\">\n              <div class=\"caption\">\n                <h3>\n                  <a [routerLink]=\"['/Artists', {id: t.artists[0].id}]\">\n                    {{ t.artists[0].name }}\n                  </a>\n                </h3>\n                <br>\n                <p>\n                  <a [routerLink]=\"['/Tracks', {id: t.id}]\">\n                    {{ t.name }}\n                  </a>\n                </p>\n              </div>\n              <div class=\"attribution\">\n                <h4>\n                  <a [routerLink]=\"['/Albums', {id: t.album.id}]\">\n                    {{ t.album.name }}\n                  </a>\n                </h4>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <addsql></addsql>\n  <restsql></restsql>\n  "
	        }), 
	        __metadata('design:paramtypes', [SpotifyService_1.SpotifyService, router_1.Router, router_1.RouteParams])
	    ], SearchComponent);
	    return SearchComponent;
	})();
	exports.SearchComponent = SearchComponent;


/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(224);
	var AddRestSQLComponent = (function () {
	    function AddRestSQLComponent(http) {
	        this.http = http;
	        this.url = 'http://66.220.10.115:30089/AddItem?id=';
	    }
	    AddRestSQLComponent.prototype.makeRequest = function (userID, itemName) {
	        var _this = this;
	        console.log('you submitted value:', userID, "", itemName);
	        this.loading = true;
	        this.http.post(this.url + userID + '&item=' + itemName, JSON.stringify({}))
	            .subscribe(function (res) {
	            _this.data = res.json();
	            _this.loading = false;
	        });
	    };
	    AddRestSQLComponent = __decorate([
	        core_1.Component({
	            selector: 'addsql',
	            template: "\n  <h2>Add  Entry</h2>\n\n   <div class=\"field\">\n        <label for=\"userID\">UserID</label>\n    <input type=\"text\" #newUserID\n\n    >\n    </div>\n\n   <div class=\"field\">\n        <label for=\"itemName\">Item Name</label>\n    <input type=\"text\" #newItemName\n\n    >\n    </div>\n  <button type=\"button\" (click)=\"makeRequest(newUserID.value,newItemName.value)\">Add Item</button>\n  <div *ngIf=\"loading\">loading...</div>\n  <pre>{{data | json}}</pre>\n"
	        }), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], AddRestSQLComponent);
	    return AddRestSQLComponent;
	})();
	exports.AddRestSQLComponent = AddRestSQLComponent;


/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(224);
	var RestSQLComponent = (function () {
	    function RestSQLComponent(http) {
	        this.http = http;
	        this.url = 'http://66.220.10.115:30089/GetAllItems?id=';
	    }
	    RestSQLComponent.prototype.makeRequest = function (query) {
	        var _this = this;
	        console.log('you submitted value:');
	        this.loading = true;
	        this.http.post(this.url + query, JSON.stringify({}))
	            .subscribe(function (res) {
	            _this.data = res.json();
	            _this.loading = false;
	        });
	    };
	    RestSQLComponent = __decorate([
	        core_1.Component({
	            selector: 'restsql',
	            template: "\n  <h2>Get Entry</h2>\n\n   <div class=\"field\">\n        <label for=\"userID\">UserID</label>\n    <input type=\"text\" #newquery\n    [value]=1\n    >\n\n    </div>\n<!--\n     <div class=\"field\">\n        <label for=\"skuInput\">SKU</label>\n        <input type=\"text\"\n               id=\"skuInput\"\n               placeholder=\"123\"\n               ngControl=\"sku\">\n      </div>\n-->\n\n  <button type=\"button\" (click)=\"makeRequest(newquery.value)\">SQL Request</button>\n  <div *ngIf=\"loading\">loading...</div>\n  <pre>{{data | json}}</pre>\n"
	        }), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], RestSQLComponent);
	    return RestSQLComponent;
	})();
	exports.RestSQLComponent = RestSQLComponent;


/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(224);
	__webpack_require__(267);
	var SpotifyService = (function () {
	    function SpotifyService(http) {
	        this.http = http;
	    }
	    SpotifyService.prototype.query = function (URL, params) {
	        var queryURL = "" + SpotifyService.BASE_URL + URL;
	        if (params) {
	            queryURL = queryURL + "?" + params.join('&');
	        }
	        return this.http.request(queryURL).map(function (res) { return res.json(); });
	    };
	    SpotifyService.prototype.search = function (query, type) {
	        return this.query("/search", [
	            ("q=" + query),
	            ("type=" + type)
	        ]);
	    };
	    SpotifyService.prototype.searchTrack = function (query) {
	        return this.search(query, 'track');
	    };
	    SpotifyService.prototype.getTrack = function (id) {
	        return this.query("/tracks/" + id);
	    };
	    SpotifyService.prototype.getArtist = function (id) {
	        return this.query("/artists/" + id);
	    };
	    SpotifyService.prototype.getAlbum = function (id) {
	        return this.query("/albums/" + id);
	    };
	    SpotifyService.BASE_URL = 'https://api.spotify.com/v1';
	    SpotifyService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], SpotifyService);
	    return SpotifyService;
	})();
	exports.SpotifyService = SpotifyService;
	exports.SPOTIFY_PROVIDERS = [
	    core_1.provide(SpotifyService, { useClass: SpotifyService })
	];


/***/ },

/***/ 494:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(122);
	var router_1 = __webpack_require__(239);
	var SpotifyService_1 = __webpack_require__(266);
	var ArtistComponent = (function () {
	    function ArtistComponent(routeParams, spotify, locationStrategy) {
	        this.routeParams = routeParams;
	        this.spotify = spotify;
	        this.locationStrategy = locationStrategy;
	        this.id = routeParams.get('id');
	    }
	    ArtistComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.spotify
	            .getArtist(this.id)
	            .subscribe(function (res) { return _this.renderArtist(res); });
	    };
	    ArtistComponent.prototype.back = function () {
	        this.locationStrategy.back();
	    };
	    ArtistComponent.prototype.renderArtist = function (res) {
	        this.artist = res;
	    };
	    ArtistComponent = __decorate([
	        core_1.Component({
	            selector: 'artist',
	            directives: [common_1.CORE_DIRECTIVES],
	            template: "\n  <div *ngIf=\"artist\">\n    <h1>{{ artist.name }}</h1>\n\n    <p>\n      <img src=\"{{ artist.images[0].url }}\">\n    </p>\n\n    <p><a href (click)=\"back()\">Back</a></p>\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [router_1.RouteParams, SpotifyService_1.SpotifyService, router_1.LocationStrategy])
	    ], ArtistComponent);
	    return ArtistComponent;
	})();
	exports.ArtistComponent = ArtistComponent;


/***/ },

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(122);
	var router_1 = __webpack_require__(239);
	var SpotifyService_1 = __webpack_require__(266);
	var TrackComponent = (function () {
	    function TrackComponent(routeParams, spotify, locationStrategy) {
	        this.routeParams = routeParams;
	        this.spotify = spotify;
	        this.locationStrategy = locationStrategy;
	        this.id = routeParams.get('id');
	    }
	    TrackComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.spotify
	            .getTrack(this.id)
	            .subscribe(function (res) { return _this.renderTrack(res); });
	    };
	    TrackComponent.prototype.back = function () {
	        this.locationStrategy.back();
	    };
	    TrackComponent.prototype.renderTrack = function (res) {
	        this.track = res;
	    };
	    TrackComponent = __decorate([
	        core_1.Component({
	            selector: 'theTrack',
	            directives: [common_1.CORE_DIRECTIVES],
	            template: "\n  <div *ngIf=\"track\">\n    <h1>{{ track.name }}</h1>\n\n    <p>\n      <img src=\"{{ track.album.images[1].url }}\">\n    </p>\n\n    <p>\n      <audio controls src=\"{{ track.preview_url }}\"></audio>\n    </p>\n\n    <p><a href (click)=\"back()\">Back</a></p>\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [router_1.RouteParams, SpotifyService_1.SpotifyService, router_1.LocationStrategy])
	    ], TrackComponent);
	    return TrackComponent;
	})();
	exports.TrackComponent = TrackComponent;


/***/ },

/***/ 496:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(122);
	var router_1 = __webpack_require__(239);
	var SpotifyService_1 = __webpack_require__(266);
	var AlbumComponent = (function () {
	    function AlbumComponent(routeParams, spotify, locationStrategy) {
	        this.routeParams = routeParams;
	        this.spotify = spotify;
	        this.locationStrategy = locationStrategy;
	        this.id = routeParams.get('id');
	    }
	    AlbumComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.spotify
	            .getAlbum(this.id)
	            .subscribe(function (res) { return _this.renderAlbum(res); });
	    };
	    AlbumComponent.prototype.back = function () {
	        this.locationStrategy.back();
	    };
	    AlbumComponent.prototype.renderAlbum = function (res) {
	        this.album = res;
	    };
	    AlbumComponent = __decorate([
	        core_1.Component({
	            selector: 'album',
	            directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES],
	            template: "\n  <div *ngIf=\"album\">\n    <h1>{{ album.name }}</h1>\n    <h2>{{ album.artists[0].name }}</h2>\n\n    <p>\n      <img src=\"{{ album.images[1].url }}\">\n    </p>\n\n    <h3>Tracks</h3>\n    <ol>\n      <li *ngFor=\"#t of album.tracks.items\">\n        <a [routerLink]=\"['/Tracks', {id: t.id}]\">\n          {{ t.name }}\n        </a>\n      </li>\n    </ol>\n\n    <p><a href (click)=\"back()\">Back</a></p>\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [router_1.RouteParams, SpotifyService_1.SpotifyService, router_1.LocationStrategy])
	    ], AlbumComponent);
	    return AlbumComponent;
	})();
	exports.AlbumComponent = AlbumComponent;


/***/ },

/***/ 497:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(498);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(506)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!style-loader!css-loader?sourceMap!./../../node_modules/sass-loader/index.js?outputStyle=expanded&root=D:/ag2/17/routes/music/app&&includePaths[]D:/ag2/17/routes/music/node_modules&&includePaths[]D:/ag2/17/routes/music/app!./styles.scss", function() {
				var newContent = require("!!./../../node_modules/extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!style-loader!css-loader?sourceMap!./../../node_modules/sass-loader/index.js?outputStyle=expanded&root=D:/ag2/17/routes/music/app&&includePaths[]D:/ag2/17/routes/music/node_modules&&includePaths[]D:/ag2/17/routes/music/app!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 498:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }

});
//# sourceMappingURL=app.js.map
