import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { PreviewComponent } from './preview/preview.component';
import { DropdownComponent } from './form/dropdown/dropdown.component';
import { PreviewAutoscaleDirective } from './preview/autoscale.directive';
import { CopyclipDirective } from './copyclip.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    PreviewComponent,
    DropdownComponent,
    PreviewAutoscaleDirective,
    CopyclipDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
