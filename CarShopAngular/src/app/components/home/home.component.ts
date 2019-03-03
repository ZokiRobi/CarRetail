import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarModel } from 'src/app/models/CarModel';
import { fromEvent, pipe, Subject, Observable, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  cars: CarModel[];
  destroyed = new Subject();
  private sub: Subscription = new Subscription();

  constructor(private service: CarService) { }


  ngOnInit() {
     this.service.getCars()
                 .pipe(takeUntil(this.destroyed), map(cars => cars))
                 .subscribe((cars:CarModel[]) => this.cars = cars);
  }

  ngOnDestroy(): void {
      this.destroyed.next();
      this.destroyed.complete();
  }

}
