import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'json-content',
  templateUrl: './json-content.component.html',
  styleUrls: ['./json-content.component.css']
})
export class JsonContentComponent implements OnInit {
  @Input() public name: string;
  @Input() public value: string;
  constructor() {
  }

  ngOnInit() {
  }

}
