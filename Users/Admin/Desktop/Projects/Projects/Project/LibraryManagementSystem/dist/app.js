"use strict";
//* // // // // // // // User class(base class to all members) // // // // // // // // 
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    displayInfo() {
        return `ID: ${this.id} and Name: ${this.name}`;
    }
}
//* // // // // // // //     Member class   // // // // // // // // 
class Member extends User {
    constructor(id, name) {
        super(id, name);
        this.borrowedBook = [];
    }
    borrowBook(bookTitle) {
        this.borrowedBook.push(bookTitle);
        console.log(`Member ${this.name} borrowed book: ${bookTitle}`);
    }
    returnBook(bookTitle) {
        let index = this.borrowedBook.indexOf(bookTitle);
        if (index > -1) {
            this.borrowedBook.splice(index, 1);
            console.log(`Member ${this.name} returned: ${bookTitle}`);
        }
        else {
            console.log(`Book ${bookTitle} was not borrowed by  member :${this.name}`);
        }
    }
    displayInfo() {
        return `${super.displayInfo()}, Borrowed Books: [${this.borrowedBook.join(', ')}]`;
    }
}
//* // // // // // // //     Librarian class   // // // // // // // // 
class Librarian extends User {
    constructor(id, name) {
        super(id, name);
        this.managedBooks = [];
    }
    addBooks(bookTitle) {
        this.managedBooks.push(bookTitle);
        console.log(`Librarian: ${this.name} added book: ${bookTitle}`);
    }
    removeBooks(bookTitle) {
        let index = this.managedBooks.indexOf(bookTitle);
        if (index > -1) {
            this.managedBooks.splice(index, 1);
            console.log(`Librarian: ${this.name} remove book: ${bookTitle}`);
        }
        else {
            console.log(`${bookTitle} is not in the library collection`);
        }
    }
    displayInfo() {
        return `${super.displayInfo()}, Managed Books: [${this.managedBooks.join(', ')}]`;
    }
}
//^ creating Instances for Member and librarian
const member1 = new Member(1, 'Achu');
const member2 = new Member(2, 'Charu');
const librarian = new Librarian(101, 'Mr.Eren');
//^ Librarian adding and removing Books
librarian.addBooks('One piece Amazon Lily');
librarian.addBooks('Mayavi');
librarian.addBooks('Game of Thrones');
librarian.addBooks('Harry Potter');
librarian.removeBooks('Mayavi');
librarian.addBooks('xyz');
//^ Members Borrowing and returning books
member1.borrowBook('One piece Amazon Lily');
member2.borrowBook('Game of Thrones');
member2.returnBook('Game of Thrones');
//^ show all the info about the Members and library 
console.log(member1.displayInfo());
console.log(member2.displayInfo());
console.log(librarian.displayInfo());
