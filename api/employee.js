const express = require('express');
const router = express.Router();
const db = require('../config/db_connection')

const con = db.getConnection();

router.get('/', (req, res) => {
    con.query("SELECT * FROM tblemployee", (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows);
        } else {
            res.status(500).json({
                Error: err
            })
        }
    })
})


router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id > 0) {
        con.query('SELECT * FROM tblemployee WHERE Id = ?',[id], (err, rows, fields) => {
            if (!err) {
                if (rows[0]) {
                    res.status(200).json(rows);
                } else {
                    res.status(404).json({
                        'message': 'Not found!'
                    });
                }
            } else {
                res.status(500).json({
                    Error: err
                })
            }
        })
    } else {
        {
            res.status(500).json({
                Error: "Method call with invalid params"
            })
        }
    }
});


router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id > 0) {
        con.query('DELETE FROM tblemployee WHERE Id = ?',[id], (err, rows, fields) => {
            if (!err) {
                res.status(200).json({
                    'message' : "Employee deleted successfully"}
                )
            } else {
                res.status(500).json({
                    Error: err
                })
            }
        })
    } else {
        {
            res.status(500).json({
                Error: "Method call with invalid params"
            })
        }
    }
});



router.post('/', (req, res) => {
    if (id > 0) {
        con.query(`INSERT INTO tblemployee values(null,${req.body.name})`, (err, rows, fields) => {
            if (!err) {
                if (rows[0]) {
                    res.status(200).json(rows);
                } else {
                    res.status(404).json({
                        'message': 'Not found!'
                    });
                }
            } else {
                res.status(500).json({
                    Error: err
                })
            }
        })
    } else {
        {
            res.status(500).json({
                Error: "Method call with invalid params"
            })
        }
    }
});



module.exports = router;