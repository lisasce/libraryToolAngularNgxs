import { Component, OnInit } from '@angular/core';
import  {BookState} from '../states/book.state';
import {Select, Store} from '@ngxs/store';
import {Book} from '../models/Book';
import {Observable} from 'rxjs';
import {DeleteBook, GetBooks, SetSelectedBook} from '../actions/book.action';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Select(BookState.getBookList) books: Observable<Book[]>;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetBooks());
  }
  deleteBook(bookId: number) {
    this.store.dispatch(new DeleteBook(bookId));
  }
  editBook(payload: Book) {
    this.store.dispatch(new SetSelectedBook(payload));
  }
}
