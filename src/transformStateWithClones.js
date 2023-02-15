'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const currentObject = actions[i];
    const { type, extraData, keysToRemove } = currentObject;

    switch (type) {
      case 'addProperties' :
        newState = {
          ...newState, ...extraData,
        };
        break;

      case 'removeProperties' :
        for (const keyRemove of keysToRemove) {
          delete newState[keyRemove];
        }
        break;

      case `clear` :
        newState = {};
        break;
    }
    result.push({ ...newState });
  }

  return result;
};

module.exports = transformStateWithClones;
