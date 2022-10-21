//ÓSCAR POBLETE SÁENZ
//Aggregations
//Using the addFields stage... adds a field without modifying the database
use video
var movie=db.getCollection("movieDetails")
//$avg= average
var addFields={addFields:{average:{$avg:["$imdb.rating","$tomato.rating"]}}}
var project={$project:{_id:0,"$average":1}}
movie.aggregate([addFields,project])

//Bucket categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries and outputs a document per each bucket.
var bucket={$bucket: {
      groupBy: "$runtime",
      //set the bounds closed from the left and open from the right
      boundaries: [ 45, 100, 150,200 ],
      //you can put a string of values ​​for those that do not fall into a category
      default: "Greater than 200",
      output: {
        count: { $sum: 1 },
        movies : { $push:{"title":"$title","duration":"$runtime" }}
      }
    }
}
movie.aggregate([bucket])

//BucketAuto, boundaries are automatically determined in an attempt to evenly distribute the documents into the specified number of buckets.
var bucket_auto={
    $bucketAuto: {
          groupBy: "$year",
          buckets: 5,
          // what we want to get
          output:{
              count:{$sum:1},
              movies:{$push:{"title":"$title","year":"$year"}}
          }
        }
}
movie.aggregate([bucket_auto])

//Another aggregation to find movies with duration greater than 190 minutes
movie.find({"runtime":{$gt:190}}).count()
//Another way to do the above
var match={$match:{"runtime":{$gt:190}}}
var cou={$count:"Films of more than 190 minutes"}
movie.aggregate([match,cou])
