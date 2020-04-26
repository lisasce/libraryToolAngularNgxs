import { Component, OnInit } from '@angular/core';
import {SetCategory} from '../actions/book.action';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  setCategory(category: string) {
  	this.store.dispatch(new SetCategory(category));
  }

}
