import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { PriceService } from '../services/price.service';

export interface PriceData {
  id: string;
  base: number;
  gst: number;
  total: number;
}

@Component({
  selector: 'price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
  //inputs: ['base','gst','total']
})
export class PriceComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Price (base)', 'Taxes (GST)', 'Price (total)'];
  dataSource: MatTableDataSource<PriceData>;

  constructor(private service: PriceService) {
    // Create 100 users
    const prices = Array.from({length: 100}, (_, k) => createNewPrice(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(prices);
    this.service.getPrices().subscribe( response => {
      console.log( response );
      if ( !response || (response as any[]).length === 0) {
        console.error('nothing return');
      } else {
        this.dataSource = new MatTableDataSource( createNewPricesFrom(  response as any[]  ) );
      }
      /*(response ) => {
        if ( response as Response) {
          this.dataSource = new MatTableDataSource( createNewPricesFrom(  (<Response>response).json()) );
        }*/
    }, error => {
      console.error('an error occured');
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

/** Builds and returns a new User. */
function createNewPrice(id: number): PriceData {
  const value = Math.round(Math.random() * 100 );
  const tax = value * 10.0 / 100.0;
  return {
    id: id.toString(),
    base: value ,
    gst: tax,
    total: (value + tax)
  };
}

function createNewPricesFrom( prices ): PriceData[] {
  const result: PriceData[] = [] ;
  console.log( prices );
  prices.forEach(price => {
    result.push({
      id: price._id.toString(),
      base: price.price ? price.price : '-',
      gst: price.gst ? price.gst : '-',
      total: price.total ? price.total : '-'
    });
  });
  return result;
}


/*
@Input('base-price' ) base: number;
@Input('gst-price'  ) gst: number;
@Input('total-price') total: number;
@Input('is-computed') isComputed: boolean;
@Output('change') change = new EventEmitter();

  price = { id: 1
    this.base,
    gst,
    total
  };

  constructor() { 
    this.isComputed = false;
  }

  ngOnInit() {
  }

  onPriceChanged() {
    this.total = this.base + this.gst;
    this.isComputed = true;
    console.log("emit");
    this.change.emit();
  }

  onClick(){
    
  }
}
export interface PriceComputeEvent {
  info: string
}
*/