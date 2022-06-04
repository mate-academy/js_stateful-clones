'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const objOfresult = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(objOfresult, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToDelete of action.keysToRemove) {
          delete objOfresult[keyToDelete];
        }
        break;

      case 'clear':
        for (const key in objOfresult) {
          delete objOfresult[key];
        }
        break;
    }
    result.push({ ...objOfresult });
  }

  return result;
}

module.exports = transformStateWithClones;
