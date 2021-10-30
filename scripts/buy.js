$(document).ready(function () {

    resolveClientChoice();
    resolveItemSelect();

    $("#nav-buy").click(function () {
        resolveClientChoice();
        resolveItemSelect();
    })

    $("#purchase-button").click(function () {
        makeNewPurchase();
    });

});

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
                    `<label class="item-checkbox-container">
                        <label>${item.name}</label>
                        <span>for</span>
                        <label for="item-checkbox-${i}" class="item-price" value="${item.price}">${item.price}</label>
                        <input type="checkbox" id="item-checkbox-${i}" class="item-choice" value="${item.id}">
                        <span class="checkmark"></span>
                    </label>`

                $("#checkbox-select").append(checkboxInputOption);
            });

            $('.item-choice').click(function () {
                calculateTotal();
            })
        }
    })

}

function calculateTotal() {
    var checkedBoxes = $('input:checked');

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
    var totalMoneyAmount = $('#total-price').text();
    var clientId = $('#client-select').find(":selected").val();
    var checkedBoxes = $('input:checked');
    var selectedItemIds = $.map(checkedBoxes, function (obj, i) {
        return obj.value;
    });

    console.log(selectedItemIds);
    console.log(totalMoneyAmount);
    console.log(clientId);

    const endpoint = `http://${HOST}:${PORT}${API}${ENPOINT_PURCHASES}`;

    var requestBody = JSON.stringify({
        "totalPayedAmount": totalMoneyAmount,
        "clientId": clientId,
        "purchaseTime": new Date(Date.now()).toISOString(),
        "itemIds": selectedItemIds
    })

    $.ajax({
        "url": endpoint,
        "method": "POST",
        "dataType": 'json',
        "contentType": "application/json; charset=utf-8",
        "data": requestBody,
        "success": function (response) {
            console.log(selectedItemIds);
            console.log(totalMoneyAmount);
            console.log(clientId);

            alert("Created new purchase");
        }
    })
}

function resolveClientName(client) {
    if (client.organization) {
        return client.organizationName;
    } else {
        return client.firstName + " " + client.lastName;
    }
}