import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-http-page',
  templateUrl: './http-page.component.html',
  styleUrls: ['./http-page.component.scss']
})
export class HttpPageComponent implements OnInit {
  posts: any[] = [];
  newPost = { title: '', body: '' };
  updateMode = false;
  selectedPostId: number | null = null;
  errorMessage = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.httpService.getPosts().subscribe({
      next: (data) => this.posts = data.slice(0, 10), // limit display
      error: (err) => this.errorMessage = err.message
    });
  }

  submitPost() {
    if (this.updateMode) {
      this.httpService.updatePost({ id: this.selectedPostId, ...this.newPost }).subscribe({
        next: () => {
          alert('Post updated!');
          this.resetForm();
          this.loadPosts();
        },
        error: (err) => this.errorMessage = err.message
      });
    } else {
      this.httpService.addPost(this.newPost).subscribe({
        next: () => {
          alert('Post created!');
          this.resetForm();
          this.loadPosts();
        },
        error: (err) => this.errorMessage = err.message
      });
    }
  }

  edit(post: any) {
    this.updateMode = true;
    this.selectedPostId = post.id;
    this.newPost = { title: post.title, body: post.body };
  }

  delete(id: number) {
    if (confirm('Delete this post?')) {
      this.httpService.deletePost(id).subscribe({
        next: () => {
          alert('Post deleted!');
          this.loadPosts();
        },
        error: (err) => this.errorMessage = err.message
      });
    }
  }

  resetForm() {
    this.newPost = { title: '', body: '' };
    this.updateMode = false;
    this.selectedPostId = null;
  }
}
