document.querySelector(".loc-button").addEventListener("click", async () => {
  const cityName = document.querySelector(".city").value;
  if (cityName === "") {
    return showAlert("Por favor insira o nome de uma cidade");
  }

  const apiKey = "e2ce1de30efe846695ca5dc9db621694";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    cityName
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  const response = await fetch(apiUrl);
  const jsonData = await response.json();

  if (jsonData.cod === 200) {
    showInfor({
      cityName: jsonData.name,
      country: jsonData.sys.country,
      temp: jsonData.main.temp,
      tempMax: jsonData.main.temp_max,
      tempMin: jsonData.main.temp_min,
      descripition: jsonData.weather[0].description,
      tempIcon: jsonData.weather[0].icon,
      windSpeed: jsonData.wind.speed,
      humiDity: jsonData.main.humidity,
    });
  } else {
    return showAlert("Cidade não encontrada");
  }
});

function showInfor(jsonData) {
  document.querySelector(
    "#city"
  ).innerHTML = `${jsonData.cityName}, ${jsonData.country}`;

  document.querySelector("#temp").innerHTML =
    `${jsonData.temp.toFixed(1).toString().replace(".", ",")}` + "°C";
  document.querySelector(
    "#descripition"
  ).innerHTML = `${jsonData.descripition}`;
  document.querySelector("#windSpeed").innerHTML =
    `${jsonData.windSpeed.toFixed(1).toString().replace(".", ",")}` + "km/h";
  document.querySelector("#humiDity").innerHTML = `${jsonData.humiDity}` + "%";

  document.querySelector("#tempMin").innerHTML =
    `${jsonData.tempMin.toFixed(1).toString().replace(".", ",")}` + "°C";

  document
    .querySelector("#tempIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${jsonData.tempIcon}@2x.png`
    );

  showAlert("");
}

function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}

function showHora() {
  const data = new Date();

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const diaDaSemana = diasDaSemana[data.getDay()];
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();

  document.querySelector("#date").innerHTML = `${dia} ${mes} ${ano}`;
  document.querySelector("#day").innerHTML = diaDaSemana;
}
showHora();
