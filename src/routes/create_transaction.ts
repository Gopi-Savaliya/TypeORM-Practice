import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionTypes } from "../entities/Transaction";

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
    const { clientId } = req.params;
    const { type, amount } = req.body;
    
    const client = await Client.findOneBy({id: parseInt(clientId)});

    if(!client) {
        return res.json({
            msg: "Client not found"
        });
    }

    const transaction = Transaction.create({
        type,
        amount,
        client
    });

    await transaction.save();

    if(type === TransactionTypes.DEPOSIT) {
        client.balance += amount;
    } else if(type === TransactionTypes.WITHDRAW) {
        client.balance -= amount;
    }

    await client.save();

    return res.json({
        msg: 'Transaction Successful'
    });
});

export {
    router as createTransactionRouter
};
