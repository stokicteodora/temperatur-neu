import fs from "fs"; //ChatGPT helped me quite a bit here

const data = JSON.parse(fs.readFileSync("./weather.json"));
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const yesterdayData = data.filter((d) => {
  const date = new Date(d.timestamp);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
});

if (yesterdayData.length === 0) {
  console.log("Keine Daten für gestern!");
} else {
  const avgTemp =
    yesterdayData.reduce((sum, d) => sum + d.temperature, 0) /
    yesterdayData.length;
  const avgHum =
    yesterdayData.reduce((sum, d) => sum + d.humidity, 0) /
    yesterdayData.length;

  console.log("Durchschnittstemperatur gestern:", avgTemp.toFixed(2), "°C");
  console.log(
    "Durchschnittliche Luftfeuchtigkeit gestern:",
    avgHum.toFixed(2),
    "%"
  );
}
