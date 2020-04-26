import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './menu.component';



@NgModule({
  declarations: [MenuComponent],
  exports: [
    MenuComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MenuModule { }
