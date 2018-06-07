import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getSources(): Observable<Object> {
    return this.http.post(
      'https://contentkit-api.mstage.io/graphql', {
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
      },
      {
        headers: {
          'Content-type': 'application/json',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiI1YWRmNzRjNzdmZjQ0ZTAwMWViODI1MzkiLCJpYXQiOjE1MjQ1OTM4NjN9.Yx-17tVN1hupJeVa1sknrUKmxawuG5rx3cr8xZc7EyY'
        }
      }
    )
  }

}
