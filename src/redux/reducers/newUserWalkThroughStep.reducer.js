const newUserWalkThroughStep = (state = 0, action) => {
	switch (action.type) {
		case "NEXT_WALK_THROUGH_STEP":
			return state + 1;

		case "PREV_WALK_THROUGH_STEP":
			if (state >= 1) {
				return state - 1;
			} else {
				return state;
			}

		case "RESET_NEW_USER_WALK_THROUGH":
			return 0;
		default:
			return state;
	}
};

export default newUserWalkThroughStep;
