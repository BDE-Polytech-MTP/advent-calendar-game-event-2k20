import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDTO {

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    score: number;

}
