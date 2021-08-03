'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneState = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':

        if (i === 0) {
          cloneState.push(Object.assign({}, state));
        } else {
          cloneState.push(Object.assign({}, cloneState[i - 1]));
        }

        Object.assign(cloneState[i], actions[i].extraData);
        break;

      case 'removeProperties':

        if (i === 0) {
          cloneState.push(Object.assign({}, state));
        } else {
          cloneState.push(Object.assign({}, cloneState[i - 1]));
        }

        actions[i].keysToRemove.forEach(element => {
          delete cloneState[i][element];
        });
        break;

      case 'clear':

        if (i === 0) {
          cloneState.push(Object.assign({}, state));
        } else {
          cloneState.push(Object.assign({}, cloneState[i - 1]));
        }

        Object.keys(cloneState[i]).forEach(element => {
          delete cloneState[i][element];
        });
    }
  }

  return cloneState;
}

module.exports = transformStateWithClones;
