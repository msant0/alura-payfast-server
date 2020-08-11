module.exports = {
    //status das operações
    STATUS_CREATE_PAYMENT: 'Create',
    STATUS_CONFIRMED_PAYMENT: 'Confirmado',

    //mensagens de erros
    MESSAGE_DELETE_PAYMENT_FOR_PARAM: 'Erro ao encontrar parâmetro, ' +
        'do pagamento para realizar a exclusão',
    MESSAGE_ERROR_PAYMENT_FORM: 'Forma de pagamento é obrigatória',
    MESSAGE_ERROR_VALUE: 'Valor é obrigatório e deve ser um número',
    MESSAGE_ERROR_COIN: 'Moeda é obrigatória e deve ter 3 ' +
        'caracteres',
    MESSAGE_ERROR_KEY_CACHE: 'MISS - Chave não encontrada',

    //Transaction success message
    SERVICE_CONSUMED_MESSAGE: 'Consumindo serviços de cartões',
    SOAP_CLIENT_CREATED: 'Cliente SOAP criado',
    FILE_READED: 'Arquivo lido',
    FILE_WRITED: 'Arquivo escrito',
    FILE_WRITED_STREAM: 'Arquivo lido com Stream',
    RECEIVING_IMAGE: 'Recebendo imagem',
    RECEIVING_IMAGE_WITH_SUCCESS: 'Imagem recebida com sucesso',
    KEY_ADD_CACHE: 'Nova chave adicionada ao cachê: pagamento -',
    PRE_INDEX_KEY_CACHE: 'Payment-',
    PRE_INDEX_HIT_CACHE: 'HIT - Valor: ',

    //MESSAGE_LOGGERS
    LOGGER_CONSULTING_PAYMENT: 'Consultando pagamento'
}