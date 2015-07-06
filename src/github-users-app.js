/*global document, console */

var GithubUsers = (function () {

    var xmlHttp = null;
    var baseUrl = 'https://api.github.com/search/users?q=';
    var USERSTOSHOW = 10;

    var _showSeachResult = function (info) {
        //'use strict';
        this.info = info;

        document.getElementById("items-found").innerHTML = info.total_count;

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
            imgElement.setAttribute('alt', 'Identicon');
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
    };

    var _eventInputSearch = function (event) {
        console.log(event.target.value);
        if (event.target.value.length >= 3) {
            _httpGet(baseUrl + event.target.value);
        }
    };

    var _httpGet = function (theUrl) {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = _ProcessRequest;
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    };

    var _ProcessRequest = function () {
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) {
        if (xmlHttp.responseText == "Not found") {
            document.getElementById("raw-items-found").value = "Not found";
            document.getElementById("raw-result").value = "";
        } else {
            var info = eval ( "(" + xmlHttp.responseText + ")" );

            _showSeachResult(info);

            document.getElementById("raw-items-found").value = info.total_count;
            document.getElementById("raw-result").value = xmlHttp.responseText;
            }
        }
    };

    var initialize = function () {
        userSearchOnChange = document.getElementById('github-user-onchange');
        userSearchOnChange.addEventListener('change', _eventInputSearch, false);
        userSearchOnInput = document.getElementById('github-user-oninput');
        userSearchOnInput.addEventListener('input', _eventInputSearch, false);
        console.log("Initialize: Ok");
    };

    return {
        initialize: initialize
    };

})();
