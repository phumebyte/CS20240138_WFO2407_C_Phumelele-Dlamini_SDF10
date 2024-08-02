//Database setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref , push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

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
})

onValue(shoppingListInDB, function(snapshot) {

    //fixing database snapshot bug, we use an if statement 
    
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val()) // converting the items object into an array
        //calling the function that will clear the list
        clearShoppingListEl()

        //for loop to iterate over items in array
        for(let i=0; i<itemsArray.length; i++){

            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

        //appends items added by appendItemToShoppingListEl to array so that they show up on the list 
        appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here yet. . ."
    }

})

function clearShoppingListEl() {
        //clear shopping list off items
        shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {  //strictly clears input field when item has been added to list
    inputFieldEl.value = " "
}

function appendItemToShoppingListEl(item) {  // adds item values to list
    //seperating item key and item value so its easier to delete item using ID 
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    //function that cherry picks the ID of the clicked item to make it easier to remove
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`) // creating a variable that reaches inside the database to pick the id of the item inside the shopping list folder
        // function that removes clicked item
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}
