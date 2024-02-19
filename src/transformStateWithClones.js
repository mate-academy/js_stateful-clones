'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const history = [];
  const stateClone = Object.assign({}, state);

  function deleteKeysFromObj(arr) {
    for (const key of arr) {
      delete stateClone[key];
    }
  }

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        history.push({ ...stateClone });
        break;
      case 'removeProperties':
        deleteKeysFromObj(action.keysToRemove);
        history.push({ ...stateClone });
        break;
      case 'clear':
        const keys = Object.keys(stateClone);

        deleteKeysFromObj(keys);
        history.push({ ...stateClone });
        break;
      default:
        throw Error('Error');
    }
  }

  return history;
}

module.exports = transformStateWithClones;
