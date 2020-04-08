import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'game-castle',
  templateUrl: './castle.component.html',
  styleUrls: ['./castle.component.css']
})
export class CastleComponent implements OnInit {

  @Input() imgName: string;
  @Input() elementTitle: string;
  @Input() state: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
