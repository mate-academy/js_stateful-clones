'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrOfTransformState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const item of keysToRemove) {
          if (Object.keys(stateCopy).includes(item)) {
            delete stateCopy[item];
          }
        }
        break;

      case 'clear':
        for (const item in stateCopy) {
          delete stateCopy[item];
        }
        break;
    }

    arrOfTransformState.push({ ...stateCopy });
  }

  return arrOfTransformState;
}

module.exports = transformStateWithClones;
