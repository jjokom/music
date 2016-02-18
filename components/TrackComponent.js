var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var SpotifyService_1 = require('services/SpotifyService');
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
        __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof SpotifyService_1.SpotifyService !== 'undefined' && SpotifyService_1.SpotifyService) === 'function' && _a) || Object, router_1.LocationStrategy])
    ], TrackComponent);
    return TrackComponent;
    var _a;
})();
exports.TrackComponent = TrackComponent;
//# sourceMappingURL=TrackComponent.js.map