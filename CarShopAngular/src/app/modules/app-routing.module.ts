import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AddNewCarComponent } from '../components/add-new-car/add-new-car.component';
import { CarDetailsComponent } from '../components/car-details/car-details.component';
import { EditCarComponent } from '../components/edit-car/edit-car.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'AddCar', component: AddNewCarComponent},
  {path:'CarDetails/:id', component: CarDetailsComponent},
  {path:'EditCar/:id', component: EditCarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
