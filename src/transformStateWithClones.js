'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyStateWithAddProperties = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const currentObject = actions[i];
    const { type, extraData, keysToRemove } = currentObject;

    switch (type) {
      case 'addProperties':
        copyStateWithAddProperties = {
          ...copyStateWithAddProperties,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const ch of keysToRemove) {
          if (ch in copyStateWithAddProperties === true) {
            delete copyStateWithAddProperties[ch];
          }
        }
        break;

      case 'clear':
        copyStateWithAddProperties = {};
        break;
    }
    result.push({ ...copyStateWithAddProperties });
  }

  return result;
}

module.exports = transformStateWithClones;
