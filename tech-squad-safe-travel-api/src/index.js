import express from "express";
import dotenv from "dotenv";
import os from "os";
import cors from "cors";
import { v1Router } from "./api/v1/routes/index.js";
// import { tunnel } from "./senders/whatsapp/tunnel.js";

dotenv.config();

// export let tunnelUrl = await tunnel();

// setInterval(async () => {
// 	tunnelUrl = await tunnel();
// }, 1000 * 60 * 10);

const PORT = 3000 || process.env.SERVER_PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/v1/", v1Router);

const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${server.address().port}`);
	//show ip address
	const interfaces = os.networkInterfaces();
	const addresses = [];
	for (const k in interfaces) {
		for (const k2 in interfaces[k]) {
			const address = interfaces[k][k2];
			if (address.family === "IPv4" && !address.internal) {
				addresses.push(address.address);
			}
		}
	}
	console.log(`IP Address: ${addresses}`);
});

app.all("*", (req, res) => {
	console.log("404---------------");
	res.status(404).json({ error: "404 Not Found--------", method: req.method, route: req.url });
});

server.on("error", (error) => console.error(`Server error: ${error}`));
