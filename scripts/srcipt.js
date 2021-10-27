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