const itemsModel = require('../models/itemsModel');

const addItem = (req, res) => {
    const item = req.body;
    itemsModel.create(item)
        .then(() => {
            res.status(201).send('Item added successfully!');
        })
        .catch((err) => {
            res.status(500).send('Error adding item: ' + err);
        });
}
const removeItem = (req, res) => {
    const id = req.params.id;
    const amount = req.params.amount;
    console.log(req.body)
    itemsModel.findByPk(id)
        .then((item) => {
            if (item.quantity >= amount) {
                item.quantity -= amount;
            }
            else {
                itemsModel.destroy({ where: { id: id } });
                // item.quantity = 0;
            }
            return item.save();
        })
        .then(() => {
            res.status(200).send('Item removed successfully!');
        })
        .catch((err) => {
            res.status(500).send('Error removing item: ' + err);
        });
}

const getItem = (req, res) => {
    itemsModel.findAll()
        .then((items) => {
            res.status(200).send(items);
        })
        .catch((err) => {
            res.status(500).send('Error getting items: ' + err);
        });
}


module.exports = {
    addItem,
    removeItem,
    getItem,
};