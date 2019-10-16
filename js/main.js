var db = new PouchDB('inventoryItems');
var remoteCouch = false;

var table = document.getElementById("inv");
var howManyItems = 0;
var addingItem = false;

/*var request = new XMLHttpRequest();
request.open("GET", "../data.json");
request.onload = function () {
    var data = JSON.parse(request.responseText);
    append_json(data);
};
request.send();*/

/*function append_json(data) {
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
}*/

function showProducts(){
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    redrawTodosUI(doc.rows);
  });
}

function addItem() {
    if (!addingItem) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<form class='input-form'>" +
            "<td>" + "<input type='text' name='name'\>" + "</td>" +
            "<td>" + "<textarea name='desc'>" + "</textarea>" + "</td>" +
            "<td>R$" + "<input type='number' name='price' min='0.00' step='0.01'>" + "</td>" +
            "<td>" + "<select name='category'>" + "<option value='book'>Book</option>" + "<option value='food'>Food</option>" + "<option value='furniture'>Furniture</option>" + "<option value='vehicle'>Vehicle</option>" + "<option value='eletronic'>Eletronic</option>" + "</select>" + "</td>" +
            "<td>" + "<button class='buttons' onclick='saveItem()'>" + "Save" + "</button>" + "<button class='buttons' onclick='cancelItem(this)'>" + "Cancel" + "</button>" + "</td>" +
            "</form>";
        table.appendChild(tr);
        howManyItems += 1;
        addingItem = true;
    }
}

function saveItem() {
    //store the form data in data.json
    var formName = document.getElementsByName('name')[0].value;
    var formDesc = document.getElementsByName('desc')[0].value;
    var formPrice = document.getElementsByName('price')[0].value;
    var formCategory = document.getElementsByName('category')[0].value;
    /*var obj = '{' +
        '"name" : ' + formName + ',' +
        '"desc"  : ' + formDesc + ',' +
        '"price" : ' + formPrice + ',' +
        '"category" : ' + formCategory + ',' +
        '}';*/
    var obj = {
        _id: new Date().toISOString(),
        name: formName,
        desc: formDesc,
        price: formPrice,
        category: formCategory
        };
    db.put(obj).then(function(result){
        console.log('Successfully add an item!');
        console.log(result);
    }).catch(function(err){        
        console.log('Something went wrong, item not added');
        console.log(err);
    });
}

function deleteItem(o) {
    //remove delete the information from data.json, then cancel it
    cancelItem(o);
}

function cancelItem(o) {
    //remove the current table row
    if (addingItem) {
        var p = o.parentNode.parentNode;
        p.parentNode.removeChild(p);
        howManyItems -= 1;
        addingItem = false;
    }
}