import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableService } from './service/table.service';
import { AIService } from './service/ai.service';
// import { WaistService } from './service/waist.service';
// import { SideEffectService } from './service/side-effect.service';
// import { ConditionService } from './service/condition.service';
// import { CardPlayingService } from './service/card-playing.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TableService,
    AIService
    // WaistService,
    // SideEffectService,
    // ConditionService,
    // CardPlayingService
  ]
})
export class EngineModule { }
