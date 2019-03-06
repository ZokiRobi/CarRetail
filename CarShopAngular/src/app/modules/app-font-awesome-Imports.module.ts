import { NgModule } from "@angular/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faEdit, faTrash);

@NgModule({
    imports: [],
    exports: [FontAwesomeModule]
})
export class FontAwesomeImportsModule {
}