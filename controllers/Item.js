const sql = require('../connection');
const _ = require('lodash');
const PAGE_SIZE = 30;

const Item = {
  getAllItems: function(req, res) {
    sql.query('SELECT count(*) as total FROM item', function(countError, countRows, countFields) {
      if (countError) throw countError;

      const totalRec = countRows[0]['total'];
      const pageSize = req.query.limit || PAGE_SIZE;
      const pageCount = Math.ceil(totalRec /  pageSize);

      let pages = 0;
      let currentPage = 1;

      if (typeof req.query.page !== 'undefined') {
        currentPage = req.query.page;
      }

      if(currentPage > 1) {
        pages = (currentPage - 1) * pageSize;
      }

      sql.query('SELECT * FROM item LIMIT ?,?', [pages, pageSize], function (error, results, fields) {
          if (error) throw error;
          const pagination = {
            totalResults: totalRec,
            resultPerPage: pageSize,
            currentPage: currentPage,
            pages: pages
          };
          return res.send({items: results, paginationInfo: pagination});
      });
    });
  },

  getItem: function(req, res) {
    let id = req.params.id;
    sql.query("SELECT * FROM item WHERE id = ? ", [id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ items: results});
    });
  },

  createItem: function(req, res) {
    const data = req.body;
    if(!data.name) {
      return res.status(400).send({ error:true, message: 'Please provide name for the item' });
    }

    if(!data.price) {
      return res.status(400).send({ error:true, message: 'Please provide price for the item' });
    }

    if(!data.brand) {
      return res.status(400).send({ error:true, message: 'Please provide brand from the item' });
    }

    sql.query("INSERT INTO item (name, price, brand) VALUES (?, ?, ?)", [data.name, data.price, data.brand], function (error, results, fields) {
        if (error) throw error;
        sql.query("SELECT * from item WHERE id = ?", [results.insertId], function(getError, getResults, getFields) {
          if (getError) throw getError;
          return res.send({items: getResults[0]});
        });
    });
  },

  updateItem: function(req, res) {
    const itemId = req.params.id;
    const data = req.body;

    if(_.isEmpty(data)) {
      return res.status(400).send({ error:true, message: 'Nothing to update' });
    }

    let sqlQuery = "UPDATE item SET ";
    let updateData = [];

    if(data.name) {
      sqlQuery += "name = ?";
      updateData.push(data.name);
    }

    if(data.price) {
      if(data.name) {
        sqlQuery += ", ";
      }
      sqlQuery += "price = ?";
      updateData.push(data.price);
    }

    if(data.brand) {
      if(data.name || data.price) {
        sqlQuery += ", ";
      }
      sqlQuery += "brand = ?";
      updateData.push(data.brand);
    }

    sqlQuery += " WHERE id = ?";
    updateData.push(itemId);

    sql.query(sqlQuery, updateData, function (error, results, fields) {
        if (error) throw error;
        sql.query("SELECT * from item WHERE id = ?", [itemId], function(getError, getResults, getFields) {
          if (getError) throw getError;
          return res.send({items: getResults[0]});
        });
    });
  },

  deleteItem: function(req, res) {
    let itemId = req.params.id;

    if (!itemId) {
        return res.status(400).send({ error: true, message: 'Please provide itemId' });
    }
    sql.query('DELETE FROM item WHERE id = ?', [itemId], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Item has been deleted successfully.' });
    });
  }
};

module.exports = Item;
