import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources-label',
  templateUrl: './resources-label.component.html',
  styleUrls: ['./resources-label.component.css']
})
export class ResourcesLabelComponent implements OnInit {

  title: string;
  value: string;

  constructor() { }

  ngOnInit(): void {
  }

}
