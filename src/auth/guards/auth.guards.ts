import  {Injectable, ExecutionContext, CanActivate, UnauthorizedException} from '@nestjs/common'
import { JsonWebTokenError, JwtService } from '@nestjs/jwt'
import { Http2ServerRequest } from 'http2'
import { getErrorMessageFromTokenException } from './auth.utils'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class PassportLocalGuard extends AuthGuard('local') {}

// export class AuthGuard implements CanActivate{
//     constructor(private jwtService: JwtService){}
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest()
//         const authHeader = request.headers.authorization
//         const token =  authHeader?.split(' ')[1]

//         if(!token ){
//             throw new UnauthorizedException('access denied')
//         }

//         try {
//             const payload = await this.jwtService.verifyAsync(token)
//             request['user'] = payload
//         } catch (error) {
//             if(error instanceof JsonWebTokenError){
//                 throw new UnauthorizedException(getErrorMessageFromTokenException(error?.name))
//             }
//             throw new UnauthorizedException('access denied')
//         }
//         return true
//     }
// }