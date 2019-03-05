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
      .subscribe((cars: CarModel[]) => this.cars = cars);
  }

  onHoverCardItem(target: HTMLElement) {
    var spanDetails: any = target.childNodes[0].childNodes[0].childNodes[0];
    var spanEdit: any = target.childNodes[0].childNodes[0].childNodes[1];
    var spanDelete: any = target.childNodes[0].childNodes[0].childNodes[2];
    spanDetails.classList.remove('cardIconHide');
    spanEdit.classList.remove('cardIconHide');
    spanDelete.classList.remove('cardIconHide');
  }

  onBlurCardItem(target) {
    var spanDetails: any = target.childNodes[0].childNodes[0].childNodes[0];
    var spanEdit: any = target.childNodes[0].childNodes[0].childNodes[1];
    var spanDelete: any = target.childNodes[0].childNodes[0].childNodes[2];
    spanDetails.classList.add('cardIconHide');
    spanEdit.classList.add('cardIconHide');
    spanDelete.classList.add('cardIconHide');
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
