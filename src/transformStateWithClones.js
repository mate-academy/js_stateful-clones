'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesOfTrasformation = [];
  const cloneState = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(cloneState, obj.extraData);
        break;
      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          if (cloneState.hasOwnProperty(key)) {
            delete cloneState[key];
          }
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
    }
    statesOfTrasformation.push({ ...cloneState });
  }

  return statesOfTrasformation;
}

module.exports = transformStateWithClones;
