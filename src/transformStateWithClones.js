'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const executeAction = (lastState, action) => {
    switch (action.type) {
      case 'clear':
        return {};
      case 'addProperties':
        return {
          ...lastState,
          ...action.extraData,
        };
      case 'removeProperties':
        const aux = { ...lastState };

        for (const key of action.keysToRemove) {
          delete aux[key];
        }

        return aux;
    }
  };

  return actions
    .reduce(
      (history, action) =>
        history.concat(executeAction(history.at(-1), action)),
      [state],
    )
    .slice(1);
}

module.exports = transformStateWithClones;
