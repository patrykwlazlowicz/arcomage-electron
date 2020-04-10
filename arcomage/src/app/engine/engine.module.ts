import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableService } from './service/table.service';
import { AIService } from './service/ai.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TableService,
    AIService
  ]
})
export class EngineModule { }
