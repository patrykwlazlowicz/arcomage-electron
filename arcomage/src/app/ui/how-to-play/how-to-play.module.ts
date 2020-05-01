import { NgModule } from '@angular/core';
import { HowToPlayComponent } from './how-to-play.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [HowToPlayComponent],
  imports: [
    SharedModule
  ]
})
export class HowToPlayModule { }
