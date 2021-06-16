'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [];
  const addObject = {};

  Object.assign(addObject, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(addObject, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete addObject[key];
        }
        break;

      case 'clear':
        for (const key in addObject) {
          delete addObject[key];
        }
        break;
    }

    stateClone.push({ ...addObject });
  };

  return stateClone;
}

module.exports = transformStateWithClones;
