import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from "src/app/dashboard/dashboard.component";
import { CoinDetailComponent } from "src/app/coin-detail/coin-detail.component";
import { AdsComponent } from "src/app/ads/ads.component";
import { AddbuyingComponent } from "src/app/addbuying/addbuying.component";
import { AddadsComponent } from "src/app/addads/addads.component";
import { LoginComponent } from "src/app/login/login.component";

const routes: Routes = [
    {path:'', redirectTo: '/login', pathMatch:'full'},
    {path:'dashboard', component: DashboardComponent},
    {path:'coin-details/:symbol', component: CoinDetailComponent},
    {path:'ads',component:AdsComponent},
    {path:'ads/:symbol',component:AdsComponent},
    {path:'add-transacion',component:AddbuyingComponent},
    {path:'app-addad',component:AddadsComponent},
    {path:'login', component:LoginComponent},
    {path:'login/:err', component:LoginComponent}
  ];

@NgModule({
  exports:[RouterModule],
  imports:[
    RouterModule.forRoot(routes),
    HttpClientModule
  ]
})
export class AppRoutingModule {
  const
 }
