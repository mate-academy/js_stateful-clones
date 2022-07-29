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
    switch (action.type) {
      case 'addProperties':
        Object.assign(totalObject, action.extraData);
        break;

      case 'clear':
        totalObject = {};
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete totalObject[key];
        };
        break;
    }
    copyState.push({ ...totalObject });
  });

  return copyState;
}

module.exports = transformStateWithClones;
