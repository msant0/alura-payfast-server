module.exports = function (app) {
  app.get ('/pagamentos', function (req, res) {
    console.log ('requisição recebida na porta 3002');
    res.send ('Retorno da requisição');
  });

  app.post ('/pagamentos/pagamento', (req, res) => {
    let payment = req.body;

    //Data entry validation
    req
      .assert ('formaPagamento', 'Forma de pagamento é obrigatória')
      .notEmpty ();
    req
      .assert ('valor', 'Valor é obrigatório e deve ser um decimal')
      .notEmpty ()
      .isFloat ();

    req
      .assert ('moeda', 'Moeda é obrigatória e deve ter 3 caracteres')
      .notEmpty ()
      .len (3, 3);

    const errors = req.validationErrors ();

    if (errors) {
      console.log ('Erros de validação encontrados');
      return res.status (400).send (errors);
    }

    const connection = app.connection.connectionFactory ();
    const paymentDAO = new app.dao.paymentDAO (connection);

    payment.status = 'Create';
    payment.data = new Date ();

    paymentDAO.save (payment, function (error, result) {
      if (error) {
        console.error ('Error inserting the record in the bank');
        res.status (500).send (error);
      } else {
        payment.id = result.insertId
        res.location ('/pagamentos/pagamento/' + payment.id);

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

        res.status (201).json (response);
      }
    });
  });

  app.put ('/pagamentos/pagamento/:id', (req, res) => {
    let payment = {};
    const id = req.params.id;

    payment.id = id;
    payment.status = 'Confirmado';
    const connection = app.connection.connectionFactory ();
    const paymentDAO = new app.dao.paymentDAO (connection);

    paymentDAO.update (payment, function (error) {
      if (error) {
        return res.status (500).send (error);
      }
      res.send (payment);
    });
  });

  app.delete ('/pagamentos/pagamento/:id', (req, res) => {
    let payment = {};
    const id = req.params.id;

    payment.id = id;
    payment.status = 'Cancelado';
    const connection = app.connection.connectionFactory ();
    const paymentDAO = new app.dao.paymentDAO (connection);

    paymentDAO.update (payment, function (error) {
      if (error) {
        return res.status (500).send (error);
      }
      res.status (204).send (payment);
    });
  });
};
