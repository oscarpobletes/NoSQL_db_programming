//ÓSCAR POBLETE SÁENZ

//Create db and collection
use quizzes
var n_col=db.col

//Create documents
var doc1={ "_id": 1, "quizzes": [ 10, 6, 7 ], "labs": [ 5, 8 ], "final": 80, "midterm": 75 }
var doc2={ "_id": 2, "quizzes": [ 9, 10 ], "labs": [ 8, 8 ], "final": 95, "midterm": 80 }
var doc3={ "_id": 3, "quizzes": [ 4, 5, 5 ], "labs": [ 6, 5 ], "final": 78, "midterm": 70}

//Insert documents into db (We could also do it with an insertMany([]) )
n_col.insertOne(doc1)
n_col.insertOne(doc2)
n_col.insertOne(doc3)

//Using the $max operator in a $project stage to calculate the maximum values ​​of the quizzes, of the laboratories and the maximum value between the final exam and the mid-term exam.
n_col.aggregate([{$project:{_id:1,maxQuizzes:{$max:"$quizzes"},maxLabs:{$max:"$labs"},maxMT_FE:{$max:["$final","$midterm"]}}}])
