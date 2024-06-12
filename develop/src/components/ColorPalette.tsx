import { Property } from "csstype";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import ColorSample from "./ColorSample";

interface IColorPalettePros {
	readonly onPressColor: (color: Property.Color | undefined) => void;
	readonly currentColor?: Property.Color;
	readonly style?: CSSProperties;
	readonly className?: string;
}

const COLORS: Property.Color[] = [
	"coral",
	"tomato",
	"orangered",
	"red",
	"crimson",
	"firebrick",

	"orange",
	"gold",
	"goldenrod",

	"cornflowerblue",
	"dodgerblue",
	"darkblue",

	"yellowgreen",
	"cadetblue",
	"darkcyan",
	"forestgreen",
	"darkgreen",

	"darkviolet",
	"deeppink",
	"black",
];

export default function ColorPalette(props: IColorPalettePros) {
	const [selectedColor, setSelectedColor] = useState(props.currentColor);

	useEffect(() => {
		setSelectedColor(props.currentColor);
	}, [props.currentColor]);

	const { onPressColor } = props;
	const onClickColor = useCallback(
		(c: Property.Color) => {
			if (selectedColor === c) {
				setSelectedColor(undefined);
				onPressColor(undefined);
			} else {
				setSelectedColor(c);
				onPressColor(c);
			}
		},
		[onPressColor, selectedColor],
	);
	return (
		<div
			className={props.className}
			style={{ display: "flex", flexWrap: "wrap", ...props.style }}>
			{COLORS.map((color, index) => {
				return (
					<ColorSample
						key={color}
						color={color}
						isSelected={color === selectedColor}
						onClick={onClickColor}
					/>
				);
			})}
		</div>
	);
}
