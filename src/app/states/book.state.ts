import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Book} from '../models/Book';
import {AddBook, DeleteBook, GetBooks, SetSelectedBook, UpdateBook, SetCategory } from '../actions/book.action';
import {tap} from 'rxjs/operators';

export class BookStateModel {
  books: Book[];
  selectedBook: Book;
  category: string
}

@State<BookStateModel>({
  name: 'books',
  defaults: {
    books: [{
      bookId: 1,
      bookTitle: "sample book",
      bookAuthor: "sample author",
      bookCategory: "thriller",
      finished: "To read"
    }],
    selectedBook: null,
    category: null
  }
})
export class BookState {

  constructor() {
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
    getBooks({getState, setState}: StateContext<BookStateModel>) {
        const state = getState();
        let filteredArray = state.books;
        if(state.category !== null) {
          filteredArray = filteredArray.filter(book => book.bookCategory === state.category);
        }
        setState({
            ...state,
            books: filteredArray
       });
    }

  @Action(AddBook)
  addBook({getState, patchState}: StateContext<BookStateModel>, {payload}: AddBook) {
    const state = getState();
    let currentMaxBookId = Math.max.apply(Math, state.books.map(function(book) { return book.bookId; }))
    payload.bookId = currentMaxBookId + 1;
    patchState({
      books: [...state.books, payload]
    });
  }

  @Action(UpdateBook)
  updateBook({getState, setState}: StateContext<BookStateModel>, {payload, bookId}: UpdateBook) {
    const state = getState();
    const bookList = [...state.books];
    const bookIndex = state.books.findIndex(item => item.bookId === bookId);
    bookList[bookIndex] = payload;
    setState({
        ...state,
        books: bookList,
    });
  }

  @Action(SetCategory)
  setCategory({getState, setState}: StateContext<BookStateModel>, {category}: SetCategory){
     setState({
       ...getState(),
       category: category
     });
  }

  @Action(DeleteBook)
  deleteBook({getState, setState}: StateContext<BookStateModel>, {bookId}: DeleteBook) {
    const state = getState();
    let filteredArray = state.books.filter(book => book.bookId !== bookId);
    setState({
      ...state,
      books: filteredArray
    })
  }

  @Action(SetSelectedBook)
  setSelectedBookId({getState, setState}: StateContext<BookStateModel>, {payload}: SetSelectedBook) {
    const state = getState();
    setState({
      ...state,
      selectedBook: payload
    });
  }
}
