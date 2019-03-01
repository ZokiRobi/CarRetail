import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddNewCarComponent } from './components/add-new-car/add-new-car.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'AddCar', component: AddNewCarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
