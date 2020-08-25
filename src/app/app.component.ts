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

  ngOnInit() {
    this.fetchPosts();
  }

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
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http.get('https://angular-udemy-c0ab4.firebaseio.com/posts.json')
    .subscribe((data)=>{
      console.log(data);
    })
  }

}
//requirement firebase is create folder.json in line 20, posts.json
//postData is req.body, http req we have to subscribe otherwise wont happen sent
//u dont need unsubscribe,observale dont need to manage it,its done after complete any way
