import { Property } from "csstype";
import React, { CSSProperties, useRef } from "react";
import useButtonInteraction from "../hooks/useButtonInteraction";

interface IColorSampleProps {
	readonly color: Property.Color;
	readonly onClick?: (color: Property.Color) => void;
	readonly isSelected?: boolean;
	readonly style?: CSSProperties;
	readonly className?: string;
}

function _ColorSample(props: IColorSampleProps) {
	const buttonInteraction = useButtonInteraction();
	const colorRef = useRef(null);

	return (
		<button
			type="button"
			ref={colorRef}
			className={props.className}
			style={{
				width: 28,
				height: 28,
				borderRadius: 28,
				margin: 8,
				padding: 0,
				borderWidth: props.isSelected ? 8 : 0,
				borderStyle: "solid",
				borderColor: props.color,
				// margin-bottom: 6px;
				// margin-left: 8px;
				backgroundColor: props.isSelected ? "white" : props.color,
				boxShadow: "0px 0px 16px 0px #cccccc",
				// transition: "border 1s easing",
				transitionProperty: "border",
				transitionDuration: "500ms",
				transitionTimingFunction: "ease",
				...(buttonInteraction.isInteraction && { opacity: 0.5 }),
				...props.style,
			}}
			onClick={() => props.onClick?.(props.color)}
			onMouseOver={buttonInteraction.onMouseOver}
			onMouseLeave={buttonInteraction.onMouseLeave}
			onTouchStart={buttonInteraction.onTouchStart}
			onMouseUp={buttonInteraction.onMouseUp}
			onContextMenu={buttonInteraction.onContextMenu}
			onPointerCancel={buttonInteraction.onPointerCancel}
		/>
	);
}
export default React.memo(_ColorSample);
