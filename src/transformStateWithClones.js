'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allObjects = [];

  let temporaryObject = {};

  Object.assign(temporaryObject, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(temporaryObject, actions[i].extraData);
        break;
        
      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete temporaryObject[key];
        }
        break;
        
      case 'clear':
        temporaryObject = {};
        break;
        
      default:
        break;
    }
    allObjects.push({ ...temporaryObject });
  }

  return allObjects;
}

module.exports = transformStateWithClones;
