import { NgModule } from '@angular/core';
import { InitGameComponent } from './init-game.component';
import { SharedModule } from '../../shared/shared.module';
import { ResourceSliderComponent } from './resource-slider/resource-slider.component';



@NgModule({
  declarations: [
    InitGameComponent,
    ResourceSliderComponent
  ],
  exports: [
    InitGameComponent
  ],
  imports: [
    SharedModule
  ]
})
export class InitGameModule { }
