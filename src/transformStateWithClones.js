'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const array = [];
  let stateCopy = {
    ...state,
  };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['type'] === 'addProperties') {
      Object.assign(stateCopy, actions[i]['extraData']);
    } else if (actions[i]['type'] === 'removeProperties') {
      for (const key of actions[i]['keysToRemove']) {
        delete stateCopy[key];
      }
    } else if (actions[i]['type'] === 'clear') {
      stateCopy = {};
    }
    array.push({ ...stateCopy });
  }

  return array;
}

module.exports = transformStateWithClones;
