const Items_container = document.getElementById("items");
const Item_template = document.getElementById("itemTemplate");
const Add_button = document.getElementById("add");

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

function refreshList() {

    Items_container.innerHTML = "";

    for (const item of items) {
        const itemElement = Item_template.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedCheckbox = itemElement.querySelector(".item-completed");
        


        descriptionInput.value = item.description;
        completedCheckbox.checked = item.completed;
        Items_container.append(itemElement);
    }
}

Add_button.addEventListener("click", () => {
    addItem();

});

refreshList();


