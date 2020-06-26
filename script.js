class Book {
  constructor(id, title, author, published, copies ) {
    this.id  = id
    this.title = title
    this.author = author
    this.published = published
    this.copies = copies
    this.copiesInLibrary = copies
    this.issued = false
    this.userDetails = []
    this.dueDate = ''
  }
  
  issueThisBook(user){
    this.userDetails.push(user)
    const TODAY = new Date()
    this.dueDate = new Date(TODAY.setDate(TODAY.getDate() + 10)).toDateString()
    this.copiesInLibrary -= 1
    return {title: this.title, id: this.id}
  }
}

class User {
  constructor(id, name){
    this.id = id
    this.name = name
    this.booksInHand = []
  }
  
  update(book){
    this.booksInHand.push(book)
  }
}


const bookArr = [
    {
      "id": "9781593275846",
      "title": "Eloquent JavaScript, Second Edition",
      "author": "Marijn Haverbeke",
      "published": "2014-12-14T00:00:00.000Z",
      "copies": 4
    },
    {
      "id": "9781449331818",
      "title": "Learning JavaScript Design Patterns",
      "subtitle": "A JavaScript and jQuery Developer's Guide",
      "author": "Addy Osmani",
      "published": "2012-07-01T00:00:00.000Z",
            "copies": 4
    },
    {
      "id": "9781449365035",
      "title": "Speaking JavaScript",
      "subtitle": "An In-Depth Guide for Programmers",
      "author": "Axel Rauschmayer",
      "published": "2014-02-01T00:00:00.000Z",
            "copies": 4
    },
    {
      "id": "9781491950296",
      "title": "Programming JavaScript Applications",
      "subtitle": "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
      "author": "Eric Elliott",
      "published": "2014-07-01T00:00:00.000Z",
      "copies": 8
    },
    {
      "id": "9781593277574",
      "title": "Understanding ECMAScript 6",
      "subtitle": "The Definitive Guide for JavaScript Developers",
      "author": "Nicholas C. Zakas",
      "published": "2016-09-03T00:00:00.000Z",
      "copies": 3,
    },
    {
      "id": "9781491904244",
      "title": "You Don't Know JS",
      "subtitle": "ES6 & Beyond",
      "author": "Kyle Simpson",
      "published": "2015-12-27T00:00:00.000Z",
      "copies": 3
    },
    {
      "id": "9781449325862",
      "title": "Git Pocket Guide",
      "subtitle": "A Working Introduction",
      "author": "Richard E. Silverman",
      "published": "2013-08-02T00:00:00.000Z",
      "copies": 1
    }
  ]


let userArr = [
  {id: 1,
   name: 'Anoop',
  }, {
    id: 2,
    name: 'Nabeel'
  }
]



let books = []
let users = []


function initializeBooks() {
  bookArr.map(book => books.push(new Book(book.id, book.title, book.author, book.published, book.copies)))
}



function initializeUsers() {
  userArr.map(user => users.push(new User(user.id, user.name)))
}




function issueBooksFromLibrary(id, userId) {
   let user
   let selectedBook = books.find((book)=> book.id === id)
   let selectedUser  = users.find((user)=> user.id === userId)
  
   
   if(!selectedUser)
    user = new User(1, 'Anoop');  //will take this details from user
   else {
     let isValidUser = validateUser(selectedUser.booksInHand, selectedBook.id)
     if(isValidUser) {
       user = selectedUser
     }
   }
    
  
  if(user.id){
   let bookDetails = selectedBook.issueThisBook(user)
   user.update(bookDetails)
   users.push(user)
  }
     
   
}

function validateUser(booksInHand, bookId) {
 
  if(booksInHand.length === 0)
      return true
  if(booksInHand.length >= 3)
      return false
  if(booksInHand.length < 3){
    let isBookExist = booksInHand.find((book)=> book.id === bookId)
    if(isBookExist)
       return false
     else{
       return true
     }
  }
}


initializeBooks()
initializeUsers()

issueBooksFromLibrary("9781449325862", 1)

// console.log(users)
console.log(books[6])













