const logger = require('loglevel');
const { Player } = require('../models');

const createPlayer = async (request, h) => {
  try {
    const { name } = request.payload;
    let { balance } = request.payload;

    if(!balance) {
      balance = 0;
    }

    const newAccount = { name, balance };

    const result = await Player.create(newAccount);

    if(result) {
      const response = h.response({
        status: 'success',
        message: 'Account succesfully created',
        data: result,
      });

      response.code(201);

      logger.warn(`[POST] Account with id: ${result.id} is successfully created`);

      return response;
    }

    const response = h.response({
      status: 'failed',
      message: 'Account failed to create',
    });
  
    response.code(500);

    logger.warn(`[POST] Account failed to create`);

    return response;
  } catch (error) {
    logger.error(error);
  }
}

const getAllAccounts = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      accounts: players,
    }
  })

  response.code(200);

  logger.warn(`[GET] All accounts are successfully retrieved`);

  return response;
}

const getAccountById = (request, h) => {
  const { id } = request.params;

  const account = players.filter((account) => account.id === parseInt(id))[0];

  if(account) {
    const response = h.response({
      status: 'success',
      data: {
        account,
      }
    })
  
    response.code(200);

    logger.warn(`[GET] Account with id: ${id} is successfully retrieved`);

    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Account not found',
  })

  response.code(404);

  logger.warn(`[GET] Account with id: ${id} is not found`);

  return response;
}

const updateAccountBalanceById = (request, h) => {
  const { id } = request.params;
  const { balance } = request.payload;

  if (!balance) {
    const response = h.response({
      status: 'fail',
      message: 'Please insert new balance',
    });

    response.code(400);

    logger.warn(`[PUT] Account with id: ${id} is failed to be update, balance not found`);

    return response;
  }

  const index = players.findIndex((account) => account.id === parseInt(id));

  if(index !== -1) {
    players[index] = {
      ...players[index],
      balance
    }

    const response = h.response({
      status: 'success',
      message: 'Account balance successfully updated',
    })
  
    response.code(200);

    logger.warn(`[PUT] Account with id: ${id} is successfully updated`);

    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Account not found',
  })

  response.code(404);

  logger.warn(`[PUT] Account with id: ${id} is not found`);

  return response;
}

const deleteAccountById = (request, h) => {
  const { id } = request.params;

  const index = players.findIndex((account) => account.id === parseInt(id));

  if (index !== -1) {
    players.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Account successfully deleted',
    });

    response.code(200);

    logger.warn(`[DELETE] Account with id: ${id} is successfully deleted`);

    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Account not found',
  })

  response.code(404);

  logger.warn(`[DELETE] Account with id: ${id} is not found`);

  return response;
}

module.exports = {
  createPlayer,
  getAllAccounts,
  getAccountById,
  updateAccountBalanceById,
  deleteAccountById,
}