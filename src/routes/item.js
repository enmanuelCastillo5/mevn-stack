const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

//get Items
router.get('/', (req, res) => {
    Item.find((error, items) => {
        if (error) {throw error }
        else {
            res.json(items)
        }
    })
});

router.post('/', (req, res) => {
    const item = new Item(req.body)
    item.save().then(item => {
        res.status(200).json({item: 'item agregado'})
    })
    .catch(error => {
        res.status(400).send({item: 'error al agregar item'})
    })
})

router.put('/:id', (req, res, next) => {
    Item.findById(req.params.id, (error, item) => {
        if (!item) {
            return next(new Error('no se pudo encontrar el documento'));
        } else {
            item.name = req.body.name;
            item.price = req.body.price
            item.save()
            .then(item => {
                res.json('item actualizado')
            })
            .catch(error => {
                res.status(400).send('no se pudo actualizar')
            })
        }

    })
});

router.delete('/:id', (req, res, next) => {
    Item.findByIdAndDelete(req.params.id, (error, item) => {
        if (error) { res.json(error) }
        else {
            res.json('item eliminado')
        }
    })
})

module.exports = router;