import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

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
    return this.http
    .get<{ [key: string]: Post }>('https://angular-udemy-c0ab4.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      for(const key in responseData){
        if (responseData.hasOwnProperty(key)) {
        postsArray.push({...responseData[key], id: key });
        }
      }
      return postsArray;
    }));
  }

  deleteposts(){
    return this.http.delete('https://angular-udemy-c0ab4.firebaseio.com/posts.json')
  }
  //return no subscribe, we can do it in component

}


//in fetchPosts we remove subscribe in service instead we subscribe in our appcomponent
  //responseData type{ [key: string]: Post } line44
