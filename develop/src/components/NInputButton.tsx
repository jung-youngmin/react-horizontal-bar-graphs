import { CSSProperties } from "react";
import ColorButton from "./ColorButton";
import ColorPalette from "./ColorPalette";
import styles from "./styles.module.css";

interface IInputData {
	readonly label: string;
	readonly inputType: "text" | "number" | "color";
	readonly isRequired: boolean;
	readonly defaultVal?: string;
	readonly value?: string;
	readonly placeholder?: string;
}

interface INInputButtonProps {
	readonly inputData: IInputData[];
	readonly onClickSubmit: (inputVal: string) => void;
	readonly style?: CSSProperties;
	readonly className?: string;
}
export default function NInputButton(props: INInputButtonProps) {
	const { onClickSubmit } = props;
	// const [text, setText] = useState(props.defaultVal);

	// useEffect(() => {
	// 	if (props.value !== undefined) {
	// 		setText(props.value);
	// 	}
	// }, [props.value]);

	// const onSubmit = useCallback(() => {
	// 	if (text === "") {
	// 		return;
	// 	} else {
	// 		onClickSubmit(text);
	// 	}
	// }, [text, onClickSubmit]);

	// const onEnterKey = useCallback(
	// 	(e: React.KeyboardEvent<HTMLInputElement>) => {
	// 		if (e.key === "Enter") {
	// 			onSubmit();
	// 		}
	// 	},
	// 	[onSubmit],
	// );

	return (
		<div className={props.className} style={props.style}>
			<div style={{ display: "flex", flexDirection: "row" }}>
				{props.inputData.map((item, index) => {
					return (
						<div key={index} style={{ display: "flex", flexDirection: "column" }}>
							<span className={styles.subLabel}>{item.label}</span>
							{item.inputType === "color" ? (
								<ColorPalette
									onPressColor={color => {
										// alert(color);
									}}
								/>
							) : (
								<input
									type={item.inputType}
									value={item.defaultVal}
									placeholder={item.placeholder}
									className={styles.myInput}
									step={10}
									style={{
										boxSizing: "border-box",
										width: 100,
										padding: 8,
										borderRadius: 12,
										marginRight: 8,
										borderWidth: 1,
										borderStyle: "solid",
										borderColor: "darkgray",
									}}
									onChange={e => {
										// setText(e.target.value);
									}}
									// onKeyDown={onEnterKey}
								/>
							)}
						</div>
					);
				})}

				<ColorButton
					label={"reset"}
					isActive={false}
					showIcon={false}
					style={{ marginRight: 4 }}
					onClick={() => {
						// setText(props.defaultVal);
						// props.onClickSubmit(props.defaultVal);
					}}
				/>
				<ColorButton
					label={"submit"}
					isActive
					showIcon={false}
					onClick={() => {}}
					// onClick={onSubmit}
				/>
			</div>
		</div>
	);
}
