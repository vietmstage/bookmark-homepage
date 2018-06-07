import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  array = ['1', '2', '3']
  ngOnInit() {
    this.changeTitle()
  }

  changeTitle () {
    this.title = 'New example'
  }
}
