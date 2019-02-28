import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModel } from '../models/CarModel';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  url = "https://localhost:44354/Cars/";
  constructor(private httpClient: HttpClient) { }

  public getCars(): Observable<CarModel[]>{
    return this.httpClient.get(this.url + "GetAllCars").pipe(
      map((c:CarModel[]) => c)
    );
  }
}
