//ÓSCAR POBLETE SÁENZ
use b_exercise
var list=db.getCollectionNames()
print(list)
const books =db.getCollection("books")
const companies =db.getCollection("companies")
//Books and companies are references to the respective collections of the exercise database
print("BOOKS COUNT:",books.count())
print("COMPANIES COUNT",companies.count())

//Make queries with predicates and functions
var pred1={"pageCount":{'$gt':300}} //book with pages greater than 300
var pred2={"pageCount":{'$eq':300}} // book with 300 exact pages
var pred3={"pageCount":{'$in':[300]}} 
var disp={'title':1,pageCount:1,'authors':1,_id:0} //Display title and number of pages without id

//Print a result that matches the query
print("\nFIRST SEARCH:")
print(books.findOne(pred1,disp)) // function that returns the query with the predicate

//Another way to throw the search is converting it into a variable
var resultSet=books.find(pred3).projection(disp)
var array=resultSet.toArray()
print("\nSECOND SEARCH:")
print(array[0])


//Iterate the cursor and check if there are more documents
while(resultSet.hasNext()){
    print(resultSet.next())
}



