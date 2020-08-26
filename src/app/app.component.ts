import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts : Post [] = [];
  isFetching= false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    //console.log(postData);
    // Send Http request
   this.http
      .post<{ name: string }>('https://angular-udemy-c0ab4.firebaseio.com/posts.json', postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>('https://angular-udemy-c0ab4.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      for(const key in responseData){
        if (responseData.hasOwnProperty(key)) {
        postsArray.push({...responseData[key], id: key });
        }
      }
      return postsArray;
    }))
    .subscribe((datas)=>{
      this.isFetching = false;
      this.loadedPosts = datas;
    })
  }//responseData type{ [key: string]: Post } line44

}

//pipe funnel multiple data before reach subscribe()
//requirement firebase is create folder.json in line 20, posts.json
//postData is req.body, http req we have to subscribe otherwise wont happen sent
//u dont need unsubscribe,observale dont need to manage it,its done after complete any way
