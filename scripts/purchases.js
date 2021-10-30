$(document).ready(function () {
    getPurchases();

    $("#nav-client").click(function () {
        getPurchases();
    })
});

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