const books=["book1","book2","book3"]

function addBooks(){
    if (process.argv[2]==="print"){
     console.log(books);
    }else{
        console.log("try again");
    }
}
addBooks();
