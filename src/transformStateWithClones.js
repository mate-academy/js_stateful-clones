'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

function transformStateWithClones(state, actions) {
  const states = [];
  let preState = { ...state };

  for (const action of actions) {
    let newState = { ...preState };

    if (action.type === 'addProperties') {
      newState = { ...preState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      newState = {};
    }

    states.push(newState);
    preState = newState;
  }

  return states;
}
