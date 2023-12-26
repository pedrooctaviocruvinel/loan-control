export type ResultWrapper<TEntity> = {
	success: boolean;
	errorCode: number;
	errors: string[];
	data: TEntity;
};
