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
  isLoading = false;
  toastMessage = '';


  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    //this.posts.unshift({ id: Date.now(), ...this.newPost });
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.httpService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 10); // limit display
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  // submitPost() {
  // if (this.isLoading) return;
  // this.isLoading = true;
  // this.errorMessage = '';

  // if (this.updateMode) {
  //   this.httpService.updatePost({ id: this.selectedPostId, ...this.newPost }).subscribe({
  //     next: () => {
  //       if (this.updateMode) {
  //       const index = this.posts.findIndex(p => p.id === this.selectedPostId);
  //         if (index !== -1) {
  //         this.posts[index] = { id: this.selectedPostId, ...this.newPost };
  //      }
  //       this.showToast('Post updated successfully!');
  //     } else {
  //       //this.posts.unshift({ id: Date.now(), ...this.newPost });
  //       this.loadPosts();
  //       this.showToast('Post created successfully!');
  //     }
  //     this.isLoading = false;
  //     this.resetForm();
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.message;
  //       this.isLoading = false;
  //     }
  //   });
  // } else {
  //   this.httpService.addPost(this.newPost).subscribe({
  //     next: (res) => {
  //       this.posts.unshift({ id: Date.now(), ...this.newPost }); // simulate ID
  //       //this.loadPosts();
  //       this.isLoading = false;
  //       this.resetForm();
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.message;
  //       this.isLoading = false;
  //     }
  //   });
  //  }
  // }
submitPost() {
  if (this.isLoading) return;
  this.isLoading = true;
  this.errorMessage = '';

  if (this.updateMode) {
    this.httpService.updatePost({ id: this.selectedPostId, ...this.newPost }).subscribe({
      next: () => {
        const index = this.posts.findIndex(p => p.id === this.selectedPostId);
        if (index !== -1) {
          this.posts[index] = { id: this.selectedPostId, ...this.newPost };
        }
        this.isLoading = false;
        this.resetForm();
        this.showToast('Post updated successfully!');
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  } else {
    this.httpService.addPost(this.newPost).subscribe({
      next: (res) => {
        this.posts.unshift({ id: Date.now(), ...this.newPost }); // Simulate
        this.isLoading = false;
        this.resetForm();
        this.showToast('Post created successfully!'); // ✅ SHOW TOAST
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }
}

  edit(post: any) {
    this.updateMode = true;
    this.selectedPostId = post.id;
    this.newPost = { title: post.title, body: post.body };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  delete(id: number) {
  if (confirm('Are you sure you want to delete this post?')) {
    this.isLoading = true;
    this.httpService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p.id !== id);
        this.showToast('Post deleted successfully!');
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
   }
  }
  resetForm() {
    this.newPost = { title: '', body: '' };
    this.updateMode = false;
    this.selectedPostId = null;
  }
showToast(msg: string) {
  this.toastMessage = msg;
  setTimeout(() => this.toastMessage = '', 3000);
}
}
