/**
 * Created by awan-awan on 2/13/2016.
 */
import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
    selector: 'addsql',
    template: `
  <h2>Add  Entry</h2>

   <div class="field">
        <label for="userID">UserID</label>
    <input type="text" #newUserID

    >
    </div>

   <div class="field">
        <label for="itemName">Item Name</label>
    <input type="text" #newItemName

    >
    </div>
  <button type="button" (click)="makeRequest(newUserID.value,newItemName.value)">Add Item</button>
  <div *ngIf="loading">loading...</div>
  <pre>{{data | json}}</pre>
`
})
export class AddRestSQLComponent {
    data: Object;
    loading: boolean;
    url='http://172.16.0.18:30089/AddItem?id=';

    constructor(public http: Http) {
    }

    makeRequest(userID: string,itemName:string ): void {

        console.log('you submitted value:',userID,"",itemName);
        this.loading = true;
        this.http.post(this.url+userID+'&item='+itemName,
            JSON.stringify({
            }
            ))
            .subscribe((res: Response) => {
                this.data = res.json();
                this.loading = false;
            });
    }
}
