import { toPng } from "html-to-image";
import { useCallback, useState } from "react";
import cssStyles from "./App.module.css";
import TouchableTitle from "./components/TouchableTitle";
import BarGraphDemo from "./demo/BarGraphDemo";
import InstallDemo from "./demo/InstallDemo";
import IosDemo from "./demo/IosDemo";

function App() {
	const [showInstallDemo, setShowInstallDemo] = useState(false);
	const [showBarGraphDemo, setShowBarGraphDemo] = useState(false);
	// const [showAndroidTabDemo, setShowAndroidTabDemo] = useState(false);
	const [showIphoneDemo, setShowIphoneDemo] = useState(false);
	// const [showIpadDemo, setShowIpadDemo] = useState(false);

	const onPressPng = useCallback(async (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current === null) {
			return;
		}

		try {
			const dataUrl = await toPng(ref.current, { cacheBust: true });
			const link = document.createElement("a");
			link.download = "my-image-name.png";
			link.href = dataUrl;
			link.click();
		} catch {
			alert("Something went wrong");
		}
	}, []);

	return (
		<div className={cssStyles.App}>
			<header style={{ textAlign: "center" }}>
				<h1 style={{ margin: 0 }}>Full Demo</h1>
				<h2 style={{ margin: 0 }}>Device Mockup</h2>
			</header>

			{/* <PackageDemo /> */}

			<TouchableTitle
				title="Install & import"
				isActive={showInstallDemo}
				onClick={() => setShowInstallDemo(prev => !prev)}
			/>
			{showInstallDemo && <InstallDemo />}

			<TouchableTitle
				title="📞 AndroidMockup"
				isActive={showBarGraphDemo}
				onClick={() => setShowBarGraphDemo(prev => !prev)}
			/>
			<BarGraphDemo mode="phone" showDemo={showBarGraphDemo} onPressPng={onPressPng} />
			{/* {showBarGraphDemo && (
				<BarGraphDemo mode="phone" showDemo={showBarGraphDemo} onPressPng={onPressPng} />
			)} */}

			<TouchableTitle
				title="📞 IPhoneMockup"
				isActive={showIphoneDemo}
				onClick={() => setShowIphoneDemo(prev => !prev)}
			/>
			<IosDemo mode="phone" showDemo={showIphoneDemo} onPressPng={onPressPng} />
		</div>
	);
}

export default App;
