// book class : represents a book 

class Book {
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;

    }


}













//ui class : handles ui tasks


class UI{

    // we make all of them static methods because we will use then directly by class it's self not the objects of it 
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book))
    }

    static addBookToList(book){
        const list=document.getElementById('book-list')
        const row=document.createElement('tr');

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
        `;

        list.appendChild(row)
    }


    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }

    }





    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    

}




//store class : handles storage 

class Store{


   static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];

        }else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books
    }



  static  addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }





   static removeBook(isbn){
        let books=Store.getBooks();
       let newBooks=books.filter(book=>book.isbn!==isbn)
        localStorage.setItem('books',JSON.stringify(newBooks))
    }


}















//event : display books
document.addEventListener('DOMContentLoaded',UI.displayBooks)







//event: add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    //get form values

    let title=document.querySelector('#title').value;
    let author=document.querySelector('#author').value;
    let isbn=document.querySelector('#isbn').value;
        e.preventDefault();


        let alert=document.querySelector('.alert');
        //validation 
        if(title==='' || author==='' || isbn===''){
           
            alert.innerHTML='<h6>you should fill all input field</h6>'
            alert.classList.add('bg-danger')
            alert.classList.remove('bg-success');
          
           
        }else{
              //create a new book object 
            alert.innerHTML='<h6>Book Added Successfully</h6>'
            alert.classList.remove('bg-danger')
            alert.classList.add('bg-success');

 
    const book=new Book(title,author,isbn);
     
    

     //add it to ui 
 
     UI.addBookToList(book);


     //add it to local  storage

    Store.addBook(book)
 
     //clear fields
 
     UI.clearFields()

        }

      
    

   
    
})








//event :remove a book

document.querySelector('#book-list').addEventListener('click',(e)=>{

//remove it from store 


 Store.removeBook(e.target.parentElement.previousElementSibling.textContent)




    //remove it from ui

    UI.deleteBook(e.target);

    
})