//ÓSCAR POBLETE SÁENZ
use books
//Check content of random doc
var key=Object.keys(db.books.findOne())
print(key)
//Find and sort books with an established limit
db.books.find({})
   .projection({})
   .sort({_id:-1})
   .limit(100)
   
   var books=db.getCollection("books")
   //Keep the ones that have a title
   var title_exists={title:{"$exists":true}}
   var cursor=books.find(title_exists)
   //Count 
   print(cursor.count())
   print(books.count())