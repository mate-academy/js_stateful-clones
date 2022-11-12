'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const versions = [];

  for (const a of actions) {
    switch (a.type) {
      case 'addProperties':
        Object.assign(stateCopy, a.extraData);
        break;

      case 'removeProperties':
        const takeAway = a.keysToRemove;

        for (const name of takeAway) {
          if (stateCopy[name]) {
            delete stateCopy[name];
          }
        };
        break;

      case 'clear':
        stateCopy = {};
        break;
    }
    versions.push(stateCopy);

    stateCopy = { ...stateCopy };
  };

  return versions;
}

module.exports = transformStateWithClones;
