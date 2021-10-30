$(document).ready(function () {
    getItems();

    $("#nav-client").click(function () {
        getItems();
    })
});

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