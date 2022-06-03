import express from "express";
import { Client } from "../entities/Client";
import { createQueryBuilder, getConnection } from "typeorm";

const router = express.Router();

router.get('/api/client/:clientId', async (req, res) => {
   const { clientId } = req.params;
   const client = await Client.find({
       select: {
           first_name: true,
           last_name: true,
           email: true,
           card_number: true,
           balance: true
       },
       where: {
           id: parseInt(clientId)
       }
   });
   return res.json(client);
});

export {
    router as fetchClientRouter
}