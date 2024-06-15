import { useCallback, useState } from "react";

export default function useButtonInteraction() {
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	const [hover, setHover] = useState(false);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const onHover = useCallback(
		(hov: boolean) => {
			if (isMobile === false) {
				setHover(hov);
			}
		},
		[isMobile],
	);

	const onTouching = useCallback(
		(touched: boolean) => {
			if (isMobile) {
				setIsTouched(touched);
			}
		},
		[isMobile],
	);

	return {
		isInteraction: isTouched || hover,
		onMouseOver: () => onHover(true),
		onMouseLeave: () => onHover(false),
		onTouchStart: () => onTouching(true),
		onMouseUp: () => onTouching(false),
		onContextMenu: () => onTouching(false),
		onPointerCancel: () => onTouching(false),
	};
}
