'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  // const removeState = {};
  const copyOfState = Object.assign({}, state);

  actions.forEach(action => {
    const { keysToRemove, extraData } = action;

    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, extraData);

        break;

      case 'removeProperties':
        for (const i of keysToRemove) {
          delete (copyOfState[i]);
        }

        break;

      case 'clear' :
        for (const element in copyOfState) {
          delete copyOfState[element];
        }
    };
    result.push({ ...copyOfState });
  });

  return result;
}

module.exports = transformStateWithClones;
