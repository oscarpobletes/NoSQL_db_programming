//ÓSCAR POBLETE SÁENZ
use video 
//Aggregation operations
var details=db.getCollection("movieDetails")
//Show the length of distinct (amount) of tomato meter
details.distinct("tomato.meter").length
//Show the length of distinct (amount) of imdb ratings
details.distinct("imdb.rating").length
//Show the distinct imdb ratings of the collection
details.distinct("imdb.rating")
//Show the distinct genres of the collection
details.distinct("genres")
//Make aggregation with pipeline
var match={"$match":{"awards.wins":{"$gt":5}}}
var project={"$project":{"awards.wins":1,_id:0}}
var pipeline=[match,project]
//Show results (movies with number of awards wins greater than 5)
details.aggregate(pipeline)
