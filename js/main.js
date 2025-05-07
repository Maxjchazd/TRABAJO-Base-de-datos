const OnLoad = function () {
    $ds.header("body", "Instituto TNT")
    $nav.init();
    $ds.main("body");
  };

  window.onload = OnLoad; // objeto globlal referente a la ventana del navegador

const Post = (data) => {
    const req = new XMLHttpRequest(); // objeto es el encargado de realizar peticiones HTTP
    let res;
    const Change = () => { // se ejecutará cada vez que el estado de la petición cambie.
        if (req.readyState === 4 && req.status === 200) res = req.responseText; //Verifica si la petición se ha completado correctamente (readyState === 4) y si el servidor ha respondido con un código de estado 200 (éxito).
    };
    req.onreadystatechange = Change; //Asocia la función Change al evento onreadystatechange del objeto req
    req.open("POST", "Default.aspx", false); // Configuración dela peticion HTTP 
    req.send(data);
    return res;
};