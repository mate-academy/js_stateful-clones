'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const loop = (actionsArr, currentState, acc) => {
    if (actionsArr.length === 0) {
      return acc;
    }

    const { type } = actionsArr[0];

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, actionsArr[0]['extraData']);
        acc.push(currentState);

        return loop(actionsArr.slice(1), { ...currentState }, acc);
      case 'removeProperties':
        actionsArr[0]['keysToRemove'].forEach(key => delete currentState[key]);
        acc.push(currentState);

        return loop(actionsArr.slice(1), { ...currentState }, acc);
      case 'clear':
        acc.push({});

        return loop(actionsArr.slice(1), {}, acc);
    }
  };

  return loop(actions, { ...state }, []);
}

module.exports = transformStateWithClones;
