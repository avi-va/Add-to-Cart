import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-9b03b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingList = document.getElementById('shopping-list')

onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()

        for(let i=0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            appendItemToShoppingList(currentItem)
        }
    } else {
        shoppingList.innerHTML = "No items here....yet!"
    }
})

addButtonEl.addEventListener("click", function(){

    let inputValue = inputFieldEl.value 
    if (inputValue === "") {
        return;
    }

    push(shoppingListInDB, inputValue)
    clearInputFieldEl();
    //appendItemToShoppingList(inputValue);

    

});

function clearShoppingList(){
    shoppingList.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToShoppingList(item) {

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){

        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingList.append(newEl)
    //shoppingList.innerHTML += `<li>${itemValue}</li>`;
    
}
