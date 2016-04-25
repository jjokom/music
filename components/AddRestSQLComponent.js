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
var AddRestSQLComponent = (function () {
    function AddRestSQLComponent(http) {
        this.http = http;
        this.url = 'http://demo.cloudawan.com::30089/AddItem?id=';
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
//# sourceMappingURL=AddRestSQLComponent.js.map
