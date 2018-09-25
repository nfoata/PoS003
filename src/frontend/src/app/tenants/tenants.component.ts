import { Component, OnInit } from '@angular/core';
import { TenantsService } from '../services/tenants.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {

  tenants: any[];
  pageNb: number;
  pageSize: number;

  constructor(
    private route: ActivatedRoute, 
    private service: TenantsService) 
    { 
      
    }

  ngOnInit() {
    this.tenants = this.service.getAll();
    this.route.queryParamMap.subscribe( params => {
      this.pageNb   = +params.get('page');
      this.pageSize = +params.get('pageSize');
      console.log( { page: this.pageNb, pageSize: this.pageSize } );
      
    });
  }

}
