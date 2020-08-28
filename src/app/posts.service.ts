import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();//subject call next()

  constructor(private http: HttpClient){}

  //method
  createAndStorePost(title: string, content: string){
    const postData : Post = {title: title, content: content};
    this.http
    .post<{ name: string }>('https://angular-udemy-c0ab4.firebaseio.com/posts.json', postData)
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts(){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('Custom', 'key');
    return this.http
    .get<{ [key: string]: Post }>(
      'https://angular-udemy-c0ab4.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-header': 'Hello'}),
        params : searchParams
        //params: new HttpParams().set('print', 'pretty')
      }
      )
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      for(const key in responseData){
        if (responseData.hasOwnProperty(key)) {
        postsArray.push({...responseData[key], id: key });
        }
      }
      return postsArray;
    }),
    catchError(errorRes => {
      //send to analytics server
      return throwError(errorRes);
    })
    );
  }

  deleteposts(){
    return this.http.delete('https://angular-udemy-c0ab4.firebaseio.com/posts.json')
  }
  //return no subscribe, we can do it in component

}


//in fetchPosts we remove subscribe in service instead we subscribe in our appcomponent
  //responseData type{ [key: string]: Post } line44
