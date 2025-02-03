import { Injectable } from "@nestjs/common";
import { TransactionStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transferMoney(senderId: string, receiverId: string, amount: number) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Decrement amount from the sender.
      const sender = await tx.balance.update({
        data: {
          balance: {
            decrement: amount,
          },
        },
        where: {
          userId: senderId,
        },
      });

      // 2. Verify that the sender's balance didn't go below zero.
      if (sender.balance < 0) {
        throw new Error(`sender doesn't have enough to send ${amount}`);
      }

      // 3. Increment the recipient's balance by amount
      const recipient = await tx.balance.update({
        data: {
          balance: {
            increment: amount,
          },
        },
        where: {
          userId: receiverId,
        },
      });

      return recipient;
    });
  }

  async createTransaction(
    senderId: string,
    receiverId: string,
    amount: number,
    status: TransactionStatus = "pending",
  ) {
    console.log(amount);
    const transaction = await this.prisma.transaction.create({
      data: {
        senderId,
        receiverId,
        amount,
        status,
      },
      omit: {
        senderId: true,
        receiverId: true,
      },
      include: {
        sender: {
          select: {
            email: true,
          },
        },
        receiver: {
          select: {
            email: true,
          },
        },
      },
    });

    return {
      txId: transaction.id,
      sender: transaction.sender.email,
      receiver: transaction.receiver.email,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }
}
