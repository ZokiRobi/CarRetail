import { NgModule } from "@angular/core";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports:[MatSlideToggleModule,MatInputModule],
    exports:[MatSlideToggleModule,MatInputModule]
})
export class AngularMaterialModules{}