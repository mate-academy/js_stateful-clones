'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = Array(0);
  let temp = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'clear':
        temp = {};
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(K => delete temp[K]);
        break;
      case 'addProperties':
        Object.assign(temp, action.extraData);
    }

    arr.push({ ...temp });
  });

  return arr;
}

module.exports = transformStateWithClones;
