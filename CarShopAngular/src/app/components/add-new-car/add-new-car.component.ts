import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { CarModel } from 'src/app/models/CarModel';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.css']
})
export class AddNewCarComponent implements OnInit {

  addCarForm = new FormGroup({
    manufacturer: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form){
    var car = {};
    if(form.valid)
    {
      car["manufacturer"] = this.addCarForm.get('manufacturer');
      car["model"] = this.addCarForm.get("model");
      car["description"] = this.addCarForm.get("description");

      this.addCarForm.reset();
    }


    console.log(car);
  }

}
