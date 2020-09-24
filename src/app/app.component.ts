import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isServiceRequestSelected: boolean
  isActivityLogSelected: boolean
  isSpareItemsSelected: boolean

  ngOnInit() {
    this.isServiceRequestSelected = true
  }

  selectServiceRequest() {
    this.isServiceRequestSelected = true
    this.isActivityLogSelected = false
    this.isSpareItemsSelected = false
  }

  selectActivityLog() {
    this.isServiceRequestSelected = false
    this.isActivityLogSelected = true
    this.isSpareItemsSelected = false

  }

  selectSpareItems() {
    this.isServiceRequestSelected = false
    this.isActivityLogSelected = false
    this.isSpareItemsSelected = true

  }
}
