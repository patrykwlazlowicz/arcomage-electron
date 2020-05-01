import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'init-game-resource-slider',
  templateUrl: './resource-slider.component.html',
  styleUrls: ['./resource-slider.component.css']
})
export class ResourceSliderComponent implements OnInit {

  @Input() title: string;
  @Input() value: string;
  @Input() min: number;
  @Input() max: number;

  @Output() changeValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
