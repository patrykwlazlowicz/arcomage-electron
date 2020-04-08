import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './lib/translate-file-loader';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    TranslateModule
  ]
})
export class SharedModule { }
