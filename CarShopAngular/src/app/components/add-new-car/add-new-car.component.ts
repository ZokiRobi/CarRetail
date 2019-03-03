import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { CarModel } from "src/app/models/CarModel";
import { CarService } from "src/app/services/car.service";
import { from, Subscription } from "rxjs";
import { Select2Component } from "ng2-select2";

@Component({
  selector: "app-add-new-car",
  templateUrl: "./add-new-car.component.html",
  styleUrls: ["./add-new-car.component.css"]
})
export class AddNewCarComponent implements OnInit, OnDestroy {
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

  constructor(private service: CarService, private router: Router) {}

  ngOnInit() {
    this.subsciption.add(
      this.service.GetCarManufacturers().subscribe(result => {
        this.carManufacturers = result;
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
    this.manufacturerId = e.value;
    this.manufacturerName = e.data[0].text;
    this.service.GetCarModels(e.value).subscribe(m => (this.carModels = m));
  }

  modelSelectChanged(e) {
    this.modelId = e.value;
    this.modelName = e.data[0].text;
  }

  // addCarForm FormControl getters
  get manufacturer() {
    return this.addCarForm.get("manufacturer");
  }
  get model() {
    return this.addCarForm.get("model");
  }
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

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }
}
