'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonState = { ...state };
  const allVersions = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clonState, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => {
        delete clonState[key];
      });
    } else if (action.type === 'clear') {
      clonState = {};
    }

    allVersions.push({ ...clonState });
  }

  return allVersions;
}

module.exports = transformStateWithClones;
