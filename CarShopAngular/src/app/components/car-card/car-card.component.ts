import { Component, OnInit, Input } from '@angular/core';
import { CarModel } from 'src/app/models/CarModel';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() car: CarModel;
  @Input() indexOfCard: number;

  constructor(private router: Router, 
              private carService: CarService) { }

  ngOnInit() {
  }

  onDetailsClicked(carId){
    this.router.navigate(['CarDetails/'+ carId]);
  }

  onEditClicked(carId){
    this.router.navigate(['EditCar/'+ carId]);
  }

  onDeleteClicked(carId){

  }
}
