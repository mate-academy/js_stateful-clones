'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = Object.assign({}, state);
  const allVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const element of action.keysToRemove) {
          if (element in copyState) {
            delete copyState[element];
          }
        }
        break;

      case 'clear' :
        copyState = {};
    }
    allVersions.push({ ...copyState });
  }

  return allVersions;
}

module.exports = transformStateWithClones;
