var db = new PouchDB('inventoryItems');
var remoteCouch = false;

var table = document.getElementById("inv");
var addingItem = false;

showProducts();

db.changes({
    since: 'now',
    live: true
}).on('change', showProducts);

function showProducts() {
    $("table tr").remove();
    var trow = document.createElement("tr");
    trow.className = "tags";
    trow.innerHTML = "<td>Name</td>" +
        "<td>Description</td>" +
        "<td>Price</td>" +
        "<td>Category</td>" +
        "<td>Options</td>"
    table.appendChild(trow);
    db.allDocs({
        include_docs: true,
        descending: false
    }, function (err, doc) {
        //redrawTodosUI(doc.rows);
        doc.rows.forEach(function (object) {
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>" + object.doc.name + "</td>" +
                "<td>" + object.doc.desc + "</td>" +
                "<td>R$" + object.doc.price + "</td>" +
                "<td>" + object.doc.category + "</td>";
            var td = document.createElement('td');
            var btn = document.createElement('button');
            btn.innerHTML = "Delete";
            btn.type = "button";
            btn.className = "buttons";
            btn.onclick = (function (object) {
                return function () {
                    deleteItem(object.doc);
                }
            })(object);
            td.appendChild(btn);
            tr.appendChild(td);
            table.appendChild(tr);
        });
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
            "<td>" + "<button class='buttons' onclick='saveItem(this)'>" + "Save" + "</button>" + "<button class='buttons' onclick='cancelItem(this)'>" + "Cancel" + "</button>" + "</td>" +
            "</form>";
        table.appendChild(tr);
        addingItem = true;
    }
}

function saveItem(o) {
    //store the form data in the database
    var formName = document.getElementsByName('name')[0].value;
    var formDesc = document.getElementsByName('desc')[0].value;
    var formPrice = parseFloat(document.getElementsByName('price')[0].value).toFixed(2);
    var formCategory = document.getElementsByName('category')[0].value;
    var obj = {
        _id: new Date().toISOString(),
        name: formName,
        desc: formDesc,
        price: formPrice,
        category: formCategory
    };
    cancelItem(o);
    db.put(obj).then(function (result) {
        console.log('Successfully added an item!');
        console.log(result);
    }).catch(function (err) {
        console.log('Something went wrong, item not added');
        console.log(err);
    });
}

function deleteItem(o) {
    //remove it from the database
    console.log(o);
    db.remove(o);
}

function cancelItem(o) {
    //remove the current table row
    if (addingItem) {
        var p = o.parentNode.parentNode;
        p.parentNode.removeChild(p);
        addingItem = false;
    }
}