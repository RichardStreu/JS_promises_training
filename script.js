let promError = false;

function getPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promError) {
        reject();
      } else {
        resolve();
      }
    }, 1500);
  });
}

function init() {
  getPromise();
  fetchDataJson();
  getText();
  getFruitsData();
  filterShowFruits();
}

// ###############################################################################################
// Try and Catch kann nicht nur für Promises sondern für alle anderen Dinge verwendet werden, wo damit zu rechnen ist, das es ein Error in der Konsole entstehen könnte, um die Error abzufangen.

function useTryNCatch() {
  try {
    console.log(fetchData());
  } catch (error) {
    console.log("reading not possible");
  }
}

// #####################################################################################

// asynchrone funktion deklarieren

async function fetchData() {
  let response = await fetch("beispiel API / URL"); // hier wird nur der Header (wichtigste Teil des Servers) übertragen, um eine Verknüpfung mit dem Server zu "bestätigen".  Man bekommt ein Promise zurück (Promise = Verbindung ist aufgebaut-zum server ist gewährleistet)

  if (!response.ok) return; // wenn keine Verbindung zum Server hergestellt wurde, wird returned (Funktion abgebrochen)

  // -----> somit wurde insgesamt sichergestellt, das eine Verbindung zum Server bereitsteht und bestätigt wurde  -----> weiter zum nächsten Schritt.

  const data = await response.json(); // hiermit wird jetzt auf die Daten zugegriffen die unter dieser API gespeichert sind zu und speichern diese in der variablen data im validen json format.

  return data; // gibt das "data" JSON objekt aus der Funktion heraus.
}

// ----> um die Daten global zur Verfügung zu stellen, muss man vorher eine Variable nur deklarieren, und diese dann aus der asynchronen funktion heraus initialisieren.

// ####################################################################################

// EIGENE JSON FETCHEN

async function fetchDataJson() {
  let response = await fetch("./db.json");
  let responseAsJson = await response.json(); // mit .json wird auf ein valides json objekt zugegriffen
  console.log(responseAsJson);
}

async function getText() {
  let response = await fetch("./h1.text");
  let responseAsText = await response.text(); // mit .text kann man auf textelemente zugreifen, wie es zum beispiel HTML code ist
  document.getElementById("content").innerHTML = responseAsText;
}

// ################################################################################################

// Auf Daten einer API zugreifen

let filter = "";

async function getFruitsData() {
  let response = await fetch("https://www.fruityvice.com/api/fruit/all");
  let responseAsJson = await response.json();
  return responseAsJson;
}

async function filterShowFruits() {
  let fruitsObject = await getFruitsData();
  console.log(fruitsObject);

  let fruitsContentRef = document.getElementById("fruits-container");
  fruitsContentRef.innerHTML = "";
  for (let index = 0; index < fruitsObject.length; index++) {
    if (fruitsObject[index].name.toLowerCase().startsWith(filter.toLowerCase()) && filter.length > 0) {
      let fruitDiv = document.createElement("div");
      fruitDiv.innerHTML =
        "Frucht Nr." + index + " = " + fruitsObject[index].name + ". The sugar is about " + fruitsObject[index].nutritions.sugar + "g per 100g Fruit.";
      fruitsContentRef.appendChild(fruitDiv);
    }
  }
}
