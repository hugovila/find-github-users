/*global document, console */

var GithubUsers = (function () {

    var xmlHttp = null;
    var BASEURL = 'https://api.github.com/search/users?q=';
    var USERSTOSHOW = 16;

    var _showSeachResult = function (info) {
        //'use strict';
        this.info = info;
        var countSearchResult = this.info.total_count;

        document.getElementById("items-found").innerHTML = countSearchResult;

        if (countSearchResult > USERSTOSHOW) {
            this.usersToShow = USERSTOSHOW;
        } else {
            this.usersToShow = countSearchResult;
        }
        var searchResult = document.getElementById("search-result"),
            resultUserInfo = document.getElementById("result-user-info"),
            i;

        searchResult.removeChild(resultUserInfo);

        var newResultUserInfo = document.createElement("div");
        newResultUserInfo.setAttribute('id', 'result-user-info');
        newResultUserInfo.setAttribute('class', "col-md-12 result-user-info");
        searchResult.appendChild(newResultUserInfo);

        var ulElement = document.createElement("ul");

        for (i = 0; i < this.usersToShow; i += 1) {
            var liElement = document.createElement("li");
            ulElement.appendChild(liElement);

            var userResult = document.createElement("div");
            userResult.setAttribute('class', 'user-result');

            var aElement = document.createElement("a");
            aElement.setAttribute('href', this.info.items[i].html_url);

            var imgElement = document.createElement("img");
            imgElement.setAttribute('id', this.info.items[i].login);
            imgElement.setAttribute('alt', 'Identicon');
            imgElement.setAttribute('src', this.info.items[i].avatar_url);

            var pElement = document.createElement("p");

            var userLogin = document.createTextNode(this.info.items[i].login.slice(0, 14));

            pElement.appendChild(userLogin);

            aElement.appendChild(imgElement);
            userResult.appendChild(aElement);
            userResult.appendChild(pElement);
            liElement.appendChild(userResult);
        }
        newResultUserInfo.appendChild(ulElement);
    };

    var _urlToSearch = function (user) {
        _httpGet(BASEURL + user + '+in:fullname');
    };

    var _triggerNormalizer = function (user) {
        this.user = user;
        if (this.user.length >= 3) {
            _urlToSearch(this.user);
        }
    };

    var _eventInputNormalizer = function (event) {
        var user = event.target.value;
        _triggerNormalizer(user);
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
            var info = JSON.parse(xmlHttp.responseText);

            _showSeachResult(info);

            document.getElementById("raw-items-found").value = info.total_count;
            document.getElementById("raw-result").value = xmlHttp.responseText;
            }
        }
    };

    var initialize = function () {
        userSearchOnChange = document.getElementById('github-user-onchange');
        userSearchOnChange.addEventListener('change', _eventInputNormalizer, false);
        userSearchOnInput = document.getElementById('github-user-oninput');
        userSearchOnInput.addEventListener('input', _eventInputNormalizer, false);
        console.log("Initialize: Ok");
    };

    return {
        initialize: initialize
    };

})();
