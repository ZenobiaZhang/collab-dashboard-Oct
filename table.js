$("#example-table").tabulator({
  columns:[
    {title:"Assignment Name", field:"title", sortable:true, width:200},
    {title:"Class", field:"class", sortable:true},
    {title:"Due Date", field:"dueDate", sortable:true},
    {title:"Date Posted", field:"openDate", sortable:true},
    {title:"Calendar", field:"calendar"},
    //{title:"Done", field:"done", editable:true, editor:"tick"},
  ],
});

$("#example-table").tabulator("setData", dueCol);
