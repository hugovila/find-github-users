
    var xmlHttp = null;
    var baseUrl = 'https://api.github.com/search/users?q=';

    function showSeachResult(info) {
        this.info = info;
        var searchResult = document.getElementById("search-result");
        var resultUserInfo = document.getElementById("result-user-info");

        searchResult.removeChild(resultUserInfo);

        // Crear nodo de tipo Element
        var newResultUserInfo = document.createElement("div");
        newResultUserInfo.setAttribute('id', 'result-user-info');
        newResultUserInfo.setAttribute('class', "col-md-12 user-info");
        searchResult.appendChild(newResultUserInfo);
        // searchResult.replaceChild(resultUserInfo, newResultUserInfo);
        for (var i=0; i < 5; i += 1) {
            var parrafo = document.createElement("p");
            parrafo.setAttribute('class', 'rslt');
            var image = document.createElement("img");
            image.setAttribute('src', this.info.items[i].avatar_url);
            image.style.maxWidth = "64px";

            // Crear nodo de tipo Text
            var contenido = document.createTextNode(this.info.items[i].login);

            // Añadir el nodo Text como hijo del nodo Element
            parrafo.appendChild(contenido);

            // Añadir el nodo Element como hijo de la pagina
            newResultUserInfo.appendChild(parrafo);
            newResultUserInfo.appendChild(image);
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

    function initialize(name) {
        userSearchOnChange = document.getElementById('github-user-onchange');
        userSearchOnChange.addEventListener('change', eventInputSearch, false);
        userSearchOnInput = document.getElementById('github-user-oninput');
        userSearchOnInput.addEventListener('input', eventInputSearch, false);
        console.log("Initialize: Ok");
    }
