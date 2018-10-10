const express = require('express');
const router = express.Router();

const bucketList = require('../models/list');

router.get('/', (req, res) => {
    bucketList.getAllLists((err, lists) => {
        if (err) {
            res.json({
                success: false,
                message: `Failed to load all lists. Error ${err}`
            });
        } else {
            res.write(JSON.stringify({
                success: true,
                lists: lists
            }, null, 2));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    const { title, description, category } = req.body;
    let newList = new bucketList({
        title,
        description,
        category
    });
    bucketList.addList(newList, (err, list) => {
        if (err) {
            res.json({
                success: false,
                message: `Failed to create a new list. Error ${err}`
            });
        } else {
            res.json({
                success: true,
                list,
                message: 'Added successfully'
            });
        }
    });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    bucketList.deleteListById(id, (err, list) => {
        if (err) {
            res.json({
                success: false,
                message: `Failed to delete the list. Error ${err}`
            });
        } else if (list) {
            res.json({
                success: true,
                message: 'Deleted successfully'
            });
        } else {
            res.json({
                success: false
            });
        }
    });
});

module.exports = router;
