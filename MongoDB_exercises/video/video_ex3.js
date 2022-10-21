//ÓSCAR POBLETE SÁENZ

use video
var md=db.getCollection("movieDetails")
var doc=md.findOne()
var keys=Object.keys(doc) 

//Print keys and doc
print("DOC")
print(doc)
print("KEYS")
print(keys) 

//Get using the $group and $count stages of the aggregation framework, the number of different values ​​of the
//tomato.reviews field from the movieDetails collection.
var pipeline=[{"$group":{"_id":"$tomato.reviews"}},{"$count":"reviews"}]
md.aggregate(pipeline)
//Get a projection with the name of the movie and the number of writers of it from all the movies in the movieDetails collection.
var pipeline2=[{"$project":{"_id":0,"title":1,"writers":{"$size":"$writers"}}}]
md.aggregate(pipeline2)
