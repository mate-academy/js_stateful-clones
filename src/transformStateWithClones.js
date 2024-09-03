'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const newState = { ...state };

  actions.forEach((action) => {
    const { type, ...property } = action;

    switch (type) {
      case 'addProperties':
        for (const [key, val] of Object.entries(property.extraData)) {
          newState[key] = val;
        }
        break;
      case 'removeProperties':
        for (const key of property.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        if (Object.keys(state).length < 1) {
          return {};
        }

        for (const key of Object.keys(newState)) {
          delete newState[key];
        }
        break;
    }

    states.push({ ...newState });
  });

  return states;
}

module.exports = transformStateWithClones;
