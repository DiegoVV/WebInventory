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
            "<td>" + object.price + "</td>" +
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
        "<td>" + "<input type='text' name='name'\>" + "</td>" +
        "<td>" + "<input type='text' name='name'\>" + "</td>" +
        "<td>" + "<button onclick='saveItem()'>" + "Save" + "</button>" + "<button onclick='cancelItem()'>" + "Cancel" + "</button>" + "</td>" +
        "</form>";
    table.appendChild(tr);
}