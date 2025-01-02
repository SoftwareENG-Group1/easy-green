export const pxToViewport = (pixels: number, type: "vw" | "vh"): number => {
	if (typeof window === "undefined") return 0; // Prevent issues during SSR
	const viewport = type === "vw" ? 1512 : 982;
	console.log(viewport);
	return (pixels / viewport) * 100;
};
