'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const result = [];

  for (const action of actions) {
    // якщо key.type === 'addProperties'
    if (action.type === 'addProperties') {
      // додаємо name: 'Jim' до state
      Object.assign(obj, action.extraData);

      result.push({ ...obj });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        // видаляє на кожній ітерації циклу key зі state, якщо такий ключ є
        delete obj[key];
      }

      result.push({ ...obj });
    }

    if (action.type === 'clear') {
      // потрібно циклом пройтись по state
      for (const key in obj) {
        delete obj[key];
      }

      result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
