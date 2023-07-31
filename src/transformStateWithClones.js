'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const allStateData = [];

  for (const action of actions) {
    const typeAction = action.type;

    switch (typeAction) {
      case 'addProperties':
        add(copyState, action.extraData);
        allStateData.push({ ...copyState });
        break;

      case 'removeProperties':
        remove(copyState, action.keysToRemove);
        allStateData.push({ ...copyState });
        break;

      case 'clear':
        clear(copyState);
        allStateData.push({ ...copyState });
        break;
    }
  }

  return allStateData;
}

const add = (state, action) => {
  for (const key in action) {
    state[key] = action[key];
  }
};

const remove = (state, action) => {
  for (const key of action) {
    delete state[key];
  }
};

const clear = (state) => {
  for (const key in state) {
    delete state[key];
  }
};

module.exports = transformStateWithClones;
