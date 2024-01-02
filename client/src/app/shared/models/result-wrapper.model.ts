export type ResultWrapperModel<TEntity> = {
	success: boolean;
	errorCode: number;
	errors: string[];
	data: TEntity;
};
