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
var http_1 = require('angular2/http');
var RestSQLComponent = (function () {
    function RestSQLComponent(http) {
        this.http = http;
        this.url = 'http://172.16.0.18:30089/GetAllItems?id=';
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
//# sourceMappingURL=RestSQLComponent.js.map