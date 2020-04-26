import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from './models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  fetchBooks() {
    return this.http.get<Book[]>('https://jsonplaceholder.typicode.com/Books');
  }

  deleteBook(id: number) {
    return this.http.delete('https://jsonplaceholder.typicode.com/Books/' + id);
  }

  addBook(payload: Book) {
    return this.http.post<Book>('https://jsonplaceholder.typicode.com/Books', payload);
  }

  updateBook(payload: Book, id: number) {
    return this.http.put<Book>('https://jsonplaceholder.typicode.com/Books/' + id, payload);
  }
}
