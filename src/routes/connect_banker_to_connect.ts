import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async (req, res) => {
    const { bankerId, clientId } = req.params;
    const banker = await Banker.findOneBy({id: parseInt(bankerId)});
    const client = await Client.findOneBy({id: parseInt(clientId)});

    if(!banker || !client) {
        return res.json({
            msg: "Banker or Client not found"
        });
    }

    banker.clients = [
        client
    ];

    await banker.save();

    return res.json({
        msg: "banker connected to client"
    });
});

export {
    router as connectBankerToClientRouter
}
