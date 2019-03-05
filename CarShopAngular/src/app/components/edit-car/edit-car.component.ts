import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CarModel } from 'src/app/models/CarModel';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  car:CarModel;
  subsciption: Subscription = new Subscription();
  addCarForm;
  carManufacturers;
  carModels;

  manufacturerId;
  manufacturerName;
  modelId;
  modelName;

  selectOptions = { 
    theme: "classic"
  };
  constructor(private service: CarService, private router: Router, private location: Location, private route:ActivatedRoute) { }

  ngOnInit() {

    this.subsciption.add(this.route.paramMap.
      pipe(
        switchMap((params: ParamMap) => this.service.getCarById(params.get('id'))))
        .subscribe((res: CarModel) => {
          this.car = res;
        })); 

    this.subsciption.add( 
      this.service.GetCarManufacturers().subscribe(result => {
        this.carManufacturers = result;
        this.manufacturerId = this.car.CarManufacturerId;
      })
    );

    this.addCarForm = new FormGroup({
      description: new FormControl("", [
        Validators.required,
        this.validateWhiteSpace
      ])
    });
  }

  manufacturerSelectChanged(e) {
    if (e.value != null) {
      this.manufacturerId = e.value;
      this.manufacturerName = e.data[0].text;
      this.service.GetCarModels(e.value).subscribe(m => {
        this.carModels = m;
        this.modelId = this.car.CarModelId;
      });
    }
  }

  modelSelectChanged(e) {
    this.modelId = e.value;
    this.modelName = e.data[0].text;
  }

  // addCarForm FormControl getters
  get description() {
    return this.addCarForm.get("description");
  }

  // custom validator
  validateWhiteSpace(control: FormControl) {
    let valid = (control.value || "").trim().length == 0;
    return !valid ? null : { whitespace: true };
  }

  onSubmit(form) {
    var car: CarModel = new CarModel();

    if (form.valid) {
      car.CarModelName = this.modelName;
      car.CarModelId = this.modelId;
      car.CarManufacturerId = this.manufacturerId;
      car.CarManufacturerName = this.manufacturerName;
      car.Description = this.addCarForm.get("description").value;

      this.addCarForm.reset();

      this.subsciption.add(
        this.service.addCar(car).subscribe(c => this.router.navigate(["/"]))
      );
    }
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

}
