'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = [];
  let totalObject = Object.assign({}, state);

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      Object.assign(totalObject, action.extraData);
    }

    if (action.type === 'clear') {
      totalObject = {};
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete totalObject[key];
      };
    }
    copyState.push({ ...totalObject });
  });

  return copyState;
}

module.exports = transformStateWithClones;
