import { Body, Controller, Inject, Post, Req } from "@nestjs/common";
import { SendMoneyDto } from "./dto/sendMoneyDto";
import { PaymentService } from "./services/payment.service";
import { UsersService } from "src/users/users.service";

@Controller("payment")
export class PaymentController {
  constructor(@Inject(PaymentService) private paymentService: PaymentService) {}

  @Post("send")
  async sendMoney(@Req() req: any, @Body() dto: SendMoneyDto) {
    const { amount, to } = dto;
    const userId = req.user.id;
    return await this.paymentService.sendMoney(userId, to, Number(amount));
  }
}
