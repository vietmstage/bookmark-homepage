import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  @Input() article = {
    contentId: '',
    sourceImage: '',
    title: '',
    domain: ''
  }
  constructor() { }

  ngOnInit() {
  }

}
