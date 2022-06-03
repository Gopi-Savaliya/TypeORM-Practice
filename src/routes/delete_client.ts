import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.delete('/api/client/:clientId', async (req, res) => {
    const { clientId } = req.params;

    const client = await Client.findOneBy({id: parseInt(clientId)});

    if(!client) {
        return res.json({
            msg: "Client not found"
        });
    }

    await Client.delete({id: parseInt(clientId)});

    return res.json({
        msg: "Client deleted successfully"
    });
});

export {
    router as deleteClientRouter
}