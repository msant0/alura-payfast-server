function PaymentDAO(connection) {
  this._connection = connection;
}

PaymentDAO.prototype.save = function (payment, callback) {
  this._connection.query('INSERT INTO pagamentos SET ?', payment, callback);
}

PaymentDAO.prototype.findById = function (id, callback) {
  this._connection.query('SELECT * FROM pagamentos where id = ?', [id], callback);
}

PaymentDAO.prototype.findAll = function (id, callback) {
  this._connection.query('SELECT * FROM pagamentos');
}

PaymentDAO.prototype.update = function (payment, callback) {
  this._connection.query('UPDATE pagamentos SET status = ? where id = ?', [payment.status, payment.id], callback);
}

module.exports = function () {
  return PaymentDAO;
};
