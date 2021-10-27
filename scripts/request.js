const HOST = "localhost";
const PORT = 8090;
const API = "/api";

const ENPOINT_CLIENTS = "/clients";
const ENPOINT_PERSONAL_CLIENTS = "/personal";
const ENPOINT_BUSINESS_CLIENTS = "/business";
const ENPOINT_ITEMS = "/items";
const ENPOINT_PURCHASES = "/purchases";

const HEADER_AUTHORIZATION = "Authorization";
const HEADER_AUTHORIZATION_PREFIX = "Bearer ";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMzQ1IiwibmFtZSI6Ikl2YW4gSXZhbm92IiwiZW1haWwiOiJpLml2YW5vdkBleGFtcGxlLmNvbSIsInN1YiI6ImphbmUiLCJqdGkiOiJlM2ZlNDY2OS1kZjkwLTRlNzItYWEwOS1jOGMzYWE4N2UyZmEiLCJpYXQiOjE2MzUwMDU1MTQsImV4cCI6MTYzNjMwMTUxNH0.wKYxOJzchLTIH9oUCOs89MzmJC3-GhBcvhbArb_yxm8";

function getClients() {
    const endpoint = `http://${HOST}:${PORT}${API}${ENPOINT_CLIENTS}`;

    console.log(endpoint);

    var settings = {
        "url": endpoint,
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) {
        return response;
    });
}