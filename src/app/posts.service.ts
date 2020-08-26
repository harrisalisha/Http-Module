import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient){}

  //method
  createAndStorePost(title: string, content: string){
    const postData : Post = {title: title, content: content};
    this.http
    .post<{ name: string }>('https://angular-udemy-c0ab4.firebaseio.com/posts.json', postData)
    .subscribe(responseData => {
      console.log(responseData);
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
    }))

  }
  //in fetchPosts we remove subscribe in service instead we subscribe in our appcomponent
  //responseData type{ [key: string]: Post } line44




}
