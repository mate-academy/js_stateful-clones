'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
	const stateClone = { ...state };
	const resultArray = [];

	for (const action of actions) {
		if (action.type === 'addProperties') {
			for (const key in action.extraData) {
				stateClone[key] = action.extraData[key];
			}
		}

		if (action.type === 'removeProperties') {
			for (const keyToRemove of action.keysToRemove) {
				if (stateClone[keyToRemove]) {
					delete stateClone[keyToRemove];
				}
			}
		}

		if (action.type === 'clear') {
			for (const keyState in stateClone) {
				delete stateClone[keyState];
			}
		}
		resultArray.push({ ...stateClone });
	}

	return resultArray;
}

module.exports = transformStateWithClones;
