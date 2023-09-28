import { animated, useSpring, useTrail } from 'react-spring';
import { useEffect, useState } from 'react';

export const FadeIn = ({ show, children }) => {
	const [{ opacity, ...style }, api] = useSpring(() => ({
		opacity: 0,
		backgroundColor: 'lightgrey',
		padding: '5px',
		borderRadius: '10px',
		color: 'red',
	}));

	useEffect(() => {
		api.start({ opacity: show ? 1 : 0, config: { duration: 2000 } });
	}, [show, api]);

	return (
		<animated.div
			style={{ opacity, ...style, border: '0', backgroundColor: 'transparent' }}
		>
			{children}
		</animated.div>
	);
};

export const ScaleUp = ({ show, children }) => {
	const [{ transform, ...style }, api] = useSpring(() => ({
		transform: 'scale(0)',
		backgroundColor: 'lightgrey',
		padding: '5px',
		borderRadius: '10px',
		color: 'red',
	}));

	useEffect(() => {
		api.start({
			transform: show ? 'scale(1)' : 'scale(0)',
			config: { tension: 90, friction: 8, mass: 2 },
		});
	}, [show, api]);

	return (
		<animated.div style={{ transform, ...style }}>{children}</animated.div>
	);
};

// export const SlideDown = ({ show, children }) => {
// 	const [{ marginTop, ...style }, api] = useSpring(() => ({
// 		marginTop: '-500px',
// 		backgroundColor: 'lightgrey',
// 		padding: '5px',
// 		borderRadius: '10px',
// 		color: 'red',
// 	}));

// 	useEffect(() => {
// 		api.start({
// 			marginTop: show ? '0px' : '-700px',
// 			config: {
// 				tension: 180,
// 				friction: 12,
// 				mass: 1,
// 			},
// 		});
// 	}, [show, api]);

// 	return (
// 		<animated.div style={{ marginTop, ...style }}>{children}</animated.div>
// 	);
// };

export const SpinningIcon = ({ children }) => {
	const [flip, setFlip] = useState(false);

	const props = useSpring({
		from: { transform: 'perspective(600px) rotateY(0deg)' },
		to: { transform: 'perspective(600px) rotateY(180deg)' },
		reset: true,
		reverse: flip,
		onRest: () => setFlip(!flip),
		config: { duration: 2000 },
	});

	return <animated.div style={props}>{children}</animated.div>;
};

export const DropIn = ({ show, children }) => {
	const [{ y }, api] = useSpring(() => ({
		y: -150,
		config: {
			tension: 170,
			friction: 12,
			mass: 1,
			overshootClamping: false,
			restDisplacementThreshold: 0.01,
			restSpeedThreshold: 0.01,
		},
	}));

	useEffect(() => {
		api.start({ y: show ? 0 : -100 });
	}, [show, api]);

	return (
		<animated.div
			style={{ transform: y.interpolate((y) => `translateY(${y}%)`) }}
		>
			{children}
		</animated.div>
	);
};

export const ColorChange = ({ show, children }) => {
	const [{ backgroundColor, color, ...style }, api] = useSpring(() => ({
		backgroundColor: 'lightgrey',
		color: 'red',
		padding: '5px',
		borderRadius: '10px',
	}));

	useEffect(() => {
		api.start({
			backgroundColor: show ? 'red' : 'lightgrey',
			color: show ? 'white' : 'red',
			config: { tension: 10, friction: 5, mass: 1 },
		});
	}, [show, api]);

	return (
		<animated.div style={{ backgroundColor, color, ...style }}>
			{children}
		</animated.div>
	);
};

export const RotateAndSlideIn = ({ show, children }) => {
	const [{ transform, marginLeft, ...style }, api] = useSpring(() => ({
		transform: 'rotate(0deg) translateX(0px) translateY(0)',
		backgroundColor: 'lightgrey',
		padding: '5px',
		borderRadius: '10px',
		color: 'red',
	}));

	useEffect(() => {
		api.start({
			transform: show
				? 'rotate(1080deg) translateX(700px) translateY(700px)'
				: 'rotate(0deg) translateX(0px) translateY(0px)',
			config: {
				tension: 180,
				friction: 12,
				mass: 10,
			},
		});
	}, [show, api]);

	return (
		<animated.div style={{ transform, marginLeft, ...style }}>
			{children}
		</animated.div>
	);
};

export const TrailAnimation = ({ items, show }) => {
	const springs = useTrail(items.length, {
		opacity: show ? 1 : 0,
		config: { mass: 5, tension: 500, friction: 30, clamp: true },
	});

	return springs.map((style, index) => (
		<animated.div key={index} style={style}>
			{items[index]}
		</animated.div>
	));
};
