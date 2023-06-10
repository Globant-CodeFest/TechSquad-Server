import axios from "axios";
import { dataset } from "../dataset.js";
import { detect_intent, resume } from "../utils/gpt.js";

class QueryService {
	constructor() {}

	query = async (req) => {
		try {
			console.log("ENTRA A QUERY SERVICE ...............................");
			console.log("PREGUNTA", req.body.query);
			const search_fields = await detect_intent(req.body.query);

			console.log("SEARCH FIELDS", search_fields);

			// check if search_fields is empty
			if (!Object.keys(search_fields).length) return { message: "Reformula tu consulta.", events: [] };

			const public_dataset = JSON.parse(JSON.stringify(dataset));
			const filtered_data = public_dataset.filter((event) => {
				let match = true;
				for (const field in search_fields) {
					if (event[field] !== search_fields[field]) {
						match = false;
						break;
					}
				}
				return match;
			});

			if (!filtered_data.length) return { message: "No se encontraron resultados.", events: [] };

			filtered_data.reverse().splice(5);
			console.log("FILTERED DATA LENGTH", filtered_data.length);

			const resume_response = await resume(filtered_data);
			console.log("RESUME DATA", resume_response);

			return { response: resume_response, events: filtered_data };
		} catch (error) {
			console.log("ERROR EN QUERY SERVICE", error);
			throw error;
		}
	};
}

export const queryService = new QueryService();
