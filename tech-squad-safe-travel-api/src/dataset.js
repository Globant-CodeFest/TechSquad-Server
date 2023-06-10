import fs from "fs";

export const dataset = JSON.parse(await fs.promises.readFile("./new_dataset.json", "utf-8"));
// console.log("DATASET", dataset);
// map dataset and save in new file
// const new_dataset = dataset.map((event) => {
// 	return {
// 		Year: event["Year"],
// 		"Disaster Group": event["Disaster Group"],
// 		"Disaster Subgroup": event["Disaster Subgroup"],
// 		"Disaster Type": event["Disaster Type"],
// 		Country: event["Country"],
// 		Region: event["Region"],
// 		Continent: event["Continent"],
// 		Location: event["Location"],
// 		Origin: event["Origin"],
// 		"Aid Contribution": event["Aid Contribution"],
// 		"Dis Mag Value": event["Dis Mag Value"],
// 		"Dis Mag Scale": event["Dis Mag Scale"],
// 		"Local Time": event["Local Time"],
// 		"Start Year": event["Start Year"],
// 		"Start Month": event["Start Month"],
// 		"Start Day": event["Start Day"],
// 		"End Year": event["End Year"],
// 		"End Month": event["End Month"],
// 		"End Day": event["End Day"],
// 		"Total Deaths": event["Total Deaths"],
// 		"No Injured": event["No Injured"],
// 		"No Affected": event["No Affected"],
// 		"No Homeless": event["No Homeless"],
// 		"Total Affected": event["Total Affected"],
// 		"Insured Damages ('000 US$)": event["Insured Damages ('000 US$)"],
// 		"Total Damages ('000 US$)": event["Total Damages ('000 US$)"],
// 	};
// });

// await fs.promises.writeFile("./new_dataset.json", JSON.stringify(new_dataset), "utf-8");
