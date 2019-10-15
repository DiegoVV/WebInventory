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
            "<td>" + object.category + "</td>";
        table.appendChild(tr);
    });
}