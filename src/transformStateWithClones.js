'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayClones = [];

  let objectClone = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const cloneAddingProperties = Object.assign(
        {},
        objectClone,
        action.extraData,
      );

      arrayClones.push(cloneAddingProperties);
      objectClone = cloneAddingProperties;
    } else if (action.type === 'removeProperties') {
      const cloneRemovedProperties = Object.assign({}, objectClone);

      for (const item of action.keysToRemove) {
        delete cloneRemovedProperties[item];
      }

      arrayClones.push(cloneRemovedProperties);
      objectClone = cloneRemovedProperties;
    } else if (action.type === 'clear') {
      arrayClones.push({});
      objectClone = {};
    }
  }

  return arrayClones;
}

module.exports = transformStateWithClones;
