const noteData = './db/db.json';

exports.route = (app, fs) => {

    app.get('/status', (req, res) => {
        const status = {
            status: 'ok info-scriber'
        }
        res.json(status);
    });
    app.get('/api/notes',  (req, res) => {
         fs.readFile(noteData,  (err, data) => {
            if (err) {
                throw err;
            }
            console.log(JSON.parse(data));
             res.json(JSON.parse(data));
        });
    });

    app.post('/api/notes', (req, res) => {
        fs.readFile(noteData, (err, data) => {
            if (err) {
                throw err;
            };
            const notes = JSON.parse(data);
            const newNote = req.body;
            newNote["id"] = notes.length + 1;
            notes.push(newNote);
            fs.writeFile(noteData, JSON.stringify(notes,null,4), (err) => {
                if (err) {
                    throw err;
                };
                console.log('new notes added',notes);
                
                res.json({created: true, ...notes});
            });
        });
    });
    app.delete('/api/notes/:id', (req,res) => {
        fs.readFile(noteData, (err,data) => {
            if (err) {
                throw err;
            };
            const notes = JSON.parse(data);
            const rmId = req.params.id - 1
            delete notes[rmId];
            fs.writeFile(noteData, JSON.stringify(notes,null,4), (err) => {
                if (err) {
                    throw err;
                };
                console.log('note deleted');
                res.json({deleted: true, ...notes});
            });
        });
    });

};