import { Component, OnInit } from '@angular/core';
import { TenantsService } from '../services/tenants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HostListener } from '@angular/core';

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
    private router: Router,
    private route: ActivatedRoute,
    private service: TenantsService) {
    }

  ngOnInit() {
    this.service.readTenants().subscribe( response => {
      if ( response ) {
        this.tenants = response as any[];
      }
    }, error => {
      console.error('no tenants');
    }) ;
    this.route.queryParamMap.subscribe( params => {
      this.pageNb   = +params.get('page');
      this.pageSize = +params.get('pageSize');
      console.log( { page: this.pageNb, pageSize: this.pageSize } );
    });
  }

  // @HostListener('click')
  deleteTenant(tenant) {
    console.log(tenant);
    this.service.deleteTenant(tenant).subscribe();
    this.router.navigate(['/tenants', {page:this.pageNb, pageSize: this.pageSize} ]);
  }

}
