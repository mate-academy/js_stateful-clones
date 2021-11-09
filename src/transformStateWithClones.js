'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const prevStates = [{ ...state }];

  for (let index = 0; index < actions.length; index++) {
    if (index > 0) {
      prevStates[index] = { ...prevStates[index - 1] };
    }

    switch (actions[index].type) {
      case 'addProperties':
        Object.assign(prevStates[index], actions[index].extraData);
        break;

      case 'removeProperties':
        actions[index].keysToRemove.forEach(key => {
          delete prevStates[index][key];
        });
        break;

      case 'clear':
        prevStates[index] = {};
    }
  };

  return prevStates;
}

module.exports = transformStateWithClones;
