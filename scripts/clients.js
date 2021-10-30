$(document).ready(function () {
    getClients();

    $("#nav-client").click(function () {
        getClients();
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

function resolveClientName(client) {
    if (client.organization) {
        return client.organizationName;
    } else {
        return client.firstName + " " + client.lastName;
    }
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