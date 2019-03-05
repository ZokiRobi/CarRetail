import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import {  FormGroup,FormControl,Validators}  from "@angular/forms";
import { CarModel } from "src/app/models/CarModel";
import { CarService } from "src/app/services/car.service";
import { from, Subscription } from "rxjs";

@Component({
  selector: "app-add-new-car",
  templateUrl: "./add-new-car.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./add-new-car.component.css"]
})
export class AddNewCarComponent implements OnInit, OnDestroy {
  subsciption: Subscription = new Subscription();
  addCarForm:FormGroup;
  manufacturers: Array<object>;
  carModels;
  firstItem:any;

  configManufacturersSelect = {
    displayKey: "text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: "150px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Select car", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 1000, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: "More cars", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search for car", // label thats displayed in search input,
    searchOnKey: "text" // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  configModelsSelect = {
    displayKey: "text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: "150px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Select model", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 1000, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: "More models", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search for model", // label thats displayed in search input,
    searchOnKey: "text" // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  constructor(
    private service: CarService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.subsciption.add(
      this.service.GetCarManufacturers().subscribe((result: Array<object>) => {
        this.manufacturers = result;
        this.firstItem = result[0];

        this.addCarForm.get('manufacturer').setValue({id:this.firstItem.id, text: this.firstItem.text},{emitEvent:true});
      })
    );

    this.addCarForm = new FormGroup({
      manufacturer: new FormControl('', [
        Validators.required
      ]),
      model: new FormControl("", [
        Validators.required
      ]),
      description: new FormControl("", [
        Validators.required,
        this.validateWhiteSpace
      ])
    });
  }

  manufacturerSelectChanged(e) {
    this.service.GetCarModels(e.value.id).subscribe(m => (this.carModels = m));
  }

  modelSelectChanged(e) {}

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
