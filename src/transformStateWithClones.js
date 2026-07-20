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
        allObjects.push({ ...temporaryObject });
        break;
      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete temporaryObject[key];
        }
        allObjects.push({ ...temporaryObject });
        break;
      case 'clear':
        temporaryObject = {};
        allObjects.push({ ...temporaryObject });
        break;
    }
  }

  return allObjects;
}

module.exports = transformStateWithClones;
