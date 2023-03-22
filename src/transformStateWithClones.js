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
    switch (actions[i]['type']) {
      case 'addProperties' :
        Object.assign(stateCopy, actions[i]['extraData']);
        break;
      case 'removeProperties' :
        for (const key of actions[i]['keysToRemove']) {
          delete stateCopy[key];
        }
        break;

      case 'clear' :
        stateCopy = {};
        break;
    }

    array.push({ ...stateCopy });
  }

  return array;
}

module.exports = transformStateWithClones;
