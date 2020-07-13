const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/getPlates', (req, res)=>{
    res.send(readFromFile());
});
router.post('/savePlate', (req, res)=>{
    let plates = readFromFile();
    const exists = checkIfExists(plates, req.body);
    res.writeHead(200, {
        'Content-Type': 'application/json'
      });
    if(exists){
        saveToFile(plates, req.body);
        plates = readFromFile();
        res.end(JSON.stringify({response:"Success", data : plates}));
    } else{
        res.end(JSON.stringify({response:"Failed", data : null}));
    }
   
});
router.post('/editPlate', (req, res)=>{
    let plates = readFromFile();
    res.writeHead(200, {
        'Content-Type': 'application/json'
      });
    let status = updateRecord(plates, req.body.old, req.body.new);
    if(status){
        res.end(JSON.stringify({response:"Success"}));
    }else{
        res.end(JSON.stringify({response:"Failed"}));
    }
});
router.post('/deletePlate', (req, res)=>{
    let plates = readFromFile();
    res.writeHead(200, {
        'Content-Type': 'application/json'
      });
    deleteFromFile(plates, req.body);
    res.end(JSON.stringify({response:"Success"}));
});
const readFromFile = ()=>{
    let data = fs.readFileSync('plates.json');  
    data = JSON.parse(data);
    data.sort(compare);
    return data;
};
const saveToFile = (plates, plate)=>{
    let saved = [...plates, plate];
    fs.writeFileSync('plates.json', JSON.stringify(saved),(err)=> {console.log(err);});
}
const checkIfExists = (plates, plate)=>{
    let index = plates.findIndex(x=>x.plateNumber === plate.plateNumber);
    if(index > -1){
        return false;
    }else {
        return true;
    }
}
const deleteFromFile = (plates, plate) =>{
    let deleted = plates.filter(x=>x.plateNumber !== plate.plateNumber);
    fs.writeFileSync('plates.json', JSON.stringify(deleted),(err)=> {console.log(err);});
}
const updateRecord = (plates, oldPlate, newPlate) =>{
    let index = plates.findIndex(x=>x.plateNumber === oldPlate.plateNumber);
    if(index === -1){
        return false;
    }else{
        plates[index].name = newPlate.name;
        plates[index].plateNumber = newPlate.plateNumber;
        fs.writeFileSync('plates.json', JSON.stringify(plates),(err)=> {console.log(err);});
        return true;
    }
}
module.exports = router;

function compare(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
  
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }