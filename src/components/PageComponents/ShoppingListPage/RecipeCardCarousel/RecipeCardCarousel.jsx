import { useEffect, useState } from "react";
import "./RecipeCardCarousel.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function RecipeCardCarousel(props) {
	const { children, show, infiniteLoop } = props;

	const [currentIndex, setCurrentIndex] = useState(0);
	const [length, setLength] = useState(children.length);

	const [isRepeating, setIsRepeating] = useState(
		infiniteLoop && children.length > show
	);
	const [transitionEnabled, setTransitionEnabled] = useState(true);

	const [touchPosition, setTouchPosition] = useState(null);

	useEffect(() => {
		setLength(children.length);
		setIsRepeating(infiniteLoop && children.length > show);
	}, [children, infiniteLoop, show]);

	useEffect(() => {
		if (isRepeating) {
			if (currentIndex === length) {
				setTransitionEnabled(false);
				setCurrentIndex(0);
			} else if (currentIndex < 0) {
				setTransitionEnabled(false);
				setCurrentIndex(length - 1);
			}
		}
	}, [currentIndex, isRepeating, length]);

	// Handling for next and prev buttons
	const next = () => {
		setCurrentIndex((prevState) => prevState + 1);
	};

	const prev = () => {
		setCurrentIndex((prevState) => prevState - 1);
	};
	// End Handling for next and prev buttons

	// Handling for Touchscreen devices
	const handleTouchStart = (e) => {
		const touchDown = e.touches[0].clientX;
		setTouchPosition(touchDown);
	};

	const handleTouchMove = (e) => {
		const touchDown = touchPosition;
		if (touchDown === null) return;

		const currentTouch = e.touches[0].clientX;
		const diff = touchDown - currentTouch;

		if (diff > 5) next();
		if (diff < -5) prev();
		setTouchPosition(null);
	};
	// End Handling for Touchscreen devices

	const handleTransitionEnd = () => {
		if (isRepeating) {
			if (currentIndex === -1) {
				setTransitionEnabled(false);
				setCurrentIndex(length - 1);
			} else if (currentIndex === length) {
				setTransitionEnabled(false);
				setCurrentIndex(0);
			}
		}
	};

	const renderExtraPrev = () => {
		let output = [];
		for (let i = 0; i < show; i++) {
			output.push(children[length - 1 - i]);
		}
		output.reverse();
		return output;
	};

	const renderExtraNext = () => {
		let output = [];
		for (let i = 0; i < show; i++) {
			output.push(children[i]);
		}
		return output;
	};

	const transitionDuration = 300; // Adjust the duration as needed

	const transitionStyle = {
		transform: `translateX(-${(currentIndex + show) * (100 / show)}%)`,
		transition: transitionEnabled
			? `transform ${transitionDuration}ms ease-in-out`
			: "none",
	};

	return (
		<div className="carousel-container">
			<div className="carousel-wrapper">
				<div
					className="carousel-content-wrapper"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
				>
					{(isRepeating || currentIndex > 0) && (
						<button className="left-arrow" onClick={prev}>
							<ArrowBackIosIcon />
						</button>
					)}
					<div
						className={`carousel-content show-${show}`}
						style={transitionStyle}
						onTransitionEnd={handleTransitionEnd}
					>
						{length > show && isRepeating && renderExtraPrev()}
						{children}
						{length > show && isRepeating && renderExtraNext()}
					</div>
					{(isRepeating || currentIndex < length - show) && (
						<button className="right-arrow" onClick={next}>
							<ArrowForwardIosIcon />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
