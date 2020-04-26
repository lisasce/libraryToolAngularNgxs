import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {BookState} from '../states/book.state';
import {AddBook, SetSelectedBook, UpdateBook} from '../actions/book.action';
import {Observable, Subscription} from 'rxjs';
import {Book} from '../models/Book';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy  {
  @Select(BookState.getSelectedBook) selectedBook: Observable<Book>;
  bookForm: FormGroup;
  editBook = false;
  private formSubscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.formSubscription.add(
      this.selectedBook.subscribe(book => {
        if (book) {
          this.bookForm.patchValue({
            bookId: book.bookId,
            bookTitle: book.bookTitle,
            bookAuthor: book.bookAuthor,
            bookCategory: book.bookCategory,
            finished: book.finished
          });
          this.editBook = true;
        } else {
          this.editBook = false;
        }
      })
    );
  }

  createForm() {
    this.bookForm = this.fb.group({
      bookId: [''],
      bookTitle: ['', Validators.required],
      bookAuthor: ['', Validators.required],
      bookCategory: ['', Validators.required],
      finished: ['To read', Validators.required]
    });
  }

  onSubmit() {
    if (this.editBook) {
      this.formSubscription.add(
        this.store.dispatch(new UpdateBook(this.bookForm.value, this.bookForm.value.bookId)).subscribe(() => {
          this.clearForm();
        })
      );
    } else {
      this.formSubscription.add(
        this.store.dispatch(new AddBook(this.bookForm.value)).subscribe(() => {
          this.clearForm();
        })
      );
    }
  }

  clearForm() {
    this.bookForm.reset();
    this.store.dispatch(new SetSelectedBook(null));
  }

  ngOnDestroy(): void {
  }
}
