var table = document.getElementById("inv");

var request = new XMLHttpRequest();
request.open("GET", "../data.json");
request.onload = function () {
    var data = JSON.parse(request.responseText);
    append_json(data);
};
request.send();

function append_json(data) {
    data.forEach(function (object) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + object.name + "</td>" +
            "<td>" + object.desc + "</td>" +
            "<td>R$" + (object.price).toFixed(2) + "</td>" +
            "<td>" + object.category + "</td>" +
            "<td>" + "<button onclick='deleteItem()'>" + "Delete" + "</button>" + "</td>";
        table.appendChild(tr);
    });
}

function addItem() {
    var tr = document.createElement("tr");
    tr.innerHTML = "<form>" +
        "<td>" + "<input type='text' name='name'\>" + "</td>" +
        "<td>" + "<textarea name='desc'>" + "</textarea>" + "</td>" +
        "<td>R$" + "<input type='number' name='price' min='0.00' step='0.01'\>" + "</td>" +
        "<td>" + "<select>" + "<option value='book'>Book</option>" + "<option value='food'>Food</option>" + "<option value='furniture'>Furniture</option>" + "<option value='vehicle'>Vehicle</option>" + "<option value='eletronic'>Eletronic</option>" + "</select>" + "</td>" +
        "<td>" + "<button onclick='saveItem()'>" + "Save" + "</button>" + "<button onclick='cancelItem(this)'>" + "Cancel" + "</button>" + "</td>" +
        "</form>";
    table.appendChild(tr);
}

function saveItem() {
    //store the form data in data.json
}

function deleteItem(o) {
    //remove delete the information from data.json, then cancel it
    cancelItem(o);
}

function cancelItem(o) {
    //remove the current table row
    var p = o.parentNode.parentNode;
    p.parentNode.removeChild(p);
}