import { Component, OnInit } from '@angular/core';
import {SetCategory} from '../actions/book.action';
import {Select, Store} from '@ngxs/store';
import  {BookState} from '../states/book.state';
import {Observable} from 'rxjs';
import {Book} from '../models/Book';
import * as $ from "jquery";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Select(BookState.getBookList) books: Observable<Book[]>;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  setCategory() {
  	let category = event.currentTarget["value"];
  	if(category === "all"){
  		$("tbody tr").show();
  	} else {
  		$("tbody tr").hide();
  		$("tbody tr[data-cat=" + category + "]").show();
  	}
  }
}
