import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./services/payment.service";
import { TransactionService } from "./services/transaction.service";
import { UsersService } from "src/users/users.service";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, TransactionService, UsersService],
})
export class PaymentModule {}
