import { Component, OnInit, Input } from '@angular/core';
import { ResourcesSide } from '../../enum/resources-side.enum';
import { MessagesMap } from '../../interface/game-messages';

@Component({
  selector: 'game-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  RESOURCES_SIDE: typeof ResourcesSide = ResourcesSide;
  RESOURCES_STATE_PREFIX: string = MessagesMap.gameResourcesStatePrefix;
  RESOURCES_GROWTH_PREFIX: string = MessagesMap.gameResourcesGrowthPrefix;

  @Input() imgName: string;
  @Input() resourceKind: string;
  @Input() growth: string;
  @Input() state: string;
  @Input() sideAdjustment: ResourcesSide;

  constructor() { }

  ngOnInit(): void {
  }

}
