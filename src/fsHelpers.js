const fs = require('fs');

function writeToFile(data, res) {
    fs.writeFile('data.json', JSON.stringify(data), function (err) {
        if (err) {
            res.status(500).send('Error occured while writing to file');
        } else {
            res.status(201).send('Data appended to file - data.json');
        }
    });
}

function deleteFile(fileName, res) {
    fs.stat(fileName, (err) => {
        if (err == null) {
            fs.unlink(fileName, (err) => {
                if (err) {
                    res.status(500).send('File could not be deleted');
                } else {
                    res.status(200).send('File deleted');
                }

            });
        }
        else if (err.code === 'ENOENT') {
            res.status(200).send('File already deleted; doesnt exist anymore');
        }
    })
}

function readFile(res){
    fs.readFile('data.json', (err, data) => {
        if(err){
            res.status(200).send('data.json file doesnt exist');
        }else{
            res.status(200).send(JSON.parse(data));
        }
    })
}

function updateData(id, name, age, res){
    var found = false;
    readData().then(response => {
        response.forEach(element => {
            if(id === element.id){
                if(name)
                element.name = name;
                if(age)
                element.age = age;
                found = true;
                console.log(element);
            }else{
                console.log(element);
            }
        });
        if(found){
            fs.writeFile('data.json', JSON.stringify(response), function (err) {
                if (err) {
                    res.status(500).send('Error occured while updating');
                } else {
                    res.status(204).send('Updated succesfully');
                }
            });
        }else{
            res.status(400).send('Bad request: id not found');
        }

       
    }).catch(error => {
        res.status(200).send('data.json file doesnt exist');
    })
 
}

function readData(){
    return new Promise(function(resolve, reject){
        fs.readFile('data.json', (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(JSON.parse(data));
            }
        })
    });
}

// delete by id
module.exports = {
    writeToFile: writeToFile,
    deleteFile: deleteFile,
    readFile: readFile,
    updateData: updateData
}