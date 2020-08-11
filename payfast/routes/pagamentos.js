const constants = require('../../payfast/helpers/constants')
const logger = require('../services/logger')

module.exports = function (app) {
  app.get('/', function (req, res) {
    console.log('requisição recebida na porta 3003');
    res.send('Retorno da requisição');
  });

  app.get('/pagamentos/:id', function (req, res) {
    let payment = {};
    const connection = app.connection.connectionFactory();
    const paymentDAO = new app.dao.paymentDAO(connection);
    payment.id = req.params.id;

    paymentDAO.findById(payment, function (error) {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(204).send(payment);
    });
  })

  app.get('/pagamentos/pagamento/:id', function (req, res) {
    const id = req.params.id
    const memcachedClient = app.services.memcachedClient()

    logger.info(constants.LOGGER_CONSULTING_PAYMENT, + id)

    memcachedClient.get(constants.PRE_INDEX_KEY_CACHE + id, function (error, comeAround) {
      if (error || !comeAround) {
        console.log(constants.MESSAGE_ERROR_KEY_CACHE)

        const connection = app.connection.connectionFactory();
        const paymentDAO = new app.dao.paymentDAO(connection);

        paymentDAO.findById(id, function (error, comeAround) {
          if (error) return res.status(500).send(error)
          return res.json(comeAround)
        })
      } else {
        console.log('HIT - Value: ' + JSON.stringify(comeAround))
        return res.json(comeAround)
      }
    })
  })

  app.post('/pagamentos/pagamento', (req, res) => {
    let payment = req.body["payment"];

    //Data entry validation
    req
      .assert('payment.form_of_payment', constants.MESSAGE_ERROR_PAYMENT_FORM)
      .notEmpty();
    req
      .assert('payment.value', constants.MESSAGE_ERROR_VALUE)
      .notEmpty()
      .isFloat();

    req
      .assert('payment.coin', constants.MESSAGE_ERROR_COIN)
      .notEmpty()
      .len(3, 3);

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }

    const connection = app.connection.connectionFactory();
    const paymentDAO = new app.dao.paymentDAO(connection);

    payment.status = 'Create';
    payment.data = new Date();

    paymentDAO.save(payment, function (error, result) {
      if (error) {
        console.error('Error inserting the record in the bank');
        res.status(500).send(error);
      } else {
        payment.id = result.insertId

        const memcachedClient = app.services.memcachedClient()
        memcachedClient.set(constants.PRE_INDEX_KEY_CACHE + payment.id, payment, 6000, function (error) {
          console.log(constants.KEY_ADD_CACHE + payment.id)
        })

        if (payment.form_of_payment == 'cartao') {
          const card = req.body["card"]
          const cardsClient = new app.services.cardsClient()

          cardsClient.authorized(card, function (exception, request, response, comeAround) {
            if (exception) {
              return res.status(400).send(exception.body)
            }
            console.log(constants.SERVICE_CONSUMED_MESSAGE)
            console.log(comeAround)

            res.location('/pagamentos/pagamento/' + payment.id);

            response = {
              paymentDates: payment,
              card: comeAround,
              links: [
                {
                  href: 'http://localhost:3000/pagamentos/pagamento/'
                    + payment.id,
                  rel: 'confirmar',
                  method: 'PUT'
                },
                {
                  href: 'http://localhost:3000/pagamentos/pagamento/'
                    + payment.id,
                  rel: 'cancelar',
                  method: 'DELETE'
                }
              ]
            }
            res.status(201).json(response)
            return
          })
        } else {
          res.location('/pagamentos/pagamento/' + payment.id);

          let response = {
            paymentDates: payment,
            links: [
              {
                href: 'http://localhost:3000/pagamentos/pagamento/'
                  + payment.id,
                rel: 'confirmar',
                method: 'PUT'
              },
              {
                href: 'http://localhost:3000/pagamentos/pagamento/'
                  + payment.id,
                rel: 'cancelar',
                method: 'DELETE'
              }
            ]
          }
          res.status(201).json(response);
        }
      }
    });
  });

  app.put('/pagamentos/pagamento/:id', (req, res) => {
    let payment = {};
    const id = req.params.id;

    payment.id = id;
    payment.status = constants.STATUS_CONFIRMED_PAYMENT;
    const connection = app.connection.connectionFactory();
    const paymentDAO = new app.dao.paymentDAO(connection);

    paymentDAO.update(payment, function (error) {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(payment);
    });
  });

  app.delete('/pagamentos/pagamento/:id', (req, res) => {
    let payment = {};
    if (req.params.id === '') return constants.MESSAGE_DELETE_PAYMENT_FOR_PARAM;

    payment.id = req.params.id;
    payment.status = 'Cancelado';
    const connection = app.connection.connectionFactory();
    const paymentDAO = new app.dao.paymentDAO(connection);

    paymentDAO.update(payment, function (error) {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(204).send(payment);
    });
  });
};
