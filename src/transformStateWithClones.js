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
  const totalObject = Object.assign({}, state);

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      Object.assign(totalObject, action.extraData);
    }

    if (action.type === 'clear') {
      for (const key in totalObject) {
        delete totalObject[key];
      }
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
