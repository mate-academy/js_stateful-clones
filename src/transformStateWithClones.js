'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const cloneState = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(cloneState, obj.extraData);

      arrayOfStates.push({
        ...cloneState, ...obj.extraData,
      });
    }

    if (obj.type === 'removeProperties') {
      obj.keysToRemove.forEach(elem => delete cloneState[elem]);
      arrayOfStates.push({ ...cloneState });
    }

    if (obj.type === 'clear') {
      Object.keys(cloneState).forEach(key => delete cloneState[key]);
      arrayOfStates.push({ ...cloneState });
    }
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
