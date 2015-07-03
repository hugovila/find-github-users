/*global document, console */
var xmlHttp = null;
var baseUrl = 'https://api.github.com/search/users?q=';
var USERSTOSHOW = 10;

function showSeachResult(info) {
    //'use strict';
    this.info = info;
    if (info.total_count > USERSTOSHOW) {
        this.usersToShow = USERSTOSHOW;
    } else {
        this.usersToShow = info.total_count;
    }
    var searchResult = document.getElementById("search-result"),
        resultUserInfo = document.getElementById("result-user-info"),
        i;

    searchResult.removeChild(resultUserInfo);

    // Crear nodo de tipo Element
    var newResultUserInfo = document.createElement("div");
    newResultUserInfo.setAttribute('id', 'result-user-info');
    newResultUserInfo.setAttribute('class', "col-md-12 result-user-info");
    searchResult.appendChild(newResultUserInfo);
    // searchResult.replaceChild(resultUserInfo, newResultUserInfo);

    var ulElement = document.createElement("ul");
    var ilElement = document.createElement("il");
    ulElement.appendChild(ilElement);
    newResultUserInfo.appendChild(ulElement);
    for (i = 0; i < this.usersToShow; i += 1) {
        var userResult = document.createElement("div");
        userResult.setAttribute('class', 'user-result');

        var imgElement = document.createElement("img");
        console.log(this.info);
        imgElement.setAttribute('src', this.info.items[i].avatar_url);

        var pElement = document.createElement("p");

        // Crear nodo de tipo Text
        console.log(this.info);
        var userLogin = document.createTextNode(this.info.items[i].login);

        // Añadir el nodo Text como hijo del nodo Element
        pElement.appendChild(userLogin);

        // Añadir el nodo Element como hijo del elemento padre
        userResult.appendChild(imgElement);
        userResult.appendChild(pElement);
        ilElement.appendChild(userResult);
    }
}

function eventInputSearch(event) {
    console.log(event.target.value);
    httpGet(baseUrl + event.target.value);
}

function httpGet(theUrl) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = ProcessRequest;
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function ProcessRequest() {
if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) {
    if (xmlHttp.responseText == "Not found") {
        document.getElementById("items-found").value = "Not found";
        document.getElementById("raw-result").value = "";
    } else {
        var info = eval ( "(" + xmlHttp.responseText + ")" );

        showSeachResult(info);

        document.getElementById("items-found").value = info.total_count;
        document.getElementById("raw-result").value = xmlHttp.responseText;
        }
    }
}

function initialize() {
    userSearchOnChange = document.getElementById('github-user-onchange');
    userSearchOnChange.addEventListener('change', eventInputSearch, false);
    userSearchOnInput = document.getElementById('github-user-oninput');
    userSearchOnInput.addEventListener('input', eventInputSearch, false);
    console.log("Initialize: Ok");
}
