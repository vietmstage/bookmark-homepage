import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleService } from "../../services/article.service";
import { HostListener } from '@angular/core'

@Component({
  selector: "app-basic-home",
  templateUrl: "./basic-home.component.html",
  styleUrls: ["./basic-home.component.css"]
})
export class BasicHomeComponent implements OnInit {
  sourceId = "";
  articles: Array<Object> = [];
  loadingArticle = false;
  showLoadMore = false;
  stopLoadingMore = false;
  limit = 20;
  skip = 0;
  constructor(
    public router: Router,
    public activedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {
    this.sourceId = activedRoute.snapshot.params["sourceId"];
  }

  ngOnInit() {
    this.getArticles();
    this.router.events.subscribe(event => {
      // console.log(event);
      if (
        event["snapshot"] &&
        event["snapshot"].params &&
        event["snapshot"].params["sourceId"] &&
        this.sourceId !== event["snapshot"].params["sourceId"]
      ) {
        // console.log(event["snapshot"].params["sourceId"]);
        this.sourceId = event["snapshot"].params["sourceId"];
        this.articles = [];
        this.showLoadMore = false;
        this.stopLoadingMore = false;
        this.limit = 20;
        this.skip = 0;
        this.getArticles();
      }
    });
  }

  getArticles() {
    this.loadingArticle = true
    this.articleService
      .getArticlesBySource({ limit: this.limit, skip: this.skip, sourceName: this.sourceId })
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
