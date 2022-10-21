//ÓSCAR POBLETE SÁENZ
use video
var details=db.getCollection("movieDetails")
var doc=details.findOne({})
print("DOCUMENT:")
print(doc)
var attributes=Object.keys(doc)
print("\nATTRIBUTES:")
print(attributes)
//find 10 titles of movies directed by Steven Spielberg
details.find({director:"Steven Spielberg"},{title:1,_id:0}).limit(10)
//count of the movies that have a year
details.find({year:{$exists:true}},{title:1,_id:0}).count()
 
