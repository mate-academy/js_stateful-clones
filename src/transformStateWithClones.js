'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStatement = [];

  const toModified = { ...state };

  for (const action of actions) {
    change(toModified, action);
    allStatement.push(Object.assign({}, toModified));
  }

  return allStatement;
}

function change(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete state[key];
      }
      break;

    case 'clear':
      for (const key in state) {
        delete state[key];
      }
      break;
  }
}

module.exports = transformStateWithClones;
