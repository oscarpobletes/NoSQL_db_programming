//ÓSCAR POBLETE SÁENZ 16/02/2022

//We use the video database and the details collection again
use video
var details=db.getCollection("movieDetails")

//We create a document that includes a findOne to know the keys and attributes
var doc=details.findOne()
var keys=Object.keys(doc) 

//Print keys
print("KEYS:")
print(keys) 

//First we know what is in rated
var v_Rated=details.distinct('rated')

//Then we print the content of rated
print("RATED:")
print(v_Rated)

//Using aggregation, toUpper, group and $sum to display rated uppercase, lowercase, combined.
details.aggregate([{$project:{"rated":{$toUpper:"$rated"}}},{$group:{_id:"$rated","movies":{$sum:1}}}])




