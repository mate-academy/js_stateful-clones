'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arr = [];

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        Object.assign(stateCopy, element['extraData']);
        break;

      case 'removeProperties':
        for (const key of element['keysToRemove']) {
          delete stateCopy[key];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;
    }
    arr.push(Object.assign({}, stateCopy));
  }

  return (arr);
}

module.exports = transformStateWithClones;
