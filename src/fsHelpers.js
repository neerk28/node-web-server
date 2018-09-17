const fs = require('fs');
const fileName = 'data.json';

function writeToFile(data, res) {
    data.forEach((element, i) => {
        element.id = i+1;
    })
    fs.writeFile(fileName, JSON.stringify(data), function (err) {
        if (err) {
            res.status(500).send({ message: 'Error occured while writing to file' });
        } else {
            res.status(201).send({ message: 'Created' });
        }
    });
}

function deleteFile(res) {
    fs.stat(fileName, (err) => {
        if (err == null) {
            fs.unlink(fileName, (err) => {
                if (err) {
                    res.status(500).send({ message: 'File could not be deleted' });
                } else {
                    res.status(200).send({ message: 'File deleted' });
                }

            });
        }
        else if (err.code === 'ENOENT') {
            res.status(200).send({ message: 'File already deleted; doesnt exist anymore' });
        }
    })
}

function readFile(res) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.status(404).send({ message: 'Bad request: file not found' });
        } else {
            res.status(200).send(JSON.parse(data));
        }
    })
}

function updateData(id, name, age, res) {
    var found = false;
    readData().then(response => {
        response.forEach(element => {
            if (id === element.id) {
                if (name)
                    element.name = name;
                if (age)
                    element.age = age;
                found = true;
            } else {
            }
        });
        if (found) {
            fs.writeFile(fileName, JSON.stringify(response), function (err) {
                if (err) {
                    res.status(500).send({ message: 'Error occured while updating' });
                } else {
                    res.status(204).send({ message: 'Updated' });
                }
            });
        } else {
            res.status(400).send({ message: 'Bad request: id not found' });
        }


    }).catch(error => {
        res.status(404).send({ message: 'Bad request: file not found' });
    })

}

function readData() {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        })
    });
}

function deleteById(id, res){
    var found = false;
    readData().then(data => {
        data.forEach(element => {
            if(id === element.id){
                data.splice(data.indexOf(element),1);
                found = true;
            }
        })
        if(found){
            fs.writeFile(fileName, JSON.stringify(data), function (err) {
                if (err) {
                    res.status(500).send({ message: 'Error occured while updating' });
                } else {
                    res.status(204).send({ message: 'Deleted' });
                }
            });
        }else{
            res.status(400).send({ message: 'Bad request: id not found' });
        }
    }).catch(error => {
        res.status(404).send({ message: 'Bad request: file not found' });
    })
}

module.exports = {
    writeToFile: writeToFile,
    deleteFile: deleteFile,
    readFile: readFile,
    updateData: updateData,
    deleteById: deleteById
}