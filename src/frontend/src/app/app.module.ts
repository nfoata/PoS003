import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatPaginatorModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { PriceComponent } from './price/price.component';
import { PricesComponent } from './prices.component';
import { PricesService } from './prices.service';
import { AuthService } from './services/auth.service';
import { PriceService } from './services/price.service';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { PriceFormComponent } from './price-form/price-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './services/post.service';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MeComponent } from './me/me.component';
import { TenantsComponent } from './tenants/tenants.component';
import { TenantComponent } from './tenant/tenant.component';



@NgModule({
  declarations: [
    AppComponent,
    PriceComponent,
    PricesComponent,
    SigninFormComponent,
    SignupFormComponent,
    PriceFormComponent,
    ChangePasswordComponent,
    PostsComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    MeComponent,
    TenantsComponent,
    TenantComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'sign-up', component: SignupFormComponent },
      { path: 'sign-in', component: SigninFormComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'me', component: MeComponent },
      { path: 'tenants/:id', component: TenantComponent },
      { path: 'tenants', component: TenantsComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'fake', component: PriceComponent },
      { path: 'app', component: AppComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
   // Http,
    AuthService,
    PostService,
    PriceService,
    PricesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
