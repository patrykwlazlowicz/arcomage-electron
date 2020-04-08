import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'game-resource-label',
  templateUrl: './resource-label.component.html',
  styleUrls: ['./resource-label.component.css']
})
export class ResourceLabelComponent implements OnInit {

  @Input() title: string;
  @Input() value: string;

  constructor() { }

  ngOnInit(): void {
  }

}
