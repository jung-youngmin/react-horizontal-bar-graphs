import { Property } from "csstype";
import { CSSProperties, useMemo } from "react";

interface IPercentLabelProps {
	readonly value: number;
	readonly valueColor: Property.Color | undefined;
	readonly totalCnt: number;
	readonly barHeight: number;
	readonly percentFixed: 0 | 1 | 2;
	readonly textAlign: "left" | "right" | "none";
}

export default function PercentLabel(props: IPercentLabelProps) {
	const largeSize = useMemo(() => Math.round((props.barHeight / 2) * 1.3), [props.barHeight]);
	const smallSize = useMemo(() => Math.round(props.barHeight / 2), [props.barHeight]);

	const percentInteger = useMemo(
		() => Math.round((props.value / props.totalCnt) * 100).toFixed(0),
		[props.value, props.totalCnt],
	);

	const percentDecimal = useMemo(() => {
		if (props.percentFixed <= 0) {
			return null;
		}
		return (((props.value / props.totalCnt) * 100) % 1)
			.toFixed(props.percentFixed)
			.split(".")[1];
	}, [props.value, props.totalCnt, props.percentFixed]);

	const textAlign = useMemo<CSSProperties>(() => {
		if (props.textAlign === "left") {
			return { justifyContent: "flex-start" };
		}
		if (props.textAlign === "right") {
			return { justifyContent: "flex-end" };
		}
		return { justifyContent: "flex-end" };
	}, [props.textAlign]);

	const percentWidth = useMemo(() => {
		const calcWidth = Math.round(
			(props.barHeight / 2) * 1.3 * 2 * 0.85 +
				(props.barHeight / 2) * props.percentFixed * 0.7 +
				(props.barHeight / 2) * 0.65 * 2 +
				4,
		);
		return calcWidth;
	}, [props.barHeight, props.percentFixed]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				boxSizing: "border-box",
				alignItems: "baseline",
				width: percentWidth,
				...textAlign,
			}}>
			<div
				// allowFontScaling={false}
				// numberOfLines={1}
				style={{ fontSize: largeSize, fontWeight: "bold", color: props.valueColor }}>
				{percentInteger}
			</div>
			{percentDecimal !== null && (
				<div
					// allowFontScaling={false}
					// numberOfLines={1}
					style={{ fontSize: smallSize, color: props.valueColor }}>
					{`.${percentDecimal}`}
				</div>
			)}
			<div
				// allowFontScaling={false}
				// numberOfLines={1}
				style={{ fontSize: smallSize, color: props.valueColor }}>
				{" %"}
			</div>
		</div>
	);
}
