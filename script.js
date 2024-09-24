let promError = false;


function getPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promError) {
        reject();
      }else {
        resolve();
      }
    }, 1500);
  })
}




function init() {
  getPromise();
}


try {
  
} catch (error) {
  
}



// #########################################################

// asynchrone funktion deklarieren

async function fetchData() {
  
  const response = await fetch( "beispiel API / URL"); // hier wird nur der Header (wichtigste Teil des Servers) übertragen, um eine Verknüpfung mit dem Server zu "bestätigen".  Man bekommt ein Promise zurück (Promise = Verbindung ist aufgebaut-zum server ist gewährleistet)

  if (!response.ok) return;  // wenn keine Verbindung zum Server hergestellt wurde, wird returned (Funktion abgebrochen)

  // -----> somit wurde insgesamt sichergestellt, das eine Verbindung zum Server bereitsteht und bestätigt wurde  -----> weiter zum nächsten Schritt.


  const data = await response.json(); // hiermit wird jetzt auf die Daten zugegriffen die unter dieser API gespeichert sind zu und speichern diese in der variablen data im validen json format.

  return data; // gibt das "data" JSON objekt aus der Funktion heraus.

}


  // -----> so wird jetzt auf die fetchData und dem daraus resultierenden JSON Objekt global zugegriffen:


  const jsonData = await fetchData();