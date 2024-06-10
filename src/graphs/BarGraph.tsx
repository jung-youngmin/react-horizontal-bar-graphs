import { CSSProperties, useMemo } from "react";
import BarItem from "./components/BarItem";
import consts from "./consts";
import { IHorizontalBarGraphsBaseProps, StyleSheet } from "./horizontal-bar-graphs-types";

export interface IBarGraphProps extends IHorizontalBarGraphsBaseProps {
	/**
	 * Distance between bars
	 * @description excluding the first bar
	 * @default 12
	 */
	readonly barDistance?: number;
	/**
	 * Delay time (ms) at which the animation of the bars begins
	 * @description 막대들의 애니메이션이 시작되는 지연 시간 (ms)
	 * @default 60
	 */
	readonly barAnimateDelay?: number;

	/**
	 * Whether to show each label of graphData
	 * @default true
	 */
	readonly showLabel?: boolean;
	/**
	 * Position of each label relative to the bar
	 * @description 막대를 기준으로 각 label의 포지션
	 * @default "top"
	 */
	readonly labelPosition?: "top" | "bottom";
	/**
	 * Styles for label
	 * @description By default fontSize is set to `barHeight/2`.
	 * @description When you touch the bar, the font color is highlighted in the bar color. If you don't want it, set `enableTouchHighlight` to `false`.
	 */
	readonly labelStyle?: CSSProperties;
	readonly labelClassName?: string;

	/**
	 * Whether to show the value above the bar
	 * @default true
	 */
	readonly showValue?: boolean;
	/**
	 * Position on the bar where the value is rendered
	 * @default "right"
	 */
	readonly valuePosition?: "left" | "right";
	/**
	 * Number to attach suffix when value exceeds valueSuffixCnt
	 * value가 valueSuffixCnt을 초과할 때 suffix를 붙이기 위한 숫자
	 * If set to 0, no suffix is appended.
	 * 0을 설정하면 suffix를 붙이지 않습니다
	 * @default 1000
	 */
	readonly valueSuffixCnt?: number;
	/**
	 * List of value suffix attached to value after dividing value by valueSuffixCnt
	 * value를 valueSuffixCnt로 나눈 후 value에 붙는 value suffix의 리스트
	 * @default ["k", "m", "b", "t"]
	 */
	readonly valueSuffixList?: string[];
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		boxSizing: "border-box",
		flexDirection: "column",
		flex: 1,
		position: "relative",
		width: 360,
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 16,
	},
});

export default function BarGraph(props: IBarGraphProps) {
	const {
		graphData,
		totalCnt,
		style,
		className,
		title,
		titleStyle,
		titlePosition = "top",
		barHeight = 28,
		barHolderColor = "#EEEEEE",
		barAnimated = true,
		barLeftStyle = "rounded",
		barRightStyle = "rounded",
		barHolderRightStyle = "rounded",
		showDivider = true,
		dividerInterver = 20,
		dividerHeight = "60%",
		dividerColor = "#BBBBBB",
		dividerWidth = 1,
		percentPosition = "right",
		percentFixed = 0,
		PercentLabelComponent,
		enableTouchHighlight = true,

		barDistance = 12,
		barAnimateDelay = 60,
		showLabel = true,
		labelPosition = "top",
		labelStyle,
		labelClassName,
		showValue = true,
		valuePosition = "right",
		valueSuffixCnt = 1000,
		valueSuffixList = ["k", "m", "b", "t"],
	} = props;

	const showTitle = title !== undefined && title !== "";

	const totalVal = useMemo(() => {
		if (totalCnt !== undefined) {
			return totalCnt;
		}

		let total = 0;
		graphData.forEach((item, index) => {
			total += item.value;
		});
		return total;
	}, [graphData, totalCnt]);

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	const { DEFAULT_COLORS } = consts;

	return (
		<div className={className} style={{ ...styles.container, ...style }}>
			{showTitle && titlePosition === "top" && (
				<div style={{ ...styles.title, ...titleStyle }}>{title}</div>
			)}
			{graphData.map((v, i) => {
				const barColor =
					v.color === undefined ? DEFAULT_COLORS[i % DEFAULT_COLORS.length] : v.color;
				return (
					<BarItem
						key={`${v.label}_${barColor}_${v.value}`}
						isMobile={isMobile}
						label={v.label}
						showLabel={showLabel}
						labelPosition={labelPosition}
						labelStyle={labelStyle}
						labelClassName={labelClassName}
						index={i}
						value={v.value}
						onPress={v.onPress}
						color={barColor}
						barHeight={barHeight}
						barHolderColor={barHolderColor}
						barDistance={i === 0 ? 0 : barDistance}
						barAnimated={barAnimated}
						barAnimateDelay={barAnimateDelay}
						barLeftStyle={barLeftStyle}
						barRightStyle={barRightStyle}
						barHolderRightStyle={barHolderRightStyle}
						showValue={showValue}
						valuePosition={valuePosition}
						valueSuffixCnt={valueSuffixCnt}
						valueSuffixList={valueSuffixList}
						totalCnt={totalVal}
						showDivider={showDivider}
						dividerInterver={dividerInterver}
						dividerHeight={dividerHeight}
						dividerColor={dividerColor}
						dividerWidth={dividerWidth}
						percentPosition={percentPosition}
						percentFixed={percentFixed}
						PercentLabelComponent={PercentLabelComponent}
						enableTouchHighlight={enableTouchHighlight}
					/>
				);
			})}
			{showTitle && titlePosition === "bottom" && (
				<div style={{ ...styles.title, ...titleStyle }}>{title}</div>
			)}
		</div>
	);
}
