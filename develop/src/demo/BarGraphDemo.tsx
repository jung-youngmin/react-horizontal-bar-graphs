import { Property } from "csstype";
import { useCallback, useMemo, useRef, useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import ColorButton from "../components/ColorButton";
import InputButton from "../components/InputButton";
// import { AndroidMockup, AndroidTabMockup } from "../dist";
// import { AndroidMockup, AndroidTabMockup } from "react-device-mockup";
import moment from "moment";
import ColorPalette from "../components/ColorPalette";
import ColorSample from "../components/ColorSample";
import Input from "../components/Input";
import { BarGraph, IBarGraphData } from "../dist";
import CodeBlock from "./CodeBlock";
import demoStyle from "./demo.module.css";

interface IAndroidDemoProps {
	readonly mode: "phone" | "tab";
	readonly showDemo: boolean;
	readonly onPressPng: (ref: React.RefObject<HTMLDivElement>) => void;
}
export default function BarGraphDemo(props: IAndroidDemoProps) {
	const DEFAULT_SCREEN_WIDTH = 200;
	const DEFAULT_FRAME_COLOR = "#666666";
	const DEFAULT_STATUS_BAR_COLOR = "#CCCCCC";

	const DEFAULT_TITLE_POSITION = "top";
	const DEFAULT_BAR_HEIGHT = 28;
	const DEFAULT_BAR_DISTANCE = 12;
	const DEFAULT_HOLDER_COLOR = "#EEEEEE";
	const DEFAULT_DIVIDER_HEIGHT = 60;
	const DEFAULT_DIVIDER_COLOR = "#BBBBBB";
	const DEFAULT_ANIM_DELAY = 60;

	const BAR_DATA: IBarGraphData[] = useMemo(() => {
		return [
			{
				value: 10,
				label: "Label 0",
				onPress: (label, value, color) => {
					alert(label + value + "__" + color.toString());
				},
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
	const [barLeftStyle, setBarLeftStyle] = useState<"rounded" | "square">("rounded");
	const [barRightStyle, setBarRightStyle] = useState<"rounded" | "square">("rounded");
	const [barHolderRightStyle, setBarHolderRightStyle] = useState<"rounded" | "square">("rounded");
	const [showDivider, setShowDivider] = useState<boolean>(true);
	const [dividerInterver, setDividerInterver] = useState<20 | 4 | 5 | 10 | 25 | 33.3 | 50>(20);
	const [dividerHeight, setDividerHeight] = useState<number>(DEFAULT_DIVIDER_HEIGHT);
	const [dividerColor, setDividerColor] = useState<Property.Color>(DEFAULT_DIVIDER_COLOR);
	const [dividerWidth, setDividerWidth] = useState<number>(1);
	const [percentPosition, setPercentPosition] = useState<"none" | "left" | "right">("right");
	const [percentFixed, setPercentFixed] = useState<0 | 1 | 2>(0);
	const [enableTouchHighlight, setEnableTouchHighlight] = useState(true);

	//////////////////////////////
	const [screenWidth, setScreenWidth] = useState(DEFAULT_SCREEN_WIDTH);
	const [noRoundedScreen, setNoRoundedScreen] = useState(false);
	const [isLandscape, setIsLandscape] = useState(false);
	const [hideStatusBar, setHideStatusBar] = useState(false);
	const [frameColor, setFrameColor] = useState<Property.Color>(DEFAULT_FRAME_COLOR);
	const [frameOnly, setFrameOnly] = useState<boolean>(false);
	const [statusbarColor, setStatusbarColor] = useState<Property.Color>(DEFAULT_STATUS_BAR_COLOR);
	const [navBar, setNavBar] = useState<"swipe" | "bhr" | "rhb">("swipe");
	const [navBarColor, setNavBarColor] = useState<Property.Color>(DEFAULT_STATUS_BAR_COLOR);
	const [transparentNavBar, setTransparentNavBar] = useState<boolean>(false);
	const [hideNavBar, setHideNavBar] = useState<boolean>(false);
	const [transparentCamArea, setTransparentCamArea] = useState<boolean>(false);

	const [showScreenDemo, setShowScreenDemo] = useState<boolean>(false);

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
		setBarLeftStyle("rounded");
		setBarRightStyle("rounded");
		setBarHolderRightStyle("rounded");

		setShowDivider(true);
		setDividerInterver(20);
		setDividerHeight(DEFAULT_DIVIDER_HEIGHT);
		setDividerColor(DEFAULT_DIVIDER_COLOR);
		setDividerWidth(1);

		setPercentPosition("right");
		setPercentFixed(0);

		setEnableTouchHighlight(true);

		// setScreenWidth(DEFAULT_SCREEN_WIDTH);
		// setNoRoundedScreen(false);
		// setIsLandscape(false);
		// setHideStatusBar(false);
		// setFrameColor(DEFAULT_FRAME_COLOR);
		// setFrameOnly(false);
		// setStatusbarColor(DEFAULT_STATUS_BAR_COLOR);
		// setNavBar("swipe");
		// setNavBarColor(DEFAULT_STATUS_BAR_COLOR);
		// setTransparentNavBar(false);
		// setHideNavBar(false);
		// setTransparentCamArea(false);
		// setShowScreenDemo(false);
	}, []);

	const samplecode = useMemo(() => {
		let code = props.mode === "phone" ? "<AndroidMockup" : "<AndroidTabMockup";
		code += `\n  screenWidth={${screenWidth}}`;

		if (isLandscape) {
			code += `\n  isLandscape`;
		}

		if (noRoundedScreen) {
			code += `\n  noRoundedScreen`;
		}

		if (frameColor !== DEFAULT_FRAME_COLOR) {
			code += `\n  frameColor={"${frameColor}"}`;
		}

		if (frameOnly) {
			code += `\n  frameOnly`;
		}

		if (statusbarColor !== DEFAULT_STATUS_BAR_COLOR) {
			code += `\n  statusbarColor={"${statusbarColor}"}`;
		}

		if (hideStatusBar) {
			code += `\n  hideStatusBar`;
		}

		if (navBar !== "swipe") {
			code += `\n  navBar={"${navBar}"}`;
		}

		if (navBarColor !== DEFAULT_STATUS_BAR_COLOR) {
			code += `\n  navBarColor={"${navBarColor}"}`;
		}

		if (transparentNavBar) {
			code += `\n  transparentNavBar`;
		}

		if (hideNavBar) {
			code += `\n  hideNavBar`;
		}

		if (props.mode === "phone" && transparentCamArea) {
			code += `\n  transparentCamArea`;
		}

		code += ">";

		if (showScreenDemo) {
			code += "\n  <YourScreenDemo />";
		}

		code += props.mode === "phone" ? `\n</AndroidMockup>` : `\n</AndroidTabMockup>`;
		return code;
	}, [
		props.mode,
		screenWidth,
		isLandscape,
		noRoundedScreen,
		frameColor,
		frameOnly,
		statusbarColor,
		hideStatusBar,
		navBar,
		navBarColor,
		transparentNavBar,
		hideNavBar,
		transparentCamArea,
		showScreenDemo,
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
						style={{ borderRadius: 30, padding: 20, width: 300 }}
						className={demoStyle.card}
						title={title}
						titleStyle={{ color: "#555555", marginTop: 8, marginBottom: 8 }}
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
					/>
				</div>
			</div>
			{/* control panel */}
			<div className={`${demoStyle.flexColWrap} ${demoStyle.flexBox}`} style={{ flex: 1 }}>
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
				<h3 className={demoStyle.cardTitle}>Graph Data</h3>
				<div className={`${demoStyle.card} ${demoStyle.flexColWrap} ${demoStyle.pt8}`}>
					<form
						style={{
							display: "flex",
							flexDirection: "column",
						}}
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
							style={{ marginTop: 8, marginBottom: 8 }}
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
				</div>
				{/* Common */}
				<h3 className={demoStyle.cardTitle}>Common</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexRowWrap} ${demoStyle.pt8} ${demoStyle.flexAlignEnd}`}>
					<InputButton
						className={demoStyle["mt8mr30"]}
						label="totalCnt"
						inputType="number"
						placeholder="totalCnt"
						value={totalCnt?.toString()}
						onClickSubmit={onClickTotalCnt}
					/>
					<InputButton
						className={demoStyle["mt8mr30"]}
						label="title"
						inputType="text"
						placeholder="title"
						value={title}
						onClickSubmit={setTitle}
					/>
					<ButtonGroup
						className={demoStyle["mt8mr30"]}
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
					<ColorButton
						label="enableTouchHighlight"
						isActive={enableTouchHighlight}
						showIcon
						className={demoStyle["mt16mr16"]}
						onClick={() => setEnableTouchHighlight(prev => !prev)}
					/>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}></div>
				</div>

				{/* Bar */}
				<h3 className={demoStyle.cardTitle}>Bar</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd} ${demoStyle.pt8}`}>
					<InputButton
						label="barHeight"
						inputType="number"
						defaultVal={DEFAULT_BAR_HEIGHT.toString()}
						placeholder="barHeight"
						className={demoStyle["mt8mr30"]}
						onClickSubmit={inputVal => {
							setBarHeight(Number(inputVal));
						}}
					/>
					<InputButton
						label="barDistance"
						inputType="number"
						defaultVal={DEFAULT_BAR_DISTANCE.toString()}
						placeholder="barDistance"
						className={demoStyle["mt8mr30"]}
						onClickSubmit={inputVal => {
							setBarDistance(Number(inputVal));
						}}
					/>
					<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt8mr30"]}>
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
					<ColorButton
						label="barAnimated"
						isActive={barAnimated}
						showIcon
						className={demoStyle["mt16mr16"]}
						onClick={() => setBarAnimated(prev => !prev)}
					/>
					<InputButton
						label="barAnimateDelay (ms)"
						inputType="number"
						defaultVal={DEFAULT_ANIM_DELAY.toString()}
						placeholder="barAnimateDelay"
						className={demoStyle["mt8mr30"]}
						onClickSubmit={inputVal => {
							setBarAnimateDelay(Number(inputVal));
						}}
					/>
					<ButtonGroup
						className={demoStyle["mt8mr30"]}
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
						className={demoStyle["mt8mr30"]}
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
						className={demoStyle["mt8mr30"]}
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

				{/* Divider */}
				<h3 className={demoStyle.cardTitle}>Divider</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd} ${demoStyle.pt8}`}>
					<ColorButton
						label="showDivider"
						isActive={showDivider}
						showIcon
						className={demoStyle["mt16mr16"]}
						onClick={() => setShowDivider(prev => !prev)}
					/>
					<ButtonGroup
						title="dividerInterver"
						className={demoStyle["mt8mr30"]}
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
						className={demoStyle["mt8mr30"]}
						onClickSubmit={inputVal => {
							setDividerHeight(Number(inputVal));
						}}
					/>
					<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt8mr30"]}>
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
						className={demoStyle["mt8mr30"]}
						onClickSubmit={inputVal => {
							setDividerWidth(Number(inputVal));
						}}
					/>
				</div>

				{/* Percent Label */}
				<h3 className={demoStyle.cardTitle}>Percent Label</h3>
				<div className={`${demoStyle.card} ${demoStyle.flexColWrap} ${demoStyle.pt8}`}>
					<ButtonGroup
						title="percentPosition"
						className={demoStyle["mt8mr30"]}
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
						className={demoStyle["mt8mr30"]}
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
				</div>

				{/* code */}
				<CodeBlock title="Code" sampleCode={samplecode} />
			</div>
		</div>
	);
}
