import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.query['token'];
        return token && token == process.env.ADMIN_TOKEN;
    }

}