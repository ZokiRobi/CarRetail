import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarModel } from 'src/app/models/CarModel';
import { fromEvent, pipe, Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  cars:CarModel[];
  clicks = fromEvent(document, 'click');
  clickEvent:Event;
  _destroyed: Subject<void>;
 

  constructor(private service: CarService) { }

  ngOnInit() {
    this.service.getCars().subscribe((response:CarModel[]) => this.cars = response); 
    this.service.getCars().pipe(takeUntil(this._destroyed));
  }

  test(){
    this.clicks.subscribe(x => console.log(this.cars));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

}
 