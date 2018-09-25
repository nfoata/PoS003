import { Component, Output, EventEmitter } from '@angular/core';
import { PricesService } from './prices.service';

@Component({
    selector: "prices",
    template: `<h2>{{ "Title: " + getTitle() | uppercase }}</h2>
    <ul>
        <li *ngFor="let price of prices">{{price}}</li>
        
    </ul>
    <p>Number: {{ mynumber | number:'.2-2' }}</p>
    <p>Price: {{ mynumber | currency:'AUD':false:'.2-2' }}</p>
    <p>Date: {{ mydate | date:'longDate'}}</p>
    <input [(ngModel)]="email" (keyup.enter)="keyUp()"/>
    <input type="button" label="toto" (change)="onClick()"/>
    `
})
export class PricesComponent {
    
    private title  = "List of prices";
    prices;
    email = "nicolas.foata@gmail.com";
    mynumber = 256894123.456;
    mydate = new Date(2018,3,4);

    @Output('change') changeEmitter = new EventEmitter();

    constructor(service: PricesService) {
        this.prices = service.getPrices(); 
    }

    getTitle() {
        return this.title;
    }

    keyUp() {
        console.log("key up: "+this.email);
        this.changeEmitter.emit();
    }

    onClick() {
        this.changeEmitter.emit();
    }
}