'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let tempState = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(tempState, action.extraData);
        break;

      case 'removeProperties' :
        for (const removeKey of action.keysToRemove) {
          delete tempState[removeKey];
        }
        break;

      case 'clear' :
        tempState = {};
        break;
    }
    history.push({ ...tempState });
  }

  return history;
}

module.exports = transformStateWithClones;
