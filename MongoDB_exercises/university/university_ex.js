//ÓSCAR POBLETE SÁENZ
use university
//Checking content
//Instructors
print("INSTRUCTOR:")
let temp=db.instructor.find({},{_id:0,"name":1}).toArray()
let instr=[]
    for(let i=0;i<temp.length;i++){
        instr.push(temp[i].name)
    }
    print(instr)

//Departaments
print("\nDEPARTAMENT:")
let temp1=db.instructor.find({},{_id:0,"dept_name":1}).toArray()
let dep=[]
    for(let i=0;i<temp.length;i++){
        dep.push(temp1[i].dept_name)
    }
    print(dep)
   
//Buildinga
print("\nBUILDING:")
let temp2
let building=[]
for(let i=0;i<dep.length;i++){
    temp2=db.department.findOne({dept_name:dep[i]},{_id:0,"building":1})
    building.push(temp.building)
}
print(building)

//All
print("\nALL:")
let newer=[]
for(let i=0;i<dep.length;i++){
    newer.push("Instructor: "+instr[i]+" || Works in: "+dep[i]+" || Building: "+building[i])
}
print(newer)