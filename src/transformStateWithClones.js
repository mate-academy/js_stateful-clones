'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let obj = Object.assign({}, state);
  const result = [];

  for (const values of actions) {
    switch (values['type']) {
      case 'addProperties':
        obj = {
          ...obj,
          ...values['extraData'],
        };
        break;

      case 'removeProperties':
        for (const key of values['keysToRemove']) {
          delete obj[key];
        }
        break;

      case 'clear':
        obj = {};
        break;
    }
    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
