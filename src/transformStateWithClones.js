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
    if (element.type === 'addProperties') {
      arr.push(Object.assign({}, stateCopy, element['extraData']));
      Object.assign(stateCopy, element['extraData']);
    } else if (element.type === 'removeProperties') {
      for (const key of element['keysToRemove']) {
        delete stateCopy[key];
      }
      arr.push(Object.assign({}, stateCopy));
    } else if (element.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
      arr.push({});
    }
  }

  return (arr);
}

module.exports = transformStateWithClones;
