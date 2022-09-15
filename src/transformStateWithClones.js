'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneObject = {};
  const stateVersions = [];

  Object.assign(cloneObject, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties' :
        Object.assign(cloneObject, extraData);
        break;

      case 'removeProperties' :
        for (const deleteValue of keysToRemove) {
          delete cloneObject[deleteValue];
        }
        break;

      case 'clear' :
        for (const key in cloneObject) {
          delete cloneObject[key];
        }
        break;
      default:
        throw new Error('Wrong type!');
    }
    stateVersions.push({ ...cloneObject });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
