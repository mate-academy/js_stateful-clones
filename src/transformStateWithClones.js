/* eslint-disable no-param-reassign */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':

        Object.assign(stateCopy, action.extraData);
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const keys of keysToRemove) {
          delete stateCopy[keys];
        }
        break;
    }
    array.push({ ...stateCopy });
  }

  return array;
}

module.exports = transformStateWithClones;
