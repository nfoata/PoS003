import { Component, OnInit } from '@angular/core';
import { PriceService } from '../services/price.service';

@Component({
  selector: 'price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css']
})
export class PriceFormComponent implements OnInit {

  base: HTMLInputElement;
  _gst: number;
  _total: number;
  
  toto() {
   // return this.base
   //this.base.value
  }

  constructor(private service: PriceService) { }

  ngOnInit() {
    /*this.base = 0;
    this.gst = 0;
    this.total = 0;*/
  }

  submit(priceForm) {
    console.log( priceForm.value.pricemg);
    const p = priceForm.value.pricemg;
    const apiPrice: any = {};
    apiPrice.price = Number(p.base);
    apiPrice.gst = Number(p.gst);
    apiPrice.total = Number(p.total);
    // The json that we can send to the API: priceForm.value
    console.log( apiPrice);
    this.service.postPrice( apiPrice ).subscribe(
      response => {
        // if( response )
          console.log(response);
      }, error => {
        console.error( error );
      }
    );
    
  }

  calculate( ) {
    this._gst = Number(this.base) * 10. / 100. ;
    this._total = Number(this.base) + Number(this._gst);
  }

  reset() {
    this._gst = null;
    this._total=null;
  }

  /*base() {
    return this._base;
  }*/

  gst() {
    return this._gst;
  }

  total() {
    return this._total;
  }

}
