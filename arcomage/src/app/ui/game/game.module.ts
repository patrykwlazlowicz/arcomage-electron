import { NgModule } from '@angular/core';
import { ResourcesLabelComponent } from './resources-label/resources-label.component';
import { ResourcesComponent } from './resources/resources.component';
import { GameComponent } from './game.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EngineModule } from 'src/app/engine/engine.module';



@NgModule({
  declarations: [
    ResourcesLabelComponent,
    ResourcesComponent,
    GameComponent
  ],
  exports: [
    GameComponent
  ],
  imports: [
    SharedModule,
    EngineModule
  ]
})
export class GameModule { }
