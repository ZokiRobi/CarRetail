import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from '@angular/common';
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

@Component({
  selector: "app-add-new-car",
  templateUrl: "./add-new-car.component.html",
  styleUrls: ["./add-new-car.component.css"]
})
export class AddNewCarComponent implements OnInit, OnDestroy {
  subsciption: Subscription = new Subscription();
  addCarForm;
  manufacturers;
  carModels;

  selectOptions = {
    theme: "classic"
  };

  constructor(private service: CarService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.subsciption.add(
      this.service.GetCarManufacturers().subscribe(result => {
        this.manufacturers = result;
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

    this.service.GetCarModels(e.value).subscribe(m => (this.carModels = m));
  }

  modelSelectChanged(e) {

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
