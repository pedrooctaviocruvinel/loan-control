export type ResultWrapperModel<T> = {
	success: boolean;
	errorCode: number;
	errors: string[];
	data: T;
};
