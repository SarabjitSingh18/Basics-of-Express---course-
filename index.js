//this file is a entry point file
//"type":"module" //we are using the type module you can see it in pakage.json
import express from 'express'

const app = express()
const port = 3001

//Middlewares-->>(use the middlewares to get the data from the frontend side)
app.use(express.json())

// LETS CREATE A CRUD APP USING EXPRESS AND POSTMAN TESTING-->
let teaData = []  //create a array to store all the received data from the frontend or re.body(json format)
let nextId = 1;    // create a simple id giver variable

//add a new tea 
app.post('/tea', (req, res) => {// creating  a  post request to add a tea in the teaData Array
    const { name, price } = req.body  // req.body from postman will provide us the data 
    const newTea = { id: nextId++, name, price }  /// we will provide the id by increasing a variable
    teaData.push(newTea)    //and in the last we will use the push method to push it into the Array
    res.status(201).send(newTea)  //providing the tea added as the response

})
// get all tea 
app.get('/tea', (req, res) => { //get request to get the all data from the array
    res.status(200).send(teaData)  
})

// get a tea with id
app.get('/tea/:id', (req, res) => {  // using the get request to find the  specific tea with the id provided to it
    const tea = teaData.find(t => t.id === parseInt(req.params.id))   // we are using the .find() method and comparing the t.id = parseInt(req.params.id) to confirm the id is correct that we are going to get

    if (!tea) { //using the if statement that if we donot find the tea send the message that "Tea not Found"
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)  //else send the tea

})
//update tea

app.put('/tea/:id',(req,res)=>{  //using the put request to overright the tea object 
//    const teaId=  req.params.id;
   const tea  = teaData.find(t=>t.id === parseInt(req.params.id)) //finding the tea to update it same as previously done
   if (!tea) { //if we donot find the tea then send the response "Tea not found"
    return res.status(404).send("Tea not Found")
   }
   const {name,price} = req.body // else get the new details that are needed to overight the previous values
   tea.name = name //overrighting tea.name = name
   tea.price = price//overrighting tea.price = price
   res.status(200).send(tea) //sending the tea as a response back
})

//delete tea-->

app.delete('/tea/:id',(req,res)=>{ //using the delete request to delete the specific tea with a given id
   const index =  teaData.findIndex(t=>t.id === parseInt(req.params.id)) //finding the index of tea by comparing as previously done
    if (index === -1) {   // as we know findIndex returns the element index if found else returns -1 handling the -1 situation with if statement
        return res.status(404).send('Tea not found')      // if not found then return the response "Tea not found"
    }
    teaData.splice(index,1)  //deleting the found index and only once by specifying 1 as second parameters
    return res.status(204).send('Deleted successfully') // sending the success response
})





//learnig creating routes--->>>>>

// app.get('/',function(req,res){
//     res.send('Hello Home Page ---Server Here!!')
// })
// app.get('/tea',(req,res)=>{
//     res.send("What type of tea do you want to drink sir")

// })
// app.get('/thanks',(req,res)=>{
//     res.send("Thanks for coming")
// })
// app.get('/profile',(req,res)=>{
//     res.send("This is your profile")
// })


//listening on port 3000
app.listen(port, () => {
    console.log(`Server is running at port : ${port}...`)
})