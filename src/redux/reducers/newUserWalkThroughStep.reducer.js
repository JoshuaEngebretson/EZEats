const newUserWalkThroughStep = (state = 0, action) => {
	switch (action.type) {
		case "NEXT_WALK_THROUGH_STEP":
			if (state < 4) {
				return state + 1;
			} else {
				return 0;
			}

		case "RESET_NEW_USER_WALK_THROUGH":
			return 0;
		default:
			return state;
	}
};

export default newUserWalkThroughStep;
