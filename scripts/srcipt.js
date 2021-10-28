const HOST = "localhost";
const PORT = 8090;
const API = "/api";

const ENPOINT_CLIENTS = "/clients";
const ENPOINT_PERSONAL_CLIENTS = "/personal";
const ENPOINT_BUSINESS_CLIENTS = "/business";
const ENPOINT_ITEMS = "/items";
const ENPOINT_PURCHASES = "/purchases";


$(document).ready(function () {

    var sections = $("#content").children();
    sections.hide();

    $("li").click(function () {
        sections.hide();
    })

    $("#nav-client").click(function () {
        getClients();
        $("#content-clients").show();
    })

    $("#nav-items").click(function () {
        getItems();
        $("#content-items").show();
    })

    $("#nav-purchases").click(function () {
        getPurchases();
        $("#content-purchases").show();
    })

    $("#nav-buy").click(function () {
        resolveClientChoice();
        resolveItemSelect();
        $("#content-buy").show();
    })

    $("#purchase-button").click(function () {
        makeNewPurchase();
    });

});

function getClients() {
    const endpoint = `http://${HOST}:${PORT}${API}${ENPOINT_CLIENTS}`;

    $.ajax({
        "type": "GET",
        "url": endpoint,
        "success": function (response) {
            $("#client-table").find(".row").remove();
            $.each(response, function (i, client) {
                $("#client-table").append(createClientTable(client));
            });
        }
    })
}

function createClientTable(client) {
    var clientName = resolveClientName(client)

    return `<tr class="row">
                    <td>${clientName}</td>
                    <td>${client.organization}</td>
                    <td>${client.address}</td>
                    <td>${client.phone}</td>
                    <td>${client.id}</td>
                </tr>`;
}

function getItems() {
    const endpoint = `http://${HOST}:${PORT}${API}${ENPOINT_ITEMS}`;

    $.ajax({
        "type": "GET",
        "url": endpoint,
        "success": function (response) {
            $("#item-table").find(".row").remove();
            $.each(response, function (i, item) {
                $("#item-table").append(createItemTable(item));
            });
        }
    })
}

function createItemTable(item) {
    return `<tr class="row">
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.categories}</td>
                    <td>${item.id}</td>
                </tr>`;
}

function getPurchases() {
    const endpoint = `http://${HOST}:${PORT}${API}${ENPOINT_PURCHASES}`;

    $.ajax({
        "type": "GET",
        "url": endpoint,
        "success": function (response) {
            $("#purchasе-table").find(".row").remove();
            $.each(response.content, function (i, purchase) {
                $("#purchasе-table").append(createPurchaseTable(purchase));
            });
        }
    })
}

function createPurchaseTable(purchase) {

    var itemNames = $.map(purchase.items, function (item, i) {
        return item.name;
    });

    var clientName = resolveClientName(purchase.client)


    return `<tr class="row">
                    <td>${clientName}</td>
                    <td>${purchase.totalPayedAmount}</td>
                    <td>${purchase.purchaseTime}</td>
                    <td>${itemNames}</td>
                    <td>${purchase.id}</td>
                </tr>`;
}

function resolveClientName(client) {
    if (client.organization) {
        return client.organizationName;
    } else {
        return client.firstName + " " + client.lastName;
    }
}


function resolveClientChoice() {

    $("#client-select").empty();

    const endpoint = `http://${HOST}:${PORT}${API}${ENPOINT_CLIENTS}`;

    $.ajax({
        "type": "GET",
        "url": endpoint,
        "success": function (response) {
            $.each(response, function (i, client) {
                $("#client-select").append(`<option value="${client.id}">${resolveClientName(client)}</option>`);
            });
        }
    })

}

function resolveItemSelect() {

    $("#checkbox-select").empty();

    const endpoint = `http://${HOST}:${PORT}${API}${ENPOINT_ITEMS}`;

    $.ajax({
        "type": "GET",
        "url": endpoint,
        "success": function (response) {
            $.each(response, function (i, item) {

                var checkboxInputOption =
                    `<input type="checkbox" id="item-checkbox-${i}" class="item-choice" value="${item.id}">
                <label >${item.name}</label>
                <span>for</span>
                <label for="item-checkbox-${i}" class="item-price" value="${item.price}">${item.price}</label></br>`

                $("#checkbox-select").append(checkboxInputOption);
            });

            $('.item-choice').click(function () {
                calculateTotal();
            })
        }
    })

}

function calculateTotal() {
    var checkedBoxes = $('input:checked')


    var individualSums = $.map(checkedBoxes, function (obj, i) {
        var checkboxId = obj.id;
        var numberValue = $("label[for=" + checkboxId + "]").attr("value");
        return parseFloat(numberValue);
    });

    var tatalSum = 0
    $.each(individualSums, function () { tatalSum += parseFloat(this) || 0; });

    $('#total-price').text(tatalSum.toFixed(2));
}

function makeNewPurchase() {
    var selectedBoxes = $("#checkbox-select > input:checked")
    var selectedItemIds = $.map(selectedBoxes, function (obj, i) {
        return obj.value;
    });

    var totalMoneyAmount = $('#total-price').text();

    var clientId = $('#client-select').find(":selected").val();

    const endpoint = `http://${HOST}:${PORT}${API}${ENPOINT_PURCHASES}`;

    $.ajax({
        "url": endpoint,
        "method": "POST",
        "dataType": 'json',
        "contentType": "application/json; charset=utf-8",
        "data": JSON.stringify({
            "totalPayedAmount": totalMoneyAmount,
            "clientId": clientId,
            "purchaseTime": new Date(Date.now()).toISOString(),
            "itemIds": selectedItemIds
        }),
        "success": function (response) {
        }
    })
}

// var selectedItemIds = $.map(selectedBoxes, function (obj, i) {
//     return obj.value;
// });

// var selectedCheckbox = $.map(selectedBoxes, function (obj, i) {
//     return obj.id;
// });

// var selectedBoxes = $("#checkbox-select > input:checked");
