import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module';
import { FontAwesomeImportsModule } from './modules/app-font-awesome-Imports.module';
import { AngularMaterialModules } from './modules/angular-materials.modules';

import { SelectDropDownModule } from 'ngx-select-dropdown'



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddNewCarComponent } from './components/add-new-car/add-new-car.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AddNewCarComponent,  
    CarCardComponent, 
    CarDetailsComponent, 
    EditCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    FontAwesomeImportsModule,
    AngularMaterialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
