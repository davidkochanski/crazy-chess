export const enum AppErrorCode {
    InvalidAccessToken = "InvalidAccessToken",
    UserAlreadyExists = "UserAlreadyExists"
}

// yes, this needs its own file. otherwise the AppError and appAssert files will give type errors