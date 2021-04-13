import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailDtoComponent } from './components/car-detail-dto/car-detail-dto.component';
import { CarPageComponent } from './components/car-page/car-page.component';

const routes: Routes = [
  {path:"", pathMatch:"full",component:CarDetailDtoComponent},  
  {path:"cars", component:CarDetailDtoComponent},
  {path:"cars/brand/:brand", component:CarDetailDtoComponent},
  {path:"cars/color/:color", component:CarDetailDtoComponent},
  {path:"cars/detail/:carId", component:CarPageComponent},
  {path:"car/brand/:brand/color/:color", component:CarDetailDtoComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
