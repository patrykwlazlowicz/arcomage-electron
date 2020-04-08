import { NgModule } from '@angular/core';
import { ResourceLabelComponent } from './resource-label/resource-label.component';
import { ResourceComponent } from './resource/resource.component';
import { GameComponent } from './game.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EngineModule } from 'src/app/engine/engine.module';
import { CastleComponent } from './castle/castle.component';



@NgModule({
  declarations: [
    GameComponent,
    ResourceLabelComponent,
    ResourceComponent,
    CastleComponent
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
