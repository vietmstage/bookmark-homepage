import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
  @Input() articles: Array<Object>
  constructor() { }

  ngOnInit() {
  }

}
