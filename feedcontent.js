window.onload = replace;
var tabledata = [];
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
    var className = document.getElementsByClassName("Mrphs-sitesNav__menuitem  is-selected ")[0].innerText.trim();
    var dueT = document.getElementsByTagName("td");
    var dueCol = [];
    var j = 0;
    for (var i = 0; i < dueT.length / 5; i++) {
        var temp = dueT[i * 5 + 4].innerText;
        var stnd = new Date(temp);
        if (Date.parse(stnd) < Date.parse(Date())) {
        }
        else {
            dueCol.push({title: "", class: "", openDate: "", dueDate: ""});
            dueCol[j].title = dueT[i * 5 + 1].innerText.trim();
            dueCol[j].class = className;
            dueCol[j].openDate = dueT[i * 5 + 3].innerText.trim();
            dueCol[j].dueDate = dueT[i * 5 + 4].innerText.trim();
            j = j + 1;
        }
    }
    Array.prototype.push.apply(tabledata, dueCol);
    $('#Assignment1_Name').html(tabledata[0]["title"]);
    $('#Assignment1_Class').html(tabledata[0]["class"]);
    $('#Assignment1_Due').html(tabledata[0]["dueDate"]);
    $('#Assignment1_Posted').html(tabledata[0]["openDate"]);
    $('#Assignment2_Name').html(tabledata[1]["title"]);
    $('#Assignment2_Class').html(tabledata[1]["class"]);
    $('#Assignment2_Due').html(tabledata[1]["dueDate"]);
    $('#Assignment2_Posted').html(tabledata[1]["openDate"]);
    $('#Assignment3_Name').html(tabledata[2]["title"]);
    $('#Assignment3_Class').html(tabledata[2]["class"]);
    $('#Assignment3_Due').html(tabledata[2]["dueDate"]);
    $('#Assignment3_Posted').html(tabledata[2]["openDate"]);
    //how to delete original new assignment???

    var table = new Tabulator("#example-table", {
        height:200, // set height of table to enable virtual DOM
        data:tabledata, //load initial data into table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[
          {title:"Assignment Name", field:"title", sortable:true, width:200},
          {title:"Class", field:"class", sortable:true},
          {title:"Due Date", field:"dueDate", sortable:true},
          {title:"Date Posted", field:"openDate", sortable:true},
          {title:"Calendar", field:"calendar"},
          //{title:"Done", field:"done", editable:true, editor:"tick"},
        ],
          rowClick:function(e, id, data, row){ //trigger an alert message when the row is clicked
            alert("Row " + id + " Clicked!!!!");
          },
      });
}
    /*
    TODO: send var "tabledata" to the tabulator
    (which contains unfinished assignments from 
        all courses in one array of objects)
    **/
console.log(tabledata);

