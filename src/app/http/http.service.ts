import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const API_URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(API_URL).pipe(catchError(this.handleError));
  }

  addPost(post: any): Observable<any> {
    return this.http.post(API_URL, post).pipe(catchError(this.handleError));
  }

  updatePost(post: any): Observable<any> {
    return this.http.put(`${API_URL}/${post.id}`, post).pipe(catchError(this.handleError));
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}