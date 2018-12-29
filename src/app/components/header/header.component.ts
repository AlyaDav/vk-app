import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  @ViewChild('childComponentTabs') childComponentTabs;
  ngOnInit() {}

  clickRefresh() {
    this.childComponentTabs.getNewData('');
  }
}
