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
  constructor(private httpClient: HttpClient) { } 

  public getCars(){
    return this.httpClient.get(this.url + "GetAllCars");
  }

}
