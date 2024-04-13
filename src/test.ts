/* eslint-disable @typescript-eslint/no-unused-vars */
class LibraryItem {
  constructor(public id : number, public title: string, public isAvailable: boolean, public dueDate: string) {}
}

enum Genre {

}
class Book {
  constructor(public author: string, public year: number, public genre: )
}

class User {
  constructor(
    public id: number,
    public name: string,
    public lateFee: number,
    public checkOutItems: {}
  ) {}
}
