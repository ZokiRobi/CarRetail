import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { CarModel } from 'src/app/models/CarModel';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit,OnDestroy {

  car: CarModel;
  sub:Subscription = new Subscription();
  constructor(private service: CarService, private route: ActivatedRoute, private location:Location) { }

  ngOnInit() {
    this.sub.add(this.route.paramMap.
          pipe(
            switchMap((params: ParamMap) => this.service.getCarById(params.get('id'))))
            .subscribe((res: CarModel) => this.car = res));
  }


  goBack(){
    this.location.back();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
