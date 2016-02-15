/**
 * Created by awan-awan on 2/13/2016.
 */
import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
    selector: 'restsql',
    template: `
  <h2>Get Entry</h2>

   <div class="field">
        <label for="userID">UserID</label>
    <input type="text" #newquery
    [value]=1
    >

    </div>
<!--
     <div class="field">
        <label for="skuInput">SKU</label>
        <input type="text"
               id="skuInput"
               placeholder="123"
               ngControl="sku">
      </div>
-->

  <button type="button" (click)="makeRequest(newquery.value)">SQL Request</button>
  <div *ngIf="loading">loading...</div>
  <pre>{{data | json}}</pre>
`
})
export class RestSQLComponent {
    data: Object;
    loading: boolean;
    url='http://172.16.0.18:30089/GetAllItems?id=';

    constructor(public http: Http) {
    }

    makeRequest(query: string): void {

        console.log('you submitted value:');
        this.loading = true;
        this.http.post(this.url+query,
            JSON.stringify({
            }
            ))
            .subscribe((res: Response) => {
                this.data = res.json();
                this.loading = false;
            });
    }
}
