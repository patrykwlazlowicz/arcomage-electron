import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule
  ]
})
export class SharedModule { }
