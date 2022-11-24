'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithstateCopys(state, actions) {
  const transformedStates = [];
  let stateCopy = { ...state };

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;
    }

    transformedStates.push({ ...stateCopy });
  });

  return transformedStates;
}

module.exports = transformStateWithstateCopys;
