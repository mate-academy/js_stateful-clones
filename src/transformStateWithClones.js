'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const сopy = {
    ...state,
  };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(сopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete сopy[key];
        };
        break;

      case 'clear':
        for (const key in сopy) {
          delete сopy[key];
        }
    }
    states.push({ ...сopy });
  }

  return states;
}
module.exports = transformStateWithClones;
