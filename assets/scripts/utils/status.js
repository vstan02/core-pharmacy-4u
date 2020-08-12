export function isSuccess(status) {
	return status >= 200 && status < 300;
}

export function isInvalid(status) {
	return status === 422;
}
