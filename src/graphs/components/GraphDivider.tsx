import { Property } from "csstype";
import { useMemo } from "react";

interface IGraphDividerProps {
	readonly dividerInterver: 4 | 5 | 10 | 20 | 25 | 33.3 | 50;
	readonly leftPosition: number;
	/** default: "60%" */
	readonly dividerHeight: string | number | undefined;
	/** default: "#BBBBBB" */
	readonly dividerColor: Property.Color;
	readonly dividerWidth: number;
}

export default function GraphDivider(props: IGraphDividerProps) {
	const dividerList = useMemo(() => {
		const dividerCnt = 99 / props.dividerInterver;
		const dividers: number[] = [];
		for (let index = 1; index < dividerCnt; index++) {
			dividers.push(props.dividerInterver * index);
		}
		return dividers;
	}, [props.dividerInterver]);

	return (
		<div
			style={{
				display: "flex",
				boxSizing: "border-box",
				flexDirection: "row",
				position: "absolute",
				marginLeft: props.leftPosition,
				width: "100%",
				height: "100%",
				alignItems: "center",
			}}>
			{dividerList.map((div, i) => (
				<div
					key={`div_${div}`}
					style={{
						display: "flex",
						boxSizing: "border-box",
						flexDirection: "column",
						position: "absolute",
						borderRightWidth: props.dividerWidth,
						borderRightStyle: "solid",
						borderColor: props.dividerColor,
						width: `${div}%`,
						height: props.dividerHeight,
						justifyContent: "center",
						alignItems: "center",
					}}
				/>
			))}
		</div>
	);
}
