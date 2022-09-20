'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
  const tranformedObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(tranformedObject, action.extraData);
        break;
      }

      case 'clear': {
        for (const key in tranformedObject) {
          delete tranformedObject[key];
        }
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          if (tranformedObject[key]) {
            delete tranformedObject[key];
          }
        }
        break;
      }

      default:
        return 'Input not valid';
    }

    transformedState.push({ ...tranformedObject });
  }

  return transformedState;
}

module.exports = transformStateWithClones;
