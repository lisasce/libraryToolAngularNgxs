import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Book} from '../models/Book';
import {AddBook, DeleteBook, GetBooks, SetSelectedBook, UpdateBook, FetchAllBook } from '../actions/book.action';
import {BookService} from '../book.service';
import {tap} from 'rxjs/operators';

export class BookStateModel {
  books: Book[];
  selectedBook: Book;
}

@State<BookStateModel>({
  name: 'books',
  defaults: {
    books: [],
    selectedBook: null
  }
})
export class BookState {

  constructor(private bookService: BookService) {
  }

  @Selector()
  static getBookList(state: BookStateModel) {
    return state.books;
  }

  @Selector()
  static getSelectedBook(state: BookStateModel) {
    return state.selectedBook;
  }

  @Action(GetBooks)
  getTodos({getState, setState}: StateContext<BookStateModel>) {
    return this.bookService.fetchBooks().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        books: result,
      });
    }));
  }

  @Action(AddBook)
  addTodo({getState, patchState}: StateContext<BookStateModel>, {payload}: AddBook) {
    return this.bookService.addBook(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        books: [...state.books, result]
      });
    }));
  }

  @Action(UpdateBook)
  updateTodo({getState, setState}: StateContext<BookStateModel>, {payload, bookId}: UpdateBook) {
    return this.bookService.updateBook(payload, bookId).pipe(tap((result) => {
      const state = getState();
      const bookList = [...state.books];
      const bookIndex = bookList.findIndex(item => item.bookId === bookId);
      bookList[bookIndex] = result;
      setState({
        ...state,
        books: bookList,
      });
    }));
  }


  @Action(DeleteBook)
  deleteTodo({getState, setState}: StateContext<BookStateModel>, {bookId}: DeleteBook) {
    return this.bookService.deleteBook(bookId).pipe(tap(() => {
      const state = getState();
      const filteredArray = state.books.filter(item => item.bookId !== bookId);
      setState({
        ...state,
        books: filteredArray,
      });
    }));
  }

  @Action(SetSelectedBook)
  setSelectedTodoId({getState, setState}: StateContext<BookStateModel>, {payload}: SetSelectedBook) {
    const state = getState();
    setState({
      ...state,
      selectedBook: payload
    });
  }
}
