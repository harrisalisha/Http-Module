import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts : Post [] = [];
  isFetching= false;
  error = null;
  private errorSub = new Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts(). subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error =>{
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createAndStorePost( postData.title, postData.content);

  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
        this.error = error.message;
        //console.log(error);
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deleteposts().subscribe(() => {
      this.loadedPosts = [];//reset
    });
  }//u have to subscribe other wise won't happen

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

}

