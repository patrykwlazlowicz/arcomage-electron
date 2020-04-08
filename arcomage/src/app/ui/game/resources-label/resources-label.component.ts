import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'game-resources-label',
  templateUrl: './resources-label.component.html',
  styleUrls: ['./resources-label.component.css']
})
export class ResourcesLabelComponent implements OnInit {

  @Input() title: string;
  @Input() value: string;

  constructor() { }

  ngOnInit(): void {
  }

}
