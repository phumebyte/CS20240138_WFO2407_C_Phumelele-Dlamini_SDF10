//Database setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref , push} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

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

function clearInputFieldEl() {
    inputFieldEl.value = " "
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerText += '<li>${itemValue}</li>'
}
