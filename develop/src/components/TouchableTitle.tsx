import { useMemo } from "react";
import styles from "./styles.module.css";

interface ITouchableTitleProps {
	readonly title: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
	readonly hNum?: 1 | 2 | 3 | 4;
}

export default function TouchableTitle(props: ITouchableTitleProps) {
	const icon = useMemo(() => {
		return props.isActive ? " 🔻 " : " 🔺 ";
	}, [props.isActive]);

	const { hNum = 2 } = props;

	switch (hNum) {
		case 1:
			return (
				<h1 className={styles.title} onClick={props.onClick}>
					{icon + props.title + icon}
				</h1>
			);
		case 2:
		default:
			return (
				<h2 className={styles.title} onClick={props.onClick}>
					{icon + props.title + icon}
				</h2>
			);
		case 3:
			return (
				<h3 className={styles.title} onClick={props.onClick}>
					{icon + props.title + icon}
				</h3>
			);
		case 4:
			return (
				<h4 className={styles.title} onClick={props.onClick}>
					{icon + props.title + icon}
				</h4>
			);
	}
}
