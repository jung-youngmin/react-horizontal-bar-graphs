import { Property } from "csstype";
import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import ColorButton from "../components/ColorButton";
import InputButton from "../components/InputButton";
// import { AndroidMockup, AndroidTabMockup } from "../dist";
// import { AndroidMockup, AndroidTabMockup } from "react-device-mockup";
import moment from "moment";
import Card from "../components/Card";
import ColorPalette from "../components/ColorPalette";
import ColorSample from "../components/ColorSample";
import Input from "../components/Input";
import { BarGraph, IBarGraphData } from "../dist";
import CodeBlock from "./CodeBlock";
import demoStyle from "./demo.module.css";

const DEFAULT_TITLE_POSITION = "top";
const DEFAULT_BAR_HEIGHT = 28;
const DEFAULT_BAR_DISTANCE = 12;
const DEFAULT_BAR_STYLE = "rounded";
const DEFAULT_HOLDER_COLOR = "#EEEEEE";
const DEFAULT_DIVIDER_HEIGHT = 60;
const DEFAULT_DIVIDER_COLOR = "#BBBBBB";
const DEFAULT_ANIM_DELAY = 60;
const DEFAULT_PERCENT_POSITION = "right";
const DEFAULT_LABEL_POSITION = "top";
const DEFAULT_VALUE_POSITION = "right";
const DEFAULT_SUFFIX_LIST = ["k", "m", "b", "t"];

