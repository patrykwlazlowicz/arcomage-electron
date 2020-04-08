import { Component, OnInit, Input } from '@angular/core';
import { ResourcesSide } from '../../enum/resources-side.enum';

@Component({
  selector: 'game-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  RESOURCES_SIDE: typeof ResourcesSide = ResourcesSide;

  @Input() imgName: string;
  @Input() growth: string;
  @Input() state: string;
  @Input() sideAdjustment: ResourcesSide;

  constructor() { }

  ngOnInit(): void {
  }

}
