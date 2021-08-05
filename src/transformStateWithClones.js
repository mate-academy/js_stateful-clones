'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = Object.assign({}, state);
  const allVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        allVersions.push({ ...copy });
        break;

      case 'removeProperties':
        for (const element of action.keysToRemove) {
          if (element in copy) {
            delete copy[element];
          }
        }
        allVersions.push({ ...copy });
        break;

      case 'clear' :
        for (const key in copy) {
          delete copy[key];
        }
        allVersions.push({ ...copy });
    }
  }

  return allVersions;
}

module.exports = transformStateWithClones;
