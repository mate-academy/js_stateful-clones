'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const previosStateArr = [];
  let stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    stateCopy = { ...stateCopy };

    if (actions[i].type === 'addProperties') {
      Object.assign(stateCopy, actions[i].extraData);
    }

    if (actions[i].type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete stateCopy[key];
      }
    }
    previosStateArr.push(stateCopy);
  }

  return previosStateArr;
}

module.exports = transformStateWithClones;
