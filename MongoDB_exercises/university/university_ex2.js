/*ADVANCED DATABASES
  Anahuac University North Campus
  Teacher: Barbaro Ferro Castro
  Students: Oscar Poblete Saenz
            Julieta Garcia
  Delivery date: 05/16/22 */
  
/*FIRST STEP:
   The relational database in SQL language was converted to a non-relational database
   with JSON objects and NoSQL language in order to manipulate the data through mongo,
   document-oriented database system. The main differences between relational databases (SQL)
   and non-relational (NoSQL) are found in performance, storage, and scalability.
   
  - Performance: NoSQL databases offer higher performance than SQL
                 (they need less hardware resources).
  - Storage: SQL databases are suitable when the amount of data is not too large,
                    while NoSQL are ideal for handling large volumes of data.
  - Scalability: NoSQL databases are scalable and can easily increase their capacity
                   while SQL can be scalable, but with a higher economic cost.
   */
use university
/*SECOND-STEP:
  A modification of the database and its collections was made through aggregation stages such as lookup, unwind and project
  agglomerated in a pipeline in order to gather, interpret and visualize the content of the database
  more precisely, clearly and intuitively.
  
  The elaborated model was made through groupings with the objective of separately displaying the instructor's data,
  the subject he teaches and the student he advises in a particular way.
  */
var pipeline = [
    {
        $lookup: {
            from: 'teaches',
            localField: 'ID',
            foreignField: 'ID',
            as: 'teaches'
        }
    },{
        $unwind: {
            path: '$teaches'
        }
    },{
        $lookup: {
            from: 'takes',
            localField: 'teaches.course_id',
            foreignField: 'course_id',
            as: 'takes'
        }
    },{
        $lookup: {
            from: 'student',
            localField: 'takes.ID',
            foreignField: 'ID',
            as: 'student'

        }
    },{
        $lookup: {
            from: 'course',
            localField: 'teaches.course_id',
            foreignField: 'course_id',
            as: 'course'
        }
    },{
        $lookup: {
            from: 'classroom',
            localField: 'section.sec_id',
            foreignField: 'sec_id',
            as: 'classroom'
        }
        
    },{
        $project: {
            _id: '$name',
            Salary:{$toString:'$salary'},
            Subject: {
                Title: {$arrayElemAt: ['$course.title',0]},
                Department:{$arrayElemAt:['$course.dept_name',0]},
                Classroom:{$arrayElemAt:['$classroom.room_number',0]},
                Building:{$arrayElemAt:['$classroom.building',0]},
                Credits: {$toString: {$arrayElemAt: ['$course.credits',0]}}
                },
                
            Student: {
                Name: {$arrayElemAt: ['$student.name',0]},
                Grade: {$arrayElemAt: ['$takes.grade',0]},
                
            File: {
                ID:{$arrayElemAt:['$student.id',0]},
                Period: {$arrayElemAt: ['$takes.semester',0]},
                Year: {$toString: {$arrayElemAt: ['$takes.year',0]}},
                Faculty: {$arrayElemAt: ['$student.dept_name',0]},
                Progress: {$toString: {$arrayElemAt: ['$student.tot_cred',0]}}
                },
            },
        }
    }
    ]
    db.instructor.aggregate(pipeline).pretty()
/*THIRD STEP:
    Useful and relevant information on the database began to be obtained through structured queries with aggregation stages
    in such a way that the results help us to analyze the behavior of the data it contains.
    */
    
    //1. Display the name and salary of the professors who work in the biology department
    //$match allows us to filter the documents we need and $project helps us select the information to display
    //pretty configures the cursor to display results in a format that is easy to read.
    db.instructor.aggregate([
    { $match : { dept_name: 'Biology'}
    { $project : { _id : '$name', salary: 1}
    ]).pretty()
    
//2. Display the number of students (documents) in each department
    //with $group we can perform all the aggregation or summary queries we need, such as finding counts, totals, averages or maximums.
    db.student.aggregate([
   { $group : { _id : '$dept_name', students : { $sum : 1 } } 
   }]).pretty()
    
//3. Display the information of the courses that belong to the history department and store the data in a new collection
    //the $unwind stage allows us to work with the values ​​of the fields inside an array and $out creates the collection with the obtained data
    db.course.aggregate([
    { $match : { dept_name : 'History' } },
    { $unwind : '$course_id'}
    { $out : 'History_dept' }
    ])
    db.History_dept.find().pretty()
    
//4. Display in descending order the year, building name and room number of the classes that have been taught in the spring.
    //$sort helps us to display the information in the order we want, either ascending, descending or by metadata
    db.section.aggregate([
   { $match : { semester: 'Spring' } },
   { $unwind : '$sec_id' },
   { $project : { _id : '$semester', year : 1,building : 1, room_number:1} },
   { $sort : { year : -1 } }
   ]).pretty()
   
//5. Putting the stages into a pipeline variable, display the minimum and maximum budgets for the buildings.
   //the pipeline concept helps us to perceive the aggregation stages as a process that the data goes through to reach the final state.
   //in this case the aggregations $min are used to determine minimums and $max for maximums.
   var pipeline=[{$sort: {budget:1}},{$group : {_id: 'Budgets', maxBuget: {$max: '$budget'}, minBudget: {$min:'$budget'}}}]
   db.department.aggregate(pipeline)
    
//6. Order from highest to lowest the number of qualifications of the 'takes' collection and make a count of each of them
   //$sortByCount is a shortcut for grouping, counting, and then sorting in descending order the number of different values ​​in a field.
    db.takes.aggregate([
    { $sortByCount: "$grade" }
    ] ).pretty()

//7. Search from the 'classroom' collection the information of the rooms in each building, with their respective numbering, capacity and generated id
   //with $lookup we can shape our documents the way we need
    db.classroom.aggregate( [
   { $lookup: { 
   from: "classroom",
   localField: "building",
   foreignField: "building",
   as: "classroom"}
  }
  ]).pretty()

//8. Create a facet where the 'section' collection is categorized by the 'building' attribute
  //and order with the account of the rooms that are in that building
  db.section.aggregate( [
  {
    $facet: {
      "categorizedByBuilding": [
        { $unwind: "$year" },
        { $sortByCount: "$building" }
      ]}
  }
  ]).pretty()
  
//9. Use $addFields to add a field to a 'course' collection called 'class mode'
  db.course.aggregate([

  { $addFields : { modalidad_clase : 'presencial'} },
 
  ]).pretty()

 
//10. Use '$count', to make a count of the students who have their career with an advance in credits of 90 or more ('passing_credits')
db.student.aggregate(
        [
            {
                $match: {
                    tot_cred: {
                        $gt: 90
                    }
                }
            },
            {
                $count: "passing_credits"
            }
        ]
    ) .pretty()

/*CONCLUSION:
    Within the studies and knowledge of a systems engineer, databases are essential, since thanks to them you can
    carry out the grouping, transmission, reception and monitoring of information that users provide when browsing our systems.
    Likewise, it is important to know the alternatives and functions offered by these systems, whether relational or non-relational.
    In this case, the management of the database was done through the NoSQL language with the help of MongoDB to facilitate the analysis of the more than
    30k data converted to objects and thus also be able to practice the aggregation stages offered by the tool.
    Finally, it is important to highlight that the data, being more and more, migrate towards new technologies and tools that offer better performance,
    performance, storage, and scalability, so it's important to keep up to date.
    */

    