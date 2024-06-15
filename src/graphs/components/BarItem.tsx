import { Property } from "csstype";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PercentLabelComp, StyleSheet } from "../horizontal-bar-graphs-types";
import GraphDivider from "./GraphDivider";
import PercentLabel from "./PercentLabel";

const getStyles = (barHeight: number, barHolderColor: Property.Color, color: Property.Color) =>
	StyleSheet.create({
		barItemCont: {
			display: "flex",
			boxSizing: "border-box",
			flexDirection: "column",
		},
		labelDefault: { color: "#999999", fontSize: barHeight / 2 },
		rowCenter: {
			display: "flex",
			boxSizing: "border-box",
			flexDirection: "row",
			alignItems: "center",
		},
		barHolder: {
			display: "flex",
			boxSizing: "border-box",
			flexDirection: "row",
			flex: 1,
			position: "relative",
			height: barHeight,
			alignItems: "center",
			overflow: "hidden",
			backgroundColor: barHolderColor,
		},
		barColored: {
			display: "flex",
			boxSizing: "border-box",
			flexDirection: "column",
			position: "absolute",
			height: barHeight,
			backgroundColor: color,
		},
		valueCont: {
			display: "flex",
			boxSizing: "border-box",
			flexDirection: "column",
			position: "absolute",
			minWidth: barHeight,
			height: barHeight,
			justifyContent: "center",
			alignItems: "center",
		},
		valueText: {
			fontSize: barHeight / 2,
			fontWeight: "bold",
			color: "#F0F0F0",
		},
		roundedLeftBar: {
			borderTopLeftRadius: barHeight / 2,
			borderBottomLeftRadius: barHeight / 2,
		},
		roundedRightBar: {
			borderTopRightRadius: barHeight / 2,
			borderBottomRightRadius: barHeight / 2,
		},
	});

interface IBarItemProps {
	readonly isMobile: boolean;
	/** 설문 문항 내용 */
	readonly label: string;
	readonly showLabel: boolean;
	readonly labelStyle?: CSSProperties;
	readonly labelClassName?: string;

	readonly index: number;

	/** 문항의 답변 수 */
	readonly value: number;
	readonly showValue: boolean;
	readonly labelPosition: "top" | "bottom";
	readonly valuePosition: "left" | "right";
	readonly valueSuffixCnt: number;
	readonly valueSuffixList: string[];

	/** 그래프에서의 색 */
	readonly color: Property.Color;
	readonly onPress:
		| ((label: string, value: number, color: Property.Color) => void | Promise<void>)
		| undefined;

	readonly totalCnt: number;

	readonly barHeight: number;
	readonly barHolderColor: Property.Color;
	readonly barDistance: number;
	readonly barAnimated: boolean;
	readonly barAnimateDelay: number;
	readonly barLeftStyle: "rounded" | "square";
	readonly barRightStyle: "rounded" | "square";
	readonly barHolderRightStyle: "rounded" | "square";

	readonly showDivider: boolean;
	readonly dividerInterver: 4 | 5 | 10 | 20 | 25 | 33.3 | 50;
	readonly dividerHeight: string | number;
	readonly dividerColor: Property.Color;
	readonly dividerWidth: number;

	readonly percentPosition: "left" | "right" | "none";
	readonly percentFixed: 0 | 1 | 2;
	readonly PercentLabelComponent: PercentLabelComp | null | undefined;

	readonly enableTouchHighlight: boolean;
}

export default function BarItem(props: IBarItemProps) {
	const valPercent = useMemo(() => {
		if (props.totalCnt === 0) {
			return 0;
		}
		return Math.round((props.value / props.totalCnt) * 100);
	}, [props.totalCnt, props.value]);

	const [hover, setHover] = useState(false);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const barRef = useRef<HTMLDivElement>(null);
	const [colorBarWidth, setColorBarWidth] = useState<number>(props.barHeight);
	useEffect(() => {
		if (barRef.current === null) {
			return;
		}

		const observer = new ResizeObserver(() => {
			if (barRef.current === null) {
				return;
			}
			const bar = barRef.current.offsetWidth;
			// setBarWidth(bar);
			setColorBarWidth(props.barHeight + (bar * valPercent) / 100);
		});

		observer.observe(barRef.current);

		// eslint-disable-next-line consistent-return
		return () => {
			observer.disconnect();
		};
	}, [props.barHeight, valPercent]);

	const transitions = useMemo<CSSProperties>(() => {
		if (props.barAnimated === false) {
			return {};
		}
		return {
			transitionProperty: "width",
			transitionDuration: "500ms",
			transitionTimingFunction: "ease",
			transitionDelay: `${props.barAnimateDelay * (props.index + 1)}ms`,
		};
	}, [props.barAnimateDelay, props.barAnimated, props.index]);

	const { PercentLabelComponent } = props;

	const getValueSuffix = useCallback(
		(value: number, suffixCnt: number, suffixIdx: number): string => {
			const dividing = value / suffixCnt;
			const showUnderNum = value % suffixCnt >= suffixCnt * 0.1;

			if (dividing >= 1) {
				if (dividing < suffixCnt) {
					return `${
						dividing.toFixed(showUnderNum ? 1 : 0) + props.valueSuffixList[suffixIdx]
					}  `;
				}
				const nextIdx = suffixIdx + 1;
				if (nextIdx >= props.valueSuffixList.length) {
					return `${
						dividing.toFixed(showUnderNum ? 1 : 0) + props.valueSuffixList[suffixIdx]
					}  `;
				}
				return getValueSuffix(dividing, suffixCnt, nextIdx);
			}
			return value.toString();
		},
		[props.valueSuffixList],
	);

	const valueWithSuffix = useMemo(() => {
		if (props.valueSuffixCnt <= 0) {
			return props.value.toLocaleString();
		}
		const val = getValueSuffix(props.value, props.valueSuffixCnt, 0);
		return val;
	}, [getValueSuffix, props.value, props.valueSuffixCnt]);

	const onTouching = useCallback(
		(touched: boolean) => {
			if (props.enableTouchHighlight && props.isMobile) {
				setIsTouched(touched);
			}
		},
		[props.enableTouchHighlight, props.isMobile],
	);

	const onHover = useCallback(
		(hov: boolean) => {
			if (props.enableTouchHighlight && props.isMobile === false) {
				setHover(hov);
			}
		},
		[props.enableTouchHighlight, props.isMobile],
	);

	const styles = getStyles(props.barHeight, props.barHolderColor, props.color);
	const isInteraction = isTouched || hover;

	const labelStyle = useMemo<CSSProperties>(
		() => ({
			...styles.labelDefault,
			...props.labelStyle,
			...(isInteraction && { color: props.color }),
		}),
		[isInteraction, props.color, props.labelStyle, styles.labelDefault],
	);

	return (
		<div
			role="presentation"
			style={{
				...styles.barItemCont,
				marginTop: props.barDistance,
				opacity: isInteraction ? 0.6 : 1,
			}}
			onFocus={() => {}}
			onMouseOver={() => onHover(true)}
			onMouseLeave={() => onHover(false)}
			onTouchStart={() => onTouching(true)}
			onMouseUp={() => onTouching(false)}
			onContextMenu={() => onTouching(false)}
			onPointerCancel={() => onTouching(false)}
			onClick={() => {
				if (props.onPress !== undefined) {
					props.onPress(props.label, props.value, props.color);
				}
			}}>
			{/* label */}
			{props.showLabel && props.labelPosition === "top" && (
				<div className={props.labelClassName} style={labelStyle}>
					{props.label}
				</div>
			)}
			<div style={styles.rowCenter}>
				{/* left percent label */}
				{props.percentPosition === "left" &&
					(PercentLabelComponent !== undefined && PercentLabelComponent !== null ? (
						<PercentLabelComponent
							value={props.value}
							total={props.totalCnt}
							color={props.color}
						/>
					) : (
						<PercentLabel
							value={props.value}
							valueColor={isInteraction ? props.color : undefined}
							barHeight={props.barHeight}
							totalCnt={props.totalCnt}
							percentFixed={props.percentFixed}
							textAlign={props.percentPosition}
						/>
					))}
				<div
					style={{
						...styles.barHolder,
						...(props.barLeftStyle === "rounded" && styles.roundedLeftBar),
						...(props.barHolderRightStyle === "rounded" && styles.roundedRightBar),
					}}>
					<div
						ref={barRef}
						style={{
							...styles.barHolder,
						}}>
						{props.showDivider && (
							<GraphDivider
								leftPosition={props.barHeight}
								dividerInterver={props.dividerInterver}
								dividerHeight={props.dividerHeight}
								dividerColor={props.dividerColor}
								dividerWidth={props.dividerWidth}
							/>
						)}
						<div
							style={{
								...styles.barColored,
								width: colorBarWidth,
								...transitions,
								...(props.barLeftStyle === "rounded" && styles.roundedLeftBar),
								...(props.barRightStyle === "rounded" && styles.roundedRightBar),
							}}>
							{props.showValue && (
								<div
									style={{
										...styles.valueCont,
										...(props.valuePosition === "right" && { right: 0 }),
										...(props.valuePosition === "left" && { left: 0 }),
									}}>
									<div style={styles.valueText}>
										{valueWithSuffix}
										{valPercent >= 5 ? " " : ""}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				{props.percentPosition === "right" &&
					(PercentLabelComponent !== undefined && PercentLabelComponent !== null ? (
						<PercentLabelComponent
							value={props.value}
							total={props.totalCnt}
							color={props.color}
						/>
					) : (
						<PercentLabel
							value={props.value}
							valueColor={isInteraction ? props.color : undefined}
							barHeight={props.barHeight}
							totalCnt={props.totalCnt}
							percentFixed={props.percentFixed}
							textAlign={props.percentPosition}
						/>
					))}
			</div>
			{props.showLabel && props.labelPosition === "bottom" && (
				<div className={props.labelClassName} style={labelStyle}>
					{props.label}
				</div>
			)}
		</div>
	);
}
