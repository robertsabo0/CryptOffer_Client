import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { AdsComponent } from './ads/ads.component';
import { FormsModule } from '@angular/forms';
import { AddbuyingComponent } from './addbuying/addbuying.component';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { AddadsComponent } from './addads/addads.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './tokeninterceptor';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CoinDetailComponent,
    AdsComponent,
    AddbuyingComponent,
    AddadsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DlDateTimePickerDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
