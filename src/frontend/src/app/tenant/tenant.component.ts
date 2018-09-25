import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  tenantId : number;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params=> {
      
      this.tenantId = +params.get('id');
      console.log( params.get('id') );
      
    });
  }

}
