export const getErrorMessageFromTokenException = (name:string) => {
    if(name === 'TokenExpiredError'){
        return 'Your session has been expired'
    }else {
        if(name === 'JsonWebTokenError'){
            return 'Your token is invalid'
        }else {
            return 'You token is not active yet'
        }
    }
}