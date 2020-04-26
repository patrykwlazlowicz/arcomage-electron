import { NgModule } from '@angular/core';
import { ResourceLabelComponent } from './resource-label/resource-label.component';
import { ResourceComponent } from './resource/resource.component';
import { GameComponent } from './game.component';
import { SharedModule } from '../../shared/shared.module';
import { EngineModule } from '../../engine/engine.module';
import { CastleComponent } from './castle/castle.component';
import { DeckComponent } from './deck/deck.component';
import { DeckCardComponent } from './deck-card/deck-card.component';
import { OverlayComponent } from './overlay/overlay.component';



@NgModule({
  declarations: [
    GameComponent,
    ResourceLabelComponent,
    ResourceComponent,
    CastleComponent,
    DeckComponent,
    DeckCardComponent,
    OverlayComponent
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
