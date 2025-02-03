import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class SendMoneyDto {
  @ApiProperty({ example: "100" })
  @IsNumberString()
  amount: string;

  @ApiProperty({ example: "user@example.com" })
  @IsString()
  to: string;
}
