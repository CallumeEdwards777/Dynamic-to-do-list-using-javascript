const Items_container = document.getElementById("items");
const Item_template = document.getElementById("itemTemplate");
const Add_button = document.getElementById("add");
const Delete_button = document.getElementById("delete");

let items= getItems();

function getItems() {
    const value = localStorage.getItem("todo");

    return JSON.parse(value) || [];
}

function setItems(items) {
    const itemsJson = JSON.stringify(items);
    localStorage.setItem("todo", itemsJson);
}

function addItem() {
    items.unshift({
        description: "",
        completed: false
    }); 

    setItems(items);
    refreshList();
}

function deleteItem() {
    items.pop();
    setItems(items);
    refreshList();
}

function  updateItem(item, key, value) {
    item[key] = value;
     if (key === "completed") {
        items.sort((a, b) => a.completed - b.completed);
        refreshList();
    }

    setItems(items);
}


function refreshList() {

    Items_container.innerHTML = "";

    for (const item of items) {
        const itemElement = Item_template.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedCheckbox = itemElement.querySelector(".item-completed");
        


        descriptionInput.value = item.description;
        completedCheckbox.checked = item.completed;
        
        descriptionInput.addEventListener("input", (event) => {
            updateItem(item, "description", descriptionInput.value);
        })

       completedCheckbox.addEventListener("input", (event) => {
            updateItem(item, "completed", completedCheckbox.checked);
        })
        
        Items_container.append(itemElement);
    }
}

Add_button.addEventListener("click", () => {
    addItem();

});

Delete_button.addEventListener("click", () => {
   deleteItem();
});



refreshList();


