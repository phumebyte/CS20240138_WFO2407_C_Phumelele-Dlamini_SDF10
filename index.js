//Database setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref , push, onValue} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

const appSettings = {
    databaseURL : "https://realtime-database-709f4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// connects our app to firebase
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// fetching document elements from html
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

    appendItemToShoppingListEl(inputValue)
    
})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val()) // converting the items object into an array
    console.log(itemsArray)  
    //for loop to iterate over items in array
    for(let i=0; i<itemsArray.length; i++){
       //appends items added by appendItemToShoppingListEl to array so that they show up on the list 
       appendItemToShoppingListEl(itemsArray[i])
    }
    

})

function clearInputFieldEl() {  //strictly clears input field when item has been added to list
    inputFieldEl.value = " "
}

function appendItemToShoppingListEl(itemValue) {  // adds item values to list
    shoppingListEl.innerText += '<li>${itemValue}</li>'
}
