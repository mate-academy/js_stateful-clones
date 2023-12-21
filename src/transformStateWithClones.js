'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const arrResult = [];
  const stateCopy = ({ ...state });

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;
    }

    arrResult.push({ ...stateCopy });
  }

  return arrResult;
}

module.exports = transformStateWithClones;