interface IBarGraphDemoProps {
	readonly mode: "phone" | "tab";
	readonly showDemo: boolean;
	readonly onPressPng: (ref: React.RefObject<HTMLDivElement>) => void;
}
export default function BarGraphDemo(props: IBarGraphDemoProps) {
	const BAR_DATA: IBarGraphData[] = useMemo(() => {
		return [
			{
				value: 10,
				label: "Label 0",
				// onPress: (label, value, color) => {
				// 	alert(label + value + "__" + color.toString());
				// },
			},
			{
				value: 15,
				label: "Label 1",
			},
			{
				value: 15,
				label: "Label 2",
			},
			{
				value: 16,
				label: "Label 3",
			},
			{
				value: 24,
				label: "Label 4",
			},
			{
				value: 18,
				label: "Label 5",
			},
			{
				value: 12,
				label: "Label 6",
			},
			{
				value: 8,
				label: "Label 7",
			},
			{
				value: 45,
				label: "Label 8",
			},
			{
				value: 40,
				label: "Label 9",
			},
		];
	}, []);

	const [randomNum, setRandomNum] = useState<number>(0);
	const [graphData, setGraphData] = useState<IBarGraphData[]>([]);
	const [inputDataLabel, setInputDataLabel] = useState("");
	const [inputDataValue, setInputDataValue] = useState(0);
	const [inputDataColor, setInputDataColor] = useState<Property.Color>();
	const [totalCnt, setTotalCnt] = useState<number>();
	const onClickTotalCnt = useCallback((inputVal: string) => {
		if (inputVal === "") {
			setTotalCnt(undefined);
		} else {
			setTotalCnt(Number(inputVal));
		}
	}, []);
	const [title, setTitle] = useState("");
	const [titlePosition, setTitlePosition] = useState<"top" | "bottom">(DEFAULT_TITLE_POSITION);
	const [barHeight, setBarHeight] = useState<number>(DEFAULT_BAR_HEIGHT);
	const [barDistance, setBarDistance] = useState<number>(DEFAULT_BAR_DISTANCE);
	const [barHolderColor, setBarHolderColor] = useState<Property.Color>(DEFAULT_HOLDER_COLOR);
	const [barAnimated, setBarAnimated] = useState<boolean>(true);
	const [barAnimateDelay, setBarAnimateDelay] = useState<number>(DEFAULT_ANIM_DELAY);
	const [barLeftStyle, setBarLeftStyle] = useState<"rounded" | "square">(DEFAULT_BAR_STYLE);
	const [barRightStyle, setBarRightStyle] = useState<"rounded" | "square">(DEFAULT_BAR_STYLE);
	const [barHolderRightStyle, setBarHolderRightStyle] = useState<"rounded" | "square">(
		DEFAULT_BAR_STYLE,
	);
	const [showDivider, setShowDivider] = useState<boolean>(true);
	const [dividerInterver, setDividerInterver] = useState<20 | 4 | 5 | 10 | 25 | 33.3 | 50>(20);
	const [dividerHeight, setDividerHeight] = useState<number>(DEFAULT_DIVIDER_HEIGHT);
	const [dividerColor, setDividerColor] = useState<Property.Color>(DEFAULT_DIVIDER_COLOR);
	const [dividerWidth, setDividerWidth] = useState<number>(1);
	const [percentPosition, setPercentPosition] = useState<"none" | "left" | "right">(
		DEFAULT_PERCENT_POSITION,
	);
	const [percentFixed, setPercentFixed] = useState<0 | 1 | 2>(0);
	const [enableTouchHighlight, setEnableTouchHighlight] = useState(true);

	const [showLabel, setShowLabel] = useState(true);
	const [labelPosition, setLabelPosition] = useState<"top" | "bottom">(DEFAULT_LABEL_POSITION);

	const [showValue, setShowValue] = useState(true);
	const [valuePosition, setValuePosition] = useState<"left" | "right">(DEFAULT_VALUE_POSITION);
	const [valueSuffixCnt, setValueSuffixCnt] = useState<number>(1000);
	const [valueSuffixList, setValueSuffixList] = useState<string[]>(DEFAULT_SUFFIX_LIST);

	//////////////////////////////
	// const [screenWidth, setScreenWidth] = useState(DEFAULT_SCREEN_WIDTH);
	// const [noRoundedScreen, setNoRoundedScreen] = useState(false);
	// const [isLandscape, setIsLandscape] = useState(false);
	// const [hideStatusBar, setHideStatusBar] = useState(false);
	// const [frameColor, setFrameColor] = useState<Property.Color>(DEFAULT_FRAME_COLOR);
	// const [frameOnly, setFrameOnly] = useState<boolean>(false);
	// const [statusbarColor, setStatusbarColor] = useState<Property.Color>(DEFAULT_STATUS_BAR_COLOR);
	// const [navBar, setNavBar] = useState<"swipe" | "bhr" | "rhb">("swipe");
	// const [navBarColor, setNavBarColor] = useState<Property.Color>(DEFAULT_STATUS_BAR_COLOR);
	// const [transparentNavBar, setTransparentNavBar] = useState<boolean>(false);
	// const [hideNavBar, setHideNavBar] = useState<boolean>(false);
	// const [transparentCamArea, setTransparentCamArea] = useState<boolean>(false);

	// const [showScreenDemo, setShowScreenDemo] = useState<boolean>(false);

	// TODO:
	const resetAll = useCallback(() => {
		setGraphData([]);

		setInputDataLabel("");
		setInputDataValue(0);
		setInputDataColor(undefined);

		setTotalCnt(undefined);

		setTitle("");
		setTitlePosition(DEFAULT_TITLE_POSITION);

		setBarHeight(DEFAULT_BAR_HEIGHT);
		setBarDistance(DEFAULT_BAR_DISTANCE);
		setBarHolderColor(DEFAULT_HOLDER_COLOR);
		setBarAnimated(true);
		setBarAnimateDelay(DEFAULT_ANIM_DELAY);
		setBarLeftStyle(DEFAULT_BAR_STYLE);
		setBarRightStyle(DEFAULT_BAR_STYLE);
		setBarHolderRightStyle(DEFAULT_BAR_STYLE);

		setShowDivider(true);
		setDividerInterver(20);
		setDividerHeight(DEFAULT_DIVIDER_HEIGHT);
		setDividerColor(DEFAULT_DIVIDER_COLOR);
		setDividerWidth(1);

		setPercentPosition(DEFAULT_PERCENT_POSITION);
		setPercentFixed(0);

		setEnableTouchHighlight(true);

		setShowLabel(true);
		setLabelPosition(DEFAULT_LABEL_POSITION);

		setShowValue(true);
		setValuePosition(DEFAULT_VALUE_POSITION);
		setValueSuffixCnt(1000);
		setValueSuffixList(DEFAULT_SUFFIX_LIST);
	}, []);

	const getGraphDataCode = useCallback((data: IBarGraphData[]) => {
		const INDENT4 = "    ";
		const INDENT6 = "      ";

		let code = "[";

		data.forEach(item => {
			code += `\n${INDENT4}{`;
			code += `\n${INDENT6}label: "${item.label}",`;
			code += `\n${INDENT6}value: ${item.value},`;
			if (item.color !== undefined) {
				code += `\n${INDENT6}color: "${item.color}",`;
			}
			code += `\n${INDENT4}},`;
		});
		code += `\n  ]`;
		return code;
	}, []);

	const graphStyle = useMemo<CSSProperties>(() => {
		return {
			borderRadius: 30,
			padding: 20,
			width: 300,
			boxSizing: "border-box",
			display: "flex",
			backgroundColor: "white",
			boxShadow: "0px 0px 16px 0px #cfcfcf",
		};
	}, []);

	const titleStyle = useMemo<CSSProperties>(() => {
		return { color: "#555555", marginTop: 8, marginBottom: 8 };
	}, []);

	const getStyleCode = useCallback((styleObj: CSSProperties) => {
		const INDENT4 = "    ";
		const keys = Object.keys(styleObj);

		let code = "{";
		keys.forEach(key => {
			const val = styleObj[key as keyof CSSProperties];
			if (typeof val === "string") {
				code += `\n${INDENT4}${key}: "${val}",`;
			} else {
				code += `\n${INDENT4}${key}: ${val},`;
			}
		});
		code += `\n  }`;
		return code;
	}, []);

	// TODO:
	const samplecode = useMemo(() => {
		const INDENT2 = "  ";

		let code = "<BarGraph";
		code += `\n${INDENT2}graphData={${getGraphDataCode(
			graphData.length > 0 ? graphData : BAR_DATA,
		)}}`;

		if (totalCnt !== undefined) {
			code += `\n${INDENT2}totalCnt={${totalCnt}}`;
		}

		code += `\n${INDENT2}style={${getStyleCode(graphStyle)}}`;

		if (title.length > 0) {
			code += `\n${INDENT2}title="${title}"`;
			code += `\n${INDENT2}titleStyle={${getStyleCode(titleStyle)}}`;
		}

		if (titlePosition !== DEFAULT_TITLE_POSITION) {
			code += `\n${INDENT2}titlePosition="${titlePosition}"`;
		}

		if (barHeight !== DEFAULT_BAR_HEIGHT) {
			code += `\n${INDENT2}barHeight={${barHeight}}`;
		}

		if (barDistance !== DEFAULT_BAR_DISTANCE) {
			code += `\n${INDENT2}barDistance={${barDistance}}`;
		}

		if (barHolderColor !== DEFAULT_HOLDER_COLOR) {
			code += `\n${INDENT2}barHolderColor="${barHolderColor}"`;
		}

		if (barAnimated === false) {
			code += `\n${INDENT2}barAnimated={${barAnimated}}`;
		}

		if (barAnimateDelay !== DEFAULT_ANIM_DELAY) {
			code += `\n${INDENT2}barAnimateDelay={${barAnimateDelay}}`;
		}

		if (barLeftStyle !== DEFAULT_BAR_STYLE) {
			code += `\n${INDENT2}barLeftStyle="${barLeftStyle}"`;
		}

		if (barRightStyle !== DEFAULT_BAR_STYLE) {
			code += `\n${INDENT2}barRightStyle="${barRightStyle}"`;
		}

		if (barHolderRightStyle !== DEFAULT_BAR_STYLE) {
			code += `\n${INDENT2}barHolderRightStyle="${barHolderRightStyle}"`;
		}

		if (showDivider === false) {
			code += `\n${INDENT2}showDivider={${showDivider}}`;
		}

		if (dividerInterver !== 20) {
			code += `\n${INDENT2}dividerInterver={${dividerInterver}}`;
		}

		if (dividerHeight !== DEFAULT_DIVIDER_HEIGHT) {
			code += `\n${INDENT2}dividerHeight={${dividerHeight}}`;
		}

		if (dividerColor !== DEFAULT_DIVIDER_COLOR) {
			code += `\n${INDENT2}dividerColor="${dividerColor}"`;
		}

		if (dividerWidth !== 1) {
			code += `\n${INDENT2}dividerWidth={${dividerWidth}}`;
		}

		if (percentPosition !== DEFAULT_PERCENT_POSITION) {
			code += `\n${INDENT2}percentPosition="${percentPosition}"`;
		}

		if (percentFixed !== 0) {
			code += `\n${INDENT2}percentFixed={${percentFixed}}`;
		}

		if (enableTouchHighlight !== true) {
			code += `\n${INDENT2}enableTouchHighlight={${enableTouchHighlight}}`;
		}

		if (showLabel !== true) {
			code += `\n${INDENT2}showLabel={${showLabel}}`;
		}

		if (labelPosition !== DEFAULT_LABEL_POSITION) {
			code += `\n${INDENT2}labelPosition="${labelPosition}"`;
		}

		if (showValue !== true) {
			code += `\n${INDENT2}showValue={${showValue}}`;
		}

		if (valuePosition !== DEFAULT_VALUE_POSITION) {
			code += `\n${INDENT2}valuePosition="${valuePosition}"`;
		}

		if (valueSuffixCnt !== 1000) {
			code += `\n${INDENT2}valueSuffixCnt={${valueSuffixCnt}}`;
		}

		if (
			valueSuffixList.length !== 4 ||
			valueSuffixList[0] !== "k" ||
			valueSuffixList[1] !== "m" ||
			valueSuffixList[2] !== "b" ||
			valueSuffixList[3] !== "t"
		) {
			code += `\n${INDENT2}valueSuffixList={[${valueSuffixList
				.map(item => ` "${item}"`)
				.toString()} ]}`;
		}

		code += "\n/>";

		// if (showScreenDemo) {
		// 	code += "\n  <YourScreenDemo />";
		// }

		// code += `\n</BarGraph>`;
		return code;
	}, [
		BAR_DATA,
		barAnimateDelay,
		barAnimated,
		barDistance,
		barHeight,
		barHolderColor,
		barHolderRightStyle,
		barLeftStyle,
		barRightStyle,
		dividerColor,
		dividerHeight,
		dividerInterver,
		dividerWidth,
		enableTouchHighlight,
		getGraphDataCode,
		getStyleCode,
		graphData,
		graphStyle,
		labelPosition,
		percentFixed,
		percentPosition,
		showDivider,
		showLabel,
		showValue,
		title,
		titlePosition,
		titleStyle,
		totalCnt,
		valuePosition,
		valueSuffixCnt,
		valueSuffixList,
	]);

	const ref = useRef<HTMLDivElement>(null);

	return (
		<div
			className={demoStyle.flexRowWrap}
			style={{
				justifyContent: "center",
				display: props.showDemo ? "flex" : "none",
			}}>
			<div
				className={demoStyle.flexBox}
				style={{ display: "flex", alignItems: "flex-start" }}>
				<div ref={ref}>
					<BarGraph
						key={randomNum}
						graphData={graphData.length > 0 ? graphData : BAR_DATA}
						totalCnt={totalCnt}
						style={graphStyle}
						title={title}
						titleStyle={titleStyle}
						titlePosition={titlePosition}
						barHeight={barHeight}
						barDistance={barDistance}
						barHolderColor={barHolderColor}
						barAnimated={barAnimated}
						barAnimateDelay={barAnimateDelay}
						barLeftStyle={barLeftStyle}
						barRightStyle={barRightStyle}
						barHolderRightStyle={barHolderRightStyle}
						showDivider={showDivider}
						dividerInterver={dividerInterver}
						dividerHeight={dividerHeight}
						dividerColor={dividerColor}
						dividerWidth={dividerWidth}
						percentPosition={percentPosition}
						percentFixed={percentFixed}
						// TODO:
						// PercentLabelComponent={PercentLabelComponent}
						enableTouchHighlight={enableTouchHighlight}
						showLabel={showLabel}
						labelPosition={labelPosition}
						// TODO:
						// labelStyle
						// labelClassName
						showValue={showValue}
						valuePosition={valuePosition}
						valueSuffixCnt={valueSuffixCnt}
						valueSuffixList={valueSuffixList}
					/>
				</div>
			</div>
			{/* control panel */}
			<div className={`${demoStyle.flexCol} ${demoStyle.flexBox}`}>
				{/* Reset All, Download */}
				<div className={demoStyle.flexRowWrap}>
					<ColorButton
						label="Reset All"
						isActive={false}
						showIcon={false}
						style={{
							flex: 1,
							paddingTop: 8,
							paddingBottom: 8,
							justifyContent: "center",
							marginRight: 8,
						}}
						onClick={resetAll}
					/>
					<ColorButton
						label="🔄️ Reload"
						isActive={false}
						showIcon={false}
						style={{
							flex: 1,
							paddingTop: 8,
							paddingBottom: 8,
							justifyContent: "center",
							marginRight: 8,
							marginLeft: 8,
						}}
						onClick={() => setRandomNum(moment().valueOf())}
					/>
					<ColorButton
						label="Download Png"
						isActive
						showIcon={false}
						style={{
							flex: 1,
							paddingTop: 8,
							paddingBottom: 8,
							justifyContent: "center",
							marginLeft: 8,
						}}
						onClick={() => props.onPressPng(ref)}
					/>
				</div>

				{/* Graph Data */}
				<Card title="Graph Data" flexDirection="column">
					<form
						className={demoStyle.flexCol}
						onSubmit={event => {
							event.preventDefault();
							const newItem: IBarGraphData = {
								label: inputDataLabel,
								value: inputDataValue,
								color: inputDataColor,
							};
							setGraphData(prev => [...prev, newItem]);
						}}>
						<div style={{ display: "flex" }}>
							<Input
								label="label"
								value={inputDataLabel}
								inputType="text"
								inputWidth={120}
								isRequired
								defaultVal=""
								placeholder="label"
								style={{ marginRight: 16 }}
								onChange={setInputDataLabel}
							/>
							<Input
								label="value"
								value={inputDataValue.toString()}
								inputType="number"
								inputWidth={120}
								min={0}
								step={0.01}
								isRequired
								defaultVal="0"
								placeholder="value"
								onChange={text => setInputDataValue(Number(text))}
							/>
						</div>
						<ColorPalette
							currentColor={inputDataColor}
							style={{ marginTop: 8, marginBottom: 8, maxWidth: 400 }}
							onPressColor={setInputDataColor}
						/>
						<div style={{ display: "flex" }}>
							<ColorButton
								label="reset"
								type="reset"
								isActive={false}
								showIcon={false}
								style={{ justifyContent: "center", width: 100, marginRight: 4 }}
								onClick={() => {
									setInputDataLabel("");
									setInputDataValue(0);
									setInputDataColor(undefined);
								}}
							/>
							<ColorButton
								label="add"
								type="submit"
								isActive
								showIcon={false}
								style={{ justifyContent: "center", width: 100, marginLeft: 4 }}
								onClick={() => {}}
							/>
						</div>
					</form>
				</Card>

				{/* Common */}
				<Card title="Common" flexDirection="column" flexWrap="wrap">
					<InputButton
						label="totalCnt"
						inputType="number"
						placeholder="totalCnt"
						value={totalCnt?.toString()}
						onClickSubmit={onClickTotalCnt}
					/>
					<div className={demoStyle.flexRowWrap}>
						<InputButton
							className={demoStyle["mt8mr30"]}
							label="title"
							inputType="text"
							placeholder="title"
							value={title}
							onClickSubmit={setTitle}
						/>
						<ButtonGroup
							className={demoStyle.mt8}
							title="titlePosition"
							buttonData={[
								{
									label: "top",
									isActive: titlePosition === "top",
									onClick: () => setTitlePosition("top"),
								},
								{
									label: "bottom",
									isActive: titlePosition === "bottom",
									onClick: () => setTitlePosition("bottom"),
								},
							]}
						/>
					</div>
					<ColorButton
						label="enableTouchHighlight"
						isActive={enableTouchHighlight}
						showIcon
						className={demoStyle["mt16mr16"]}
						style={{ width: 200 }}
						onClick={() => setEnableTouchHighlight(prev => !prev)}
					/>
				</Card>

				{/* Bar */}
				<Card title="Bar" flexDirection="column">
					<div className={demoStyle.flexRowWrap + " " + demoStyle.flexAlignEnd}>
						<ColorButton
							label="barAnimated"
							isActive={barAnimated}
							showIcon
							className={demoStyle["mr16"]}
							onClick={() => setBarAnimated(prev => !prev)}
						/>
						<InputButton
							label="barAnimateDelay (ms)"
							inputType="number"
							defaultVal={DEFAULT_ANIM_DELAY.toString()}
							placeholder="barAnimateDelay"
							onClickSubmit={inputVal => {
								setBarAnimateDelay(Number(inputVal));
							}}
						/>
					</div>
					<InputButton
						label="barHeight"
						inputType="number"
						defaultVal={DEFAULT_BAR_HEIGHT.toString()}
						placeholder="barHeight"
						className={demoStyle["mt16"]}
						onClickSubmit={inputVal => {
							setBarHeight(Number(inputVal));
						}}
					/>
					<InputButton
						label="barDistance"
						inputType="number"
						defaultVal={DEFAULT_BAR_DISTANCE.toString()}
						placeholder="barDistance"
						className={demoStyle["mt16"]}
						onClickSubmit={inputVal => {
							setBarDistance(Number(inputVal));
						}}
					/>
					<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt16"]}>
						<InputButton
							label="barHolderColor"
							inputType="text"
							defaultVal={DEFAULT_HOLDER_COLOR.toString()}
							placeholder="barHolderColor"
							onClickSubmit={inputVal => {
								setBarHolderColor(inputVal);
							}}
						/>
						<ColorSample
							color={barHolderColor}
							style={{ margin: 0, marginBottom: 2, marginLeft: 8 }}
						/>
					</div>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle["mt16"]}`}>
						<ButtonGroup
							className={demoStyle["mr16"]}
							title="barLeftStyle"
							buttonData={[
								{
									label: "rounded",
									isActive: barLeftStyle === "rounded",
									onClick: () => setBarLeftStyle("rounded"),
								},
								{
									label: "square",
									isActive: barLeftStyle === "square",
									onClick: () => setBarLeftStyle("square"),
								},
							]}
						/>
						<ButtonGroup
							className={demoStyle["mr16"]}
							title="barRightStyle"
							buttonData={[
								{
									label: "rounded",
									isActive: barRightStyle === "rounded",
									onClick: () => setBarRightStyle("rounded"),
								},
								{
									label: "square",
									isActive: barRightStyle === "square",
									onClick: () => setBarRightStyle("square"),
								},
							]}
						/>
						<ButtonGroup
							title="barHolderRightStyle"
							buttonData={[
								{
									label: "rounded",
									isActive: barHolderRightStyle === "rounded",
									onClick: () => setBarHolderRightStyle("rounded"),
								},
								{
									label: "square",
									isActive: barHolderRightStyle === "square",
									onClick: () => setBarHolderRightStyle("square"),
								},
							]}
						/>
					</div>
				</Card>

				{/* Divider */}
				<Card title="Divider" flexDirection="column">
					<ColorButton
						label="showDivider"
						isActive={showDivider}
						showIcon
						style={{ width: 160 }}
						onClick={() => setShowDivider(prev => !prev)}
					/>
					<ButtonGroup
						title="dividerInterver"
						className={demoStyle["mt16"]}
						buttonSize={50}
						buttonData={[
							{
								label: "4",
								isActive: dividerInterver === 4,
								onClick: () => setDividerInterver(4),
							},
							{
								label: "5",
								isActive: dividerInterver === 5,
								onClick: () => setDividerInterver(5),
							},
							{
								label: "10",
								isActive: dividerInterver === 10,
								onClick: () => setDividerInterver(10),
							},
							{
								label: "20",
								isActive: dividerInterver === 20,
								onClick: () => setDividerInterver(20),
							},
							{
								label: "25",
								isActive: dividerInterver === 25,
								onClick: () => setDividerInterver(25),
							},
							{
								label: "33.3",
								isActive: dividerInterver === 33.3,
								onClick: () => setDividerInterver(33.3),
							},
							{
								label: "50",
								isActive: dividerInterver === 50,
								onClick: () => setDividerInterver(50),
							},
						]}
					/>
					<InputButton
						label="dividerHeight (%)"
						inputType="number"
						defaultVal={DEFAULT_DIVIDER_HEIGHT.toString()}
						placeholder="dividerHeight"
						className={demoStyle["mt16"]}
						onClickSubmit={inputVal => {
							setDividerHeight(Number(inputVal));
						}}
					/>
					<div className={`${demoStyle.flexAlignEnd} ${demoStyle["mt16"]}`}>
						<InputButton
							label="dividerColor"
							inputType="text"
							defaultVal={DEFAULT_DIVIDER_COLOR.toString()}
							placeholder="dividerColor"
							onClickSubmit={inputVal => {
								setDividerColor(inputVal);
							}}
						/>
						<ColorSample
							color={dividerColor}
							style={{ margin: 0, marginBottom: 2, marginLeft: 8 }}
						/>
					</div>
					<InputButton
						label="dividerWidth"
						inputType="number"
						defaultVal={"1"}
						placeholder="dividerWidth"
						className={demoStyle["mt16"]}
						onClickSubmit={inputVal => {
							setDividerWidth(Number(inputVal));
						}}
					/>
				</Card>

				{/* Percent Label */}
				<Card title="Percent Label" flexDirection="column">
					<ButtonGroup
						title="percentPosition"
						buttonData={[
							{
								label: "none",
								isActive: percentPosition === "none",
								onClick: () => setPercentPosition("none"),
							},
							{
								label: "left",
								isActive: percentPosition === "left",
								onClick: () => setPercentPosition("left"),
							},
							{
								label: "right",
								isActive: percentPosition === "right",
								onClick: () => setPercentPosition("right"),
							},
						]}
					/>
					<ButtonGroup
						title="percentFixed"
						className={demoStyle["mt16"]}
						buttonData={[
							{
								label: "0",
								isActive: percentFixed === 0,
								onClick: () => setPercentFixed(0),
							},
							{
								label: "1",
								isActive: percentFixed === 1,
								onClick: () => setPercentFixed(1),
							},
							{
								label: "2",
								isActive: percentFixed === 2,
								onClick: () => setPercentFixed(2),
							},
						]}
					/>
					{/* TODO: PercentLabelComponent */}
				</Card>

				{/* Label & value */}
				<Card title="Label & Value" flexDirection="column">
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
						<ColorButton
							label="showLabel"
							isActive={showLabel}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setShowLabel(prev => !prev)}
						/>
						<ButtonGroup
							title="labelPosition"
							className={demoStyle["mt8"]}
							buttonData={[
								{
									label: "top",
									isActive: labelPosition === "top",
									onClick: () => setLabelPosition("top"),
								},
								{
									label: "bottom",
									isActive: labelPosition === "bottom",
									onClick: () => setLabelPosition("bottom"),
								},
							]}
						/>
					</div>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
						<ColorButton
							label="showValue"
							isActive={showValue}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setShowValue(prev => !prev)}
						/>
						<ButtonGroup
							title="valuePosition"
							className={demoStyle["mt8mr30"]}
							buttonData={[
								{
									label: "left",
									isActive: valuePosition === "left",
									onClick: () => setValuePosition("left"),
								},
								{
									label: "right",
									isActive: valuePosition === "right",
									onClick: () => setValuePosition("right"),
								},
							]}
						/>
					</div>
					<InputButton
						label="valueSuffixCnt"
						inputType="number"
						defaultVal={"1000"}
						placeholder="valueSuffixCnt"
						className={demoStyle["mt8mr30"]}
						onClickSubmit={inputVal => {
							setValueSuffixCnt(Number(inputVal));
						}}
					/>
					<InputButton
						label="valueSuffixList "
						inputType="text"
						defaultVal={DEFAULT_SUFFIX_LIST.toString()}
						placeholder="valueSuffixList"
						className={demoStyle["mt8"]}
						onClickSubmit={inputVal => {
							const noSpace = inputVal.replace(/ /g, "");
							setValueSuffixList(noSpace.split(","));
						}}
					/>
					<span className={demoStyle.subLabel}>
						Separate each Suffix using '<code className={demoStyle.code}>,</code>'
					</span>
				</Card>

				{/* code */}
				<CodeBlock title="Code" sampleCode={samplecode} />
			</div>
		</div>
	);
}
