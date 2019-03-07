import { NgModule } from "@angular/core";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [MatSlideToggleModule, MatInputModule, MatFormFieldModule],
    exports: [MatSlideToggleModule, MatInputModule, MatFormFieldModule]
})
export class AngularMaterialModules { }