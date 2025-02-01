import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from "@nestjs/common";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { Http2ServerRequest } from "http2";
import { getErrorMessageFromTokenException } from "./auth.utils";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

//For simple jwt authentication with local strategy, just extending AuthGuard with local parameter is enough, but in case of session auth, you have to manually call the AuthGuard's login method to create session for the user
@Injectable()
export class PassportLocalGuard extends AuthGuard("local") {
  async canActivate(context: ExecutionContext) {
    //this method inherits from AuthGuard class and checks whether the user is authenticated with local strategy or not.
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    //this method again tries to login the current request object if in case its not logged in before
    await super.logIn(request);
    return result;
  }
}

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
