var table = document.getElementById("inv");
var howManyItems = 0;
var addingItem = false;

var request = new XMLHttpRequest();
request.open("GET", "../data.json");
request.onload = function () {
    var data = JSON.parse(request.responseText);
    append_json(data);
};
request.send();

function append_json(data) {
    data.forEach(function (object) {
        howManyItems += 1;
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + object.name + "</td>" +
            "<td>" + object.desc + "</td>" +
            "<td>R$" + (object.price).toFixed(2) + "</td>" +
            "<td>" + object.category + "</td>" +
            "<td>" + "</button>" + "<button class='buttons' onclick='editItem()'>" + "Edit" + "</button>" + "<button class='buttons' onclick='deleteItem()'>" + "Delete" + "</td>"
        table.appendChild(tr);
    });
}

function addItem() {
    if(!addingItem){
        var tr = document.createElement("tr");
        tr.innerHTML = "<form class='input-form" + howManyItems + "'>" +
            "<td>" + "<input type='text' name='name'\>" + "</td>" +
            "<td>" + "<textarea name='desc'>" + "</textarea>" + "</td>" +
            "<td>R$" + "<input type='number' name='price' min='0.00' step='0.01'>" + "</td>" +
            "<td>" + "<select>" + "<option value='book'>Book</option>" + "<option value='food'>Food</option>" + "<option value='furniture'>Furniture</option>" + "<option value='vehicle'>Vehicle</option>" + "<option value='eletronic'>Eletronic</option>" + "</select>" + "</td>" +
            "<td>" + "<button class='buttons' onclick='saveItem()'>" + "Save" + "</button>" + "<button class='buttons' onclick='cancelItem(this)'>" + "Cancel" + "</button>" + "</td>" +
            "</form>";
        table.appendChild(tr);
        howManyItems += 1;
        addingItem = true;
    }
}

function saveItem() {
    //store the form data in data.json
    var obj = {};
    for (var i = 0; i < 4; ++i) {
        var formData = document.getElementsByClassName('input-form')[whole_number].value;
        obj[i] = value;
    }
    console.log(obj);
    return JSON.stringify(obj);
    toJSONString(formData);
}

function deleteItem(o) {
    //remove delete the information from data.json, then cancel it
    cancelItem(o);
}

function cancelItem(o) {
    //remove the current table row
    if(addingItem){
        var p = o.parentNode.parentNode;
        p.parentNode.removeChild(p);
        howManyItems -= 1;
        addingItem = false;
    }
}

function toJSONString(form) {
    var obj = {};
    var elements = form.item(0);
    console.log(element);
    /*for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if (name) {
            obj[name] = value;
        }
    }*/
    console.log(obj);
    return JSON.stringify(obj);
}