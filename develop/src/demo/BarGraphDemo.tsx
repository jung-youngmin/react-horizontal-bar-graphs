import { Property } from "csstype";
import { useCallback, useMemo, useRef, useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import ColorButton from "../components/ColorButton";
import InputButton from "../components/InputButton";
// import { AndroidMockup, AndroidTabMockup } from "../dist";
// import { AndroidMockup, AndroidTabMockup } from "react-device-mockup";
import ColorPalette from "../components/ColorPalette";
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

	const [graphData, setGraphData] = useState(BAR_DATA);
	const [inputDataLabel, setInputDataLabel] = useState("");
	const [inputDataValue, setInputDataValue] = useState(0);
	const [inputDataColor, setInputDataColor] = useState<Property.Color>();

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

	const resetAll = useCallback(() => {
		setScreenWidth(DEFAULT_SCREEN_WIDTH);
		setNoRoundedScreen(false);
		setIsLandscape(false);
		setHideStatusBar(false);
		setFrameColor(DEFAULT_FRAME_COLOR);
		setFrameOnly(false);
		setStatusbarColor(DEFAULT_STATUS_BAR_COLOR);
		setNavBar("swipe");
		setNavBarColor(DEFAULT_STATUS_BAR_COLOR);
		setTransparentNavBar(false);
		setHideNavBar(false);
		setTransparentCamArea(false);
		setShowScreenDemo(false);
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
					<BarGraph graphData={graphData} className={demoStyle.card} />
				</div>
			</div>
			{/* control panel */}
			<div className={`${demoStyle.flexColWrap} ${demoStyle.flexBox}`}>
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
						style={{ display: "flex", flexDirection: "column" }}
						onSubmit={event => {
							event.preventDefault();
							console.log(
								"@@@ input",
								inputDataLabel,
								inputDataValue,
								inputDataColor,
							);
						}}>
						<div style={{ display: "flex" }}>
							<Input
								label="label"
								value={inputDataLabel}
								inputType="text"
								isRequired
								defaultVal=""
								placeholder="label"
								style={{ marginRight: 16 }}
								onChange={text => setInputDataLabel(text)}
							/>
							<Input
								label="value"
								value={inputDataValue.toString()}
								inputType="number"
								min={0}
								isRequired
								defaultVal="0"
								placeholder="value"
								onChange={text => setInputDataValue(Number(text))}
							/>
						</div>
						<ColorPalette
							currentColor={inputDataColor}
							style={{ marginTop: 8, marginBottom: 8 }}
							onPressColor={color => {
								setInputDataColor(color);
							}}
						/>
						<ColorButton
							label="submit"
							type="submit"
							isActive
							showIcon={false}
							onClick={() => {}}
						/>
						<ColorButton
							label="reset"
							type="reset"
							isActive={false}
							showIcon={false}
							onClick={() => {
								setInputDataLabel("");
								setInputDataValue(0);
								setInputDataColor(undefined);
							}}
						/>
					</form>
				</div>
				<h3 className={demoStyle.cardTitle}>Common</h3>
				<div className={`${demoStyle.card} ${demoStyle.flexColWrap} ${demoStyle.pt8}`}>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
						<InputButton
							className={demoStyle["mt8mr30"]}
							label="✨ screenWidth"
							inputType="number"
							defaultVal={DEFAULT_SCREEN_WIDTH.toString()}
							value={screenWidth.toString()}
							placeholder="screenWidth"
							onClickSubmit={inputVal => {
								setScreenWidth(Number(inputVal));
							}}
						/>
						<ButtonGroup
							className={demoStyle["mt8mr30"]}
							title="screenWidth Preset"
							buttonData={[
								{
									label: "200",
									isActive: screenWidth === 200,
									onClick: () => setScreenWidth(200),
								},
								{
									label: "300",
									isActive: screenWidth === 300,
									onClick: () => setScreenWidth(300),
								},
								{
									label: "400",
									isActive: screenWidth === 400,
									onClick: () => setScreenWidth(400),
								},
							]}
						/>
					</div>
					<div className={demoStyle.flexRowWrap}>
						<ColorButton
							label="isLandscape"
							isActive={isLandscape}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setIsLandscape(prev => !prev)}
						/>
						<ColorButton
							label="noRoundedScreen"
							isActive={noRoundedScreen}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setNoRoundedScreen(prev => !prev)}
						/>
						<ColorButton
							label="showScreenDemo"
							isActive={showScreenDemo}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setShowScreenDemo(prev => !prev)}
						/>
					</div>
				</div>

				<h3 className={demoStyle.cardTitle}>Frame</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd} ${demoStyle.pt8}`}>
					<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt8mr30"]}>
						<InputButton
							label="frameColor"
							inputType="text"
							defaultVal={DEFAULT_FRAME_COLOR}
							placeholder="frameColor"
							onClickSubmit={inputVal => {
								setFrameColor(inputVal);
							}}
						/>
						<span
							className={demoStyle.colorSample}
							style={{ backgroundColor: frameColor }}
						/>
					</div>
					<ColorButton
						label="frameOnly"
						isActive={frameOnly}
						showIcon
						className={demoStyle["mt16mr16"]}
						onClick={() => setFrameOnly(prev => !prev)}
					/>
				</div>

				<h3 className={demoStyle.cardTitle}>Statusbar</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd} ${demoStyle.pt8}`}>
					<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt8mr30"]}>
						<InputButton
							label="statusbarColor"
							inputType="text"
							defaultVal={DEFAULT_STATUS_BAR_COLOR}
							placeholder="statusbarColor"
							onClickSubmit={inputVal => {
								setStatusbarColor(inputVal);
							}}
						/>
						<span
							className={demoStyle.colorSample}
							style={{ backgroundColor: statusbarColor }}
						/>
					</div>
					<ColorButton
						label="hideStatusBar"
						isActive={hideStatusBar}
						showIcon
						className={demoStyle["mt16mr16"]}
						onClick={() => setHideStatusBar(prev => !prev)}
					/>
				</div>

				<h3 className={demoStyle.cardTitle}>Navigation Bar</h3>
				<div className={`${demoStyle.card} ${demoStyle.flexColWrap} ${demoStyle.pt8}`}>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
						<ButtonGroup
							title="navBar"
							className={demoStyle["mt8mr30"]}
							buttonData={[
								{
									label: "swipe",
									isActive: navBar === "swipe",
									onClick: () => setNavBar("swipe"),
								},
								{
									label: "bhr",
									isActive: navBar === "bhr",
									onClick: () => setNavBar("bhr"),
								},
								{
									label: "rhb",
									isActive: navBar === "rhb",
									onClick: () => setNavBar("rhb"),
								},
							]}
						/>
						<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt8mr30"]}>
							<InputButton
								label="navBarColor"
								inputType="text"
								defaultVal={DEFAULT_STATUS_BAR_COLOR}
								placeholder="navBarColor"
								onClickSubmit={inputVal => {
									setNavBarColor(inputVal);
								}}
							/>
							<span
								className={demoStyle.colorSample}
								style={{ backgroundColor: navBarColor }}
							/>
						</div>
					</div>
					<div className={demoStyle.flexRowWrap + " " + demoStyle.flexAlignEnd}>
						<ColorButton
							label="transparentNavBar"
							isActive={transparentNavBar}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setTransparentNavBar(prev => !prev)}
						/>
						<ColorButton
							label="hideNavBar"
							isActive={hideNavBar}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setHideNavBar(prev => !prev)}
						/>
						{props.mode === "phone" && (
							<ColorButton
								label="transparentCamArea"
								isActive={transparentCamArea}
								showIcon
								className={demoStyle["mt16mr16"]}
								onClick={() => setTransparentCamArea(prev => !prev)}
							/>
						)}
					</div>
				</div>
				{props.mode === "phone" && (
					<div
						className={demoStyle.subLabel}
						style={{
							display: "initial",
							marginLeft: 16,
							marginTop: 4,
							textAlign: "center",
						}}>
						⚠️ <code className={demoStyle.code}>transparentCamArea</code> only works
						when
						<code className={demoStyle.code}> isLandscape=true</code>
					</div>
				)}
				{/* code */}
				<CodeBlock title="Code" sampleCode={samplecode} />
			</div>
		</div>
	);
}
