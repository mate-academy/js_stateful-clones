'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let lastStateVersion = state;

  for (const action of actions) {
    let newStateVersion;

    switch (action.type) {
      case `addProperties`:
        newStateVersion = Object.assign({}, lastStateVersion, action.extraData);
        break;

      case `removeProperties`:
        newStateVersion = Object.assign({}, lastStateVersion);

        for (const key of action.keysToRemove) {
          if (key in newStateVersion) {
            delete newStateVersion[key];
          }
        }
        break;

      case `clear`:
        newStateVersion = {};
    }

    lastStateVersion = newStateVersion;
    result.push(newStateVersion);
  }

  return result;
}

module.exports = transformStateWithClones;
