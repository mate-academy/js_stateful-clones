'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy, ...action.extraData,
        };
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        action.keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case 'clear':
        stateCopy = {};
        break;
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
