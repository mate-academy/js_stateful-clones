'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const addProp = 'addProperties';
const removeProp = 'removeProperties';
const clear = 'clear';

function transformStateWithClones(state, actions) {
  const transformedStates = [];
  let stateCopy = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case addProp:
        stateCopy = {
          ...stateCopy, ...item.extraData,
        };
        break;

      case removeProp:
        for (const keys of item.keysToRemove) {
          delete stateCopy[keys];
        }
        break;

      case clear:
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }
        break;

      default:
        throw new Error('error');
    }

    transformedStates.push({ ...stateCopy });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
