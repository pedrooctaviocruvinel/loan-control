export const downloadFile = (
	file: ArrayBuffer,
	fileName: string,
	type: string
) => {
	const blob = new Blob([file], { type: type });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');

	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};
