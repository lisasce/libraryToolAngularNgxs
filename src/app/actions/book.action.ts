import {Book} from '../models/Book';

export class AddBook {
  static readonly type = '[Book] Add';

  constructor(public payload: Book) {
  }
}

export class GetBook {
  static readonly type = '[Book] Get';
}

export class UpdateBook {
  static readonly type = '[Book] Update';

  constructor(public payload: Book, public BookId: number) {
  }
}

export class DeleteBook {
  static readonly type = '[Book] Delete';

  constructor(public BookId: number) {
  }
}

export class SetSelectedBook {
  static readonly type = '[Book] Set';

  constructor(public payload: Book) {
  }
}
