'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let temp = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        temp = { ...temp, ...action.extraData };
        break;

      case 'removeProperties':
        temp = { ...temp };

        for (const key of action.keysToRemove) {
          delete temp[key];
        }
        break;

      case 'clear':
        temp = {};
        break;
    }

    result.push({ ...temp });
  }

  return result;
}

module.exports = transformStateWithClones;
