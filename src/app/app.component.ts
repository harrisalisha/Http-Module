import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    //console.log(postData);
    // Send Http request
   this.http
      .post('https://angular-udemy-c0ab4.firebaseio.com/posts.json', postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
//requirement firebase is create folder.json in line 20, posts.json
//postData is req.body, http req we have to subscribe otherwise wont happen sent
//u dont need unsubscribe,observale dont need to manage it,its done after complete any way
