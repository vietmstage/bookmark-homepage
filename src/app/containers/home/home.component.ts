import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Array<Object> = [];
  loadingArticle = false;
  showLoadMore = false;
  stopLoadingMore = false;
  limit = 20;
  skip = 0;
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.loadingArticle = true
    this.articleService
      .getArticlesBySource({ limit: this.limit, skip: this.skip })
      .subscribe(result => {
        this.loadingArticle = false
        if (!result || result["errors"]) return;
        const data = result["data"].viewer.articleSearch;
        const { count, hits } = data;

        const addtionalArticles = hits.map(data => {
          let item = data._source
          item.domain = item.contentId.replace(/(http|https):\/\//, '').split('/')[0]
          return item
        }) || [];

        this.articles = [...this.articles, ...addtionalArticles]
        this.showLoadMore = true
        if (this.articles.length === count || hits.length === 0) {
          this.stopLoadingMore = true
          this.showLoadMore = false
        }
      }, err => {
        console.log('error', err)
        this.loadingArticle = false
      });
  }

  loadMore () {
    if (this.stopLoadingMore) {
      return
    }
    this.skip = this.skip + this.limit
    this.getArticles()
  }
}
