import { queryService } from "../service/queryService.js";

class Controller {
	constructor() {}

	query = async (req, res) => {
		try {
			console.log("ENTRA A CONTROLADOR QUERY ...............................");
			const requests = await queryService.query(req);
			res.status(200).json(requests);
		} catch (error) {
			console.log("ERROR EN CONTROLADOR QUERY", error);
			if (error.expected) delete error.expected;
			res.status(error.status).json({ error });
		}
	};
}

export const queryController = new Controller();
