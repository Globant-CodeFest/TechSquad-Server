import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const detect_intent = async (query) => {
	const response = await openai.createChatCompletion({
		model: "gpt-4",
		messages: [
			{
				role: "system",
				content:
					'Trabajarás con un dataset que tiene este formato y campos:[{"Year": 1900,"Seq": 9002,"Glide": "","Disaster Group": "Natural","Disaster Subgroup": "Climatological","Disaster Type": "Drought","Disaster Subtype": "Drought","Disaster Subsubtype": "","Event Name": "","Country": "Cabo Verde","ISO": "CPV","Region": "Western Africa","Continent": "Africa","Location": "Countrywide","Origin": "","Associated Dis": "Famine","Associated Dis2": "","OFDA Response": "","Appeal": "No","Declaration": "No","Aid Contribution": "","Dis Mag Value": "","Dis Mag Scale": "Km2","Latitude": "","Longitude": "","Local Time": "","River Basin": "","Start Year": 1900,"Start Month": "","Start Day": "","End Year": 1900,"End Month": "","End Day": "","Total Deaths": 11000,"No Injured": "","No Affected": "","No Homeless": "","Total Affected": "","Insured Damages (\'000 US$)": "","Total Damages (\'000 US$)": "","CPI": 3.221647271,"Adm Level": "","Admin1 Code": "","Admin2 Code": "","Geo Locations": ""}]Recibirás una consulta en lenguaje natural y debes detectar la intención de pregunta del usuarios para generar un objeto javascript con los campos y valores que debo utilizar para filtrar mi dataset. Solo puedes detectar intención de consulta para estos campos: Year, Seq, Glide, Disaster Group, Disaster Subgroup, Disaster Type, Disaster Subtype, Disaster Subsubtype, Event Name, Country, ISO, Region, Continent, Location, Origin, Associated Dis, Associated Dis2, OFDA Response, Appeal, Declaration, Aid Contribution, Dis Mag Value, Dis Mag Scale, Latitude, Longitude, Local Time, River Basin, Start Year, Start Month, Start Day, End Year, End Month, End Day, Total Deaths, No Injured, No Affected, No Homeless, Total Affected, Insured Damages (\'000 US$), Total Damages (\'000 US$), CPI, Adm Level, Admin1 Code, Admin2 Code, Geo Locations. No incluyas otros campos en el objeto. Si no puedes detectar la intención de búsqueda responde vacío.',
			},
			{
				role: "user",
				content: query,
			},
		],
	});

	console.log("RESPUESTA -----------------", response.data.choices[0].message.content);
	return JSON.parse(response.data.choices[0].message.content);
};

export const resume = async (events) => {
	const response = await openai.createChatCompletion({
		model: "gpt-4",
		messages: [
			{
				role: "system",
				content: "Genera un resumen que basado en desastres naturales para determinar el riesgo de viaje. Recibirás los datos en formato JSON y la respuesta debe tener máximo 500 caracteres.",
			},
			{
				role: "user",
				content: JSON.stringify(events),
			},
		],
	});
	console.log("RESPUESTA -----------------", "response.data.choices");
	return response.data.choices[0].message.content;
};

// console.log("RESUMEN", await resume(eventos));

// console.log(await detect_intent("¿Cuántos desastres naturales ocurrieron en 2021?"));
