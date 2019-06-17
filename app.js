const express = require('express');
const app =  express();
const port = 4000;
var fs = require('fs');

var qaurkcmSelectedCategories = require('./assets/tomtop-categories.json'); // this is are the selected categories that should be there
var qaurkcmCategories = require('./assets/quarkscm-categories.json'); 
var newtest = require('./assets/new-test.json'); // this is are quarkscm categories

var array = qaurkcmCategories.data;




// this loop is for  removing the childerns which we dont want in my case all the removing of the children 
// was done at the level 3 that is why i have dobne in two forloops
for (let i = 0; i < newtest.length; i++) {
    for (let j = 0; j < newtest[i].children.length; j++) {       
        newtest[i].children[j].children = newtest[i].children[j].children.filter((obj1)=>{
            return qaurkcmSelectedCategories.some((obj2)=>{
                return obj1._id == obj2.Quark_id;
            }); 
        });        
    }
}

var data = newtest;

//  for  writing any files 
fs.writeFile("./assets/new-filter.json", JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});

//  this function is for making nested array of objects from array of objects
function list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i]._id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }   
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parent_id !== 0){
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parent_id]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}



app.listen(port,()=>{
    console.log('listening on the port '+ port);
})