import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'observable-placeholder',
  templateUrl: './observable-placeholder.component.html',
  styleUrls: ['./observable-placeholder.component.scss']
})
export class ObservablePlaceholderComponent implements OnInit {
  @Input() public name: string;

  constructor() { }

  ngOnInit() {
  }

}
