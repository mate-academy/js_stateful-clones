'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const states = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(stateCopy, action.extraData);
        break;
      case ('removeProperties'):
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        };
        break;
      case ('clear'):
        stateCopy = {};
        break;
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
