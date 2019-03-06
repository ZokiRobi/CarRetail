import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModel } from '../models/CarModel';
import { map } from 'rxjs/operators';
import { Constants } from '../Constants';
@Injectable({
  providedIn: 'root'
})

export class CarService {
  url = Constants.API_ENDPOINT;
  cardItemHovered?: number;
  
  constructor(private httpClient: HttpClient) { } 

  public getCars(){
    return this.httpClient.get(this.url + "GetAllCars");
  }

  public getCarById(id){
    return this.httpClient.get(this.url + "GetCarById/" + id);
  }

  public addCar(car:CarModel){
    return this.httpClient.post(this.url + "AddCar", car);
  }

  public GetCarManufacturers(){
    return this.httpClient.get(this.url + "GetManufacturers");
  }
  public GetCarModels(id:number){
    return this.httpClient.get(this.url + "GetModelsByManufacturerId/" + id);
  }
}
