'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  // Here I clone the given state / создаю объект текущего состояния
  let currentState = { ...state };

  for (const action of actions) {
    const type = action.type;
    let nextState;

    /* Here I checked action condition for every case
    and implement what I need to do
    проверяю состояние действия для каждого случая
    и выполняю действия в зависимости от условия */

    if (type === 'addProperties') {
      nextState = {
        ...currentState,
        ...action.extraData,
      };
    }

    if (type === 'removeProperties') {
      nextState = { ...currentState };

      nextState = action.keysToRemove.reduce((acc, key) => {
        const { [key]: deletedKey, ...rest } = acc;

        return rest;
      }, nextState);
    }

    if (type === 'clear') {
      nextState = {};
    }

    // Here I push nextState to result array
    // добавляю в массив сосотояние
    result.push(nextState);

    // Here I appropriate nextState to currentState
    // присваиваю следующее сосотояние текущему
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
