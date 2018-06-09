import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  post(data) {
    return this.http.post(
      'https://contentkit-api.mstage.io/graphql',
      data,
      {
        headers: {
          "Content-type": "application/json",
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiI1YWRmNzRjNzdmZjQ0ZTAwMWViODI1MzkiLCJpYXQiOjE1MjQ1OTM4NjN9.Yx-17tVN1hupJeVa1sknrUKmxawuG5rx3cr8xZc7EyY"
        }
      }
    )
  }

  getSources(): Observable<Object> {
    return this.post({
      query: `
        query {
          viewer {
            sourcePagination (page: 1, perPage: 20) {
              count
              items {
                title
                sourceId
                sourceImage
              }
            }
          }
        }
      `
    });
  }
  getArticlesBySource({ limit = 40, skip = 0, sourceName = "" }): Observable<Object> {
    return this.post({
      query: `
        query{
          viewer{
            articleSearch (
              ${sourceName && `query: {
                bool: {
                  filter: [
                    {
                        terms: {
                        sourceName: [
                          {
                            value: "${sourceName}"
                          }
                        ]
                      }
                    }
                  ]
                }
              },`}
              limit: ${limit}, skip: ${skip}) {
              count
              hits {
                _source {
                  category
                  sourceName
                  sourceCreateAt
                  intentIds
                  contentId
                  content
                  readingTime
                  tags
                  title
                  longDescription
                  shortDescription
                  sourceImage
                  state
                }
              }
            }
          }
        }
      `
    });
  }
}
