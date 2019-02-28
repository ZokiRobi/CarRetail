import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarModel } from 'src/app/models/CarModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars:CarModel[];
  constructor(private service: CarService) { }

  ngOnInit() {
    this.service.getCars().subscribe(
      response => {
        console.log(response);
        this.cars = response;
      }
    )
  }

}
 