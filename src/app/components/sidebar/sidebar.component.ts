import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  key = null
  constructor(private articleService: ArticleService) { }

  sources: Array<Object>

  ngOnInit() {
    this.getSources()
  }

  getSources() {
    this.articleService.getSources().subscribe(result => {
      if (!result || result['errors']) return
      this.sources = result['data'].viewer.sourcePagination.items
    })
  }

  onClickItem(item = {}) {
    this.key = item['sourceId'] || null
  }

}
