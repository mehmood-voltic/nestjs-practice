import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { SendMoneyDto } from "../dto/sendMoneyDto";
import { TransactionService } from "./transaction.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PaymentService {
  constructor(
    @Inject(TransactionService) private tansaction: TransactionService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  async sendMoney(senderId: string, receiverEmail: string, amount: number) {
    //find users id from email
    const receiver = await this.usersService.findUserByEmail(receiverEmail);
    if (!receiver) throw new UnprocessableEntityException("receiver not found");
    try {
      //transfer money
      await this.tansaction.transferMoney(senderId, receiver.id, amount);

      //if transaction is successful
      const newTransaction = await this.tansaction.createTransaction(
        senderId,
        receiver.id,
        amount,
        "success",
      );
      return newTransaction;
    } catch (error) {
      //if transaction fails
      await this.tansaction.createTransaction(
        senderId,
        receiver.id,
        amount,
        "failed",
      );
      throw new UnprocessableEntityException(
        error.message || "transaction failed",
      );
    }
  }
}
