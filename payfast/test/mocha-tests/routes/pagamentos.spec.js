const chai = require('chai'),
    expect = chai.expect,
    express = require('../../../../payfast/config/custom-express.js'),
    constants = require('../../../helpers/constants.js'),
    supertest = require('supertest');

const app = express();

let payments,
    resConvertPayments;

describe('/GET pagamentos', function () {
    it('#deve verificar se a conexao foi realizada pelo feedback de status 200', function (done) {
        supertest(app).get('/').end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});

describe('/POST pagamentos', function () {
    beforeEach(function () {
        payments = {
            formaPagamento: 'Uzzypay',
            valor: 98.59,
            moeda: 'USD',
            descricao: 'criando um pagamento'
        }
    });
    it('deve retornar um erro no cadastro de pagamento, caso a forma de pagamento ' +
        'não seja preenchida', function () {
            payments.formaPagamento = ''

            supertest(app).post('/pagamentos/pagamento').send(payments).end(function (err, res) {
                resConvertPayments = JSON.parse(res.text)
                expect(resConvertPayments[0].msg).to.equal(constants.MENSAGEM_ERRO_VALIDACAO_FORMA_PAGAMENTO_CADASTRO)
            })
        });
    it('deve retornar um erro no cadastro de pagamento, caso o valor de pagamento ' +
        'não seja um número', function () {
            payments.valor = 'noventaeoito'

            supertest(app).post('/pagamentos/pagamento').send(payments).end(function (err, res) {
                resConvertPayments = JSON.parse(res.text)
                expect(resConvertPayments[0].msg).to.equal(constants.MENSAGEM_ERRO_VALIDACAO_VALOR_CADASTRO)
            })
        });
    it('deve retornar um erro no cadastro de pagamento, caso a moeda não seja preenchida ' +
        'ou inválida', function () {
            payments.moeda = 'USDD'

            supertest(app).post('/pagamentos/pagamento').send(payments).end(function (err, res) {
                resConvertPayments = JSON.parse(res.text)
                expect(resConvertPayments[0].msg).to.equal(constants.MENSAGEM_ERRO_VALIDACAO_MOEDA_CADASTRO)
            });
        });
    it('deve retornar um registro de pagamento realizado com sucesso, caso tudo esteja preenchido', function () {
        supertest(app).post('/pagamentos/pagamento').send(payments).end(function (err, res) {
            resConvertPayments = JSON.parse(res.text)
            expect(resConvertPayments.paymentDates.status).to.equal(constants.STATUS_CRIACAO_PAGAMENTO)
        })
    })
})