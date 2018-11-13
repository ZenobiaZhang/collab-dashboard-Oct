window.onload = replace;
//cmd+opt+J
function replace() {
    const Http = new XMLHttpRequest();
    const parser = new DOMParser();
    Http.open("GET", "https://collab.its.virginia.edu/portal");
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var document = parser.parseFromString(Http.responseText, "text/html")
            toHome(document);
        }
    }
}
function toHome(document) {
    //only one semester
    for (var i = 0; i < document.getElementsByClassName("fav-title ").length; i ++){
        var toCourse = document.getElementsByClassName("fav-title")[i].innerHTML.match(/href="([^"]*)/)[1]
        toAssignment(toCourse)
    }
}
function toAssignment(toCourse) {
    const Http = new XMLHttpRequest();
    const parser = new DOMParser();
    Http.open("GET", toCourse);
    Http.send();
    Http.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            var docu = parser.parseFromString(Http.responseText, "text/html")
            var toAssign = docu.querySelector('[title="Assignments "]').href;
            Http.open("GET", toAssign);
            Http.send();
            Http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var document = parser.parseFromString(Http.responseText, "text/html")
                    scraping(document);
                }
            }
        }
    }
}

function scraping(document) {
    var dueT = document.getElementsByTagName("td");
    var dueCol = [];
    var j = 0;
    for (var i = 0; i < dueT.length / 5; i++) {
        var temp = dueT[i * 5 + 4].innerText;
        var stnd = new Date(temp);
        if (Date.parse(stnd) < Date.parse(Date())) {
        }
        else {
            dueCol[j] = {title: "", status: "", openDate: "", dueDate: ""};
            dueCol[j].title = dueT[i * 5 + 1].innerText.trim();
            dueCol[j].status = dueT[i * 5 + 2].innerText.trim();
            dueCol[j].openDate = dueT[i * 5 + 3].innerText.trim();
            dueCol[j].dueDate = dueT[i * 5 + 4].innerText.trim();
            j = j + 1;
        }
    }
    console.log(dueCol);
    $('#Assignment1_Name').html(dueCol[0]["title"]);
    /*
    scrape all the assignment from 5 subjects and store it in the same var
    send this var to the tabulator
    **/
}

function callback(body) {
    return body[0]["title"];
}
