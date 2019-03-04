import { Component, OnInit, Input } from '@angular/core';
import { CarModel } from 'src/app/models/CarModel';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() car: CarModel;
  constructor() { }

  ngOnInit() {
  }

}
