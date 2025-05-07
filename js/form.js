const $$form = function () {


    this.addUser = function () {
        const Submit = function () {

            try {
                let Fd = new FormData();
                Fd.append("accion", "ADDUSUARIO");
                Fd.append("Nombre", nombre.value);
                Fd.append("Mail", mail.value);
                Fd.append("Dni", dni.value);

                const res = Post(Fd);
                if (res !== "OK") alert(res);
                $f.addUser();
            }

            catch (e) { alert(e); }
            return false;



        }


        const $z = {
            deleteUser: function () {
                console.log("Usuario eliminado");
            }
        };



        this.deleteUser = function (user) {
            // Crear función Submit para enviar el formulario de eliminación


            const Submit = async function () {
                try {
                    let Fd = new FormData();
                    Fd.append("accion", "DELETEUSER");
                    Fd.append("ID", user.ID); // Usar solo el ID del usuario

                    const res = await Post(Fd); // Llamada al servidor

                    console.log(Fd);
                    console.log(res);

                    if (res !== "OK") {
                        alert("Error al eliminar: " + res);
                    } else {
                        console.log("Usuario eliminado");
                        $z.deleteUser(); // Aquí el código de eliminación del usuario
                    }
                } catch (e) {
                    alert("Error: " + e.message);
                }
                return false;
            };

            // Limpiar la sección principal antes de mostrar el formulario
            $ds.clearSection("main");
  
            // Crear formulario 2 con el título "Eliminar Usuario"
            const z = $dc.form("¿Estás seguro de eliminar al usuario?", "Eliminar");

            // Crear un mensaje de confirmación
            const confirmationMessage = document.createElement("p");
            confirmationMessage.textContent = `¿Deseas eliminar al usuario ${user.Nombre}?`;

        

            // Añadir el mensaje y el botón al formulario
            z.appendChild(confirmationMessage);
            z.appendChild(confirmButton);
            return false;
            z.onsubmit = Submit;

        };



        const ListUsuarios = function () {
            let fd = new FormData();
            fd.append("accion", "LISTUSUARIOS");
            const res = Post(fd);
            let list;
            try {
                if (res && typeof res === "string") {
                    // Verificar si la respuesta es un JSON válido antes de intentar analizarlo
                    try {
                        list = JSON.parse(res);
                        console.log(res);
                        console.log(list);

                    } catch (jsonError) {
                        throw new Error("Respuesta no válida del servidor: " + res);
                    }
                } else {
                    throw new Error("Respuesta no válida del servidor");
                }
            } catch (e) {
                alert("Error al analizar JSON: " + e.message);
                return;
            }

            try {
                const listTitles = ["ID", "Nombre", "DNI", "Mail"];
                $dt.table(listTitles, list);
            } catch (e) {
                alert("Error al generar la tabla: " + e.message);
            }
        };




        this.modifyUser = function (user) {

            const Submit = function () {
                try {
                    let Fd = new FormData();
                    Fd.append("accion", "MODIFYUSER");
                    Fd.append("ID", user.ID);
                    Fd.append("Nombre", nombre.value);
                    Fd.append("Mail", mail.value);
                    Fd.append("Dni", dni.value);
                    let res = Post(Fd);
                    if (res !== "OK") alert(res);
                    $f.addUser();
                } catch (e) {
                    alert(e);
                }
                return false;
            }

            $ds.clearSection("main");

            // Crea un formulario con el título "Modificar Usuario" y un botón con el texto "Modificar"
            const f = $dc.form("Modificar Usuario", "Modificar");

            // Crea campos de entrada para nombre, DNI y correo electrónico
            const nombre = $dc.addInputForm("text", "Nombre", "name-user");
            const dni = $dc.addInputForm("number", "DNI", "dni-user");
            const mail = $dc.addInputForm("email", "Mail", "mail-user");

            // Asigna los valores del objeto 'user' a los campos del formulario
            nombre.value = user.Nombre;
            dni.value = user.Dni;
            mail.value = user.Mail;

            // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
            f.onsubmit = Submit;
        };







        $ds.clearSection("main");
        const f = $dc.form("Agregar Usuario", "Agregar");
        const nombre = $dc.addInputForm("text", "Nombre", "name-user");
        const dni = $dc.addInputForm("number", "DNI", "dni-user");
        const mail = $dc.addInputForm("email", "Mail", "mail-user");

        f.onsubmit = Submit;

        ListUsuarios();




    };




    this.ListUsers = function () {

        const Submit = function () {
            try {

                document.querySelector("main").innerHTML = "";

         //actualizar la página y continuar con el código
             

                let fd = new FormData();

                fd.append("accion", "MOSTRARUSUARIOS");


                const res = Post(fd); 
                let list;



                if (res && typeof res === "string") {
                    try {
                        list = JSON.parse(res); 
                    } catch (jsonError) {
                        throw new Error("Respuesta no válida del servidor: " + res);
                    }
                } else {
                    throw new Error("Respuesta no válida del servidor");
                }

                const listTitles = ["ID", "Nombre", "DNI", "Mail"];

                $dt.table(listTitles, list);

                // Generar la tabla con los datos obtenidos
            } catch (e) {
                alert("Error al mostrar usuarios: " + e.message);
            }
        };


        Submit(); 


    };


    this.findUsers = function () {
        const Submit = async function () {
            try {
                document.querySelector("main").innerHTML = ""; // Limpiar contenido previo

                // Recopilar datos del formulario
                let fd = new FormData();
                fd.append("accion", "BUSCARUSUARIOS");
                fd.append("ID", ID.value);
                fd.append("Nombre", nombre.value);
                fd.append("Mail", mail.value);
                fd.append("Dni", dni.value);

                // Enviar al servidor y esperar la respuesta
                const res = await Post(fd); // Usar await para esperar la respuesta

                let list;

                // Intentar parsear la respuesta como JSON
                if (res && typeof res === "string") {
                    try {
                        list = JSON.parse(res);
                    } catch (jsonError) {
                        throw new Error("Respuesta no válida del servidor: " + res);
                    }
                } else {
                    throw new Error("Respuesta no válida del servidor");
                }

                // Mostrar resultados si se encontraron usuarios
                if (Array.isArray(list) && list.length > 0) {
                    const listTitles = ["ID", "Nombre", "DNI", "Mail"];
                    $dt.table(listTitles, list);
                    document.querySelector("main").insertAdjacentHTML("afterbegin", "<div class='header'><h2>✔ Usuario(s) encontrado(s)</h2><div>");
                } else {
                    document.querySelector("main").innerHTML = "<p>❌ Usuario no encontrado.</p>";
                }

            } catch (e) {
                alert("Error al mostrar usuarios: " + e.message);
            }
        };

        $ds.clearSection("main");

        // Crear el formulario de búsqueda de usuario
        const f = $dc.form("Buscar Usuario", "Buscar");

        // Crear campos de entrada
        const ID = $dc.addInputForm("number", "ID", "id-user");
        const nombre = $dc.addInputForm("text", "Nombre", "name-user");
        const dni = $dc.addInputForm("number", "DNI", "dni-user");
        const mail = $dc.addInputForm("email", "Mail", "mail-user");

        // Asignar la función 'Submit'
        f.onsubmit = Submit;
    };


    /*sección carreras*/    /*sección carreras*/
    /*sección carreras*/
    /*sección carreras*/
    /*sección carreras*/
    /*sección carreras*/
    /*sección carreras*/


    this.addCarrera = function () {
        const Submit = function () {

            try {
                let Fdc = new FormData();
                Fdc.append("accion", "ADDCARRERAS");
                Fdc.append("Nombre", nombre.value);
                Fdc.append("Mail", mail.value);
                Fdc.append("Cátedra", cátedra.value);
                Fdc.append("Código", código.value);

                const resc = Post(Fdc);
                if (resc !== "OK") alert(resc);
                $f.addCarrera();
            }

            catch (e) { alert(e); }
            return false;



        }


        const $x = {
            deleteCarrera: function () {
                console.log("Carrera eliminada");
            }
        };



        this.deleteCarrera = function (carrera) {
            // Crear función Submit para enviar el formulario de eliminación
            const Submit = async function () {
                try {
                    let Fdc = new FormData();
                    Fdc.append("accion", "DELETECARRERAS");
                    Fdc.append("ID", carrera.ID); // Usar solo el ID de ña carrera

                    const resc = await Post(Fdc); // Llamada al servidor

                    console.log(Fdc);
                    console.log(resc);

                    if (resc !== "OK") {
                        alert("Error al eliminar: " + resc);
                    } else {
                        console.log("Carrera eliminada");
                        $x.deleteCarrera(); // Aquí el código de eliminación de la carrera
                    }
                } catch (e) {
                    alert("Error: " + e.message);
                }
                return false;
            };

            // Limpiar la sección principal antes de mostrar el formulario
            $ds.clearSection("main");

            // Crear formulario 2 con el título "Eliminar Carrera"
            const x = $dc.form("¿Estás seguro de eliminar la carrera?", "Eliminar");

            // Crear un mensaje de confirmación
            const confirmationMessage = document.createElement("p");
            confirmationMessage.textContent = `¿Deseas eliminar la carrera ${carrera.Nombre}?`;



            // Añadir el mensaje y el botón al formulario
            x.appendChild(confirmationMessage);
            x.appendChild(confirmButton);
            return false;
            x.onsubmit = Submit;

        };


          const ListCarreras = function () {  
               let fdc = new FormData();  
                fdc.append("accion", "LISTCARRERAS");  
               const resc = Post(fdc);  
                 let listC;  
                       try {  
                      if (resc && typeof resc === "string") {  
           // Verificar si la respuesta es un JSON válido antes de intentar analizarlo  
           try {  
               listC = JSON.parse(resc);  
           } catch (jsonError) {  
               throw new Error("Respuesta no válida del servidor: " + resc);  
           }  
       } else {  
           throw new Error("Respuesta no válida del servidor");  
       }  
                         } catch (e) {  
       alert("Error al analizar JSON: " + e.message);  
       return;  
                            }  
 
                                  try {  
       const listTitles = ["ID", "Nombre", "Código", "Cátedra", "Mail"];  
       $dt.table(listTitles, listC);  
                          } catch (e) {  
                 alert("Error al generar la tabla: " + e.message);  
                                        }  
                                                    };




        this.modifyCarrera = function (carrera) {

            const Submit = function () {
                try {
                    let Fdc = new FormData();
                    Fdc.append("accion", "MODIFYCARRERA");
                    Fdc.append("ID", carrera.ID);
                    Fdc.append("Nombre", nombre.value);
                    Fdc.append("Mail", mail.value);
                    Fdc.append("Cátedra", cátedra.value);
                    Fdc.append("Código", código.value);

                    let resc = Post(Fdc);
                    if (resc !== "OK") alert(resc);
                    $f.addUser();
                } catch (e) {
                    alert(e);
                }
                return false;
            }

            $ds.clearSection("main");

            // Crea un formulario con el título "Modificar Usuario" y un botón con el texto "Modificar"
            const f = $dc.form("Modificar Carrera", "Modificar");

            // Crea campos de entrada para nombre, DNI y correo electrónico
            const nombre = $dc.addInputForm("text", "Nombre", "name-carrera");
            const código = $dc.addInputForm("number", "Código", "código-carrera");
            const cátedra = $dc.addInputForm("text", "Cátedra", "cátedra-carrera");
            const mail = $dc.addInputForm("email", "Mail", "mail-carrera");

            // Asigna los valores del objeto 'user' a los campos del formulario
            nombre.value = carrera.Nombre;
            código.value = carrera.Código;
            cátedra.value = carrera.Cátedra;
            mail.value = carrera.Mail;

            // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
            f.onsubmit = Submit;
        };







        $ds.clearSection("main");
        const f = $dc.form("Agregar Carrera", "Agregar");
        const nombre = $dc.addInputForm("text", "Nombre", "name-carrera");
        const código = $dc.addInputForm("number", "Código", "código-carrera");
        const cátedra = $dc.addInputForm("text", "Cátedra", "cátedra-carrera");
        const mail = $dc.addInputForm("email", "Mail", "mail-carrera");



        // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
        f.onsubmit = Submit;


        ListCarreras();



    };




    this.ListMcarreras = function () {

        document.querySelector("main").innerHTML = "";


        const Submit = function () {
            try {

                let fdc = new FormData();

                fdc.append("accion", "MOSTRARCARRERAS");


                const resc = Post(fdc);
                let listaC;



                if (resc && typeof resc === "string") {
                    try {
                        listaC = JSON.parse(resc);
                    } catch (jsonError) {
                        throw new Error("Respuesta no válida del servidor: " + resc);
                    }
                } else {
                    throw new Error("Respuesta no válida del servidor");
                }

                const listTitles = ["ID", "Nombre", "Código","Cátedra", "Mail"];

                $dt.table(listTitles, listaC);

                // Generar la tabla con los datos obtenidos
            } catch (e) {
                alert("Error al mostrar carreras: " + e.message);
            }
        };


        Submit();


    };







    this.findCarreras = function () {  
       const Submit = async function () {  
           try {  

               document.querySelector("main").innerHTML = ""; // Limpiar contenido previo

               // Recopilar datos del formulario  
               let fd = new FormData();  
               fd.append("accion", "FINDCARRERA");  
               fd.append("ID", ID.value);  
               fd.append("Nombre", nombre.value);  
               fd.append("Mail", mail.value);  
               fd.append("Cátedra", cátedra.value);  
               fd.append("Código", código.value);  

               // Enviar al servidor y esperar la respuesta  
               const resc = await Post(fd);  

               let listaC;  

               // Intentar parsear la respuesta como JSON  
               if (resc && typeof resc === "string") {  
                   try {  
                       listaC = JSON.parse(resc);  
                   } catch (jsonError) {  
                       throw new Error("Respuesta no válida del servidor: " + resc);  
                   }  
               } else {  
                   throw new Error("Respuesta no válida del servidor");  
               }  

               // Mostrar resultados si se encontraron carreras  
               if (Array.isArray(listaC) && listaC.length > 0) {  
                   const listTitles = ["ID", "Nombre", "Código", "Cátedra", "Mail"];  
                   $dt.table(listTitles, listaC);  
                   document.querySelector("main").insertAdjacentHTML("afterbegin", "<div class='header'><h2>✔ Carrera(s) encontrada(s)</h2><div>");  
               } else {  
                   document.querySelector("main").innerHTML = "<p>❌ Carrera no encontrada.</p>";  
               }  

           } catch (e) {  
               alert("Error al mostrar carreras: " + e.message);  
           }  
        };  



       $ds.clearSection("main");  

       // Crear el formulario de búsqueda de carrera  
       const g = $dc.form("Buscar Carrera", "Buscar");  

       // Crear campos de entrada  
       const ID = $dc.addInputForm("number", "ID", "id-carrera");  
       const nombre = $dc.addInputForm("text", "Nombre", "name-carrera");  
       const código = $dc.addInputForm("number", "Código", "código-carrera");  
       const cátedra = $dc.addInputForm("text", "Cátedra", "cátedra-carrera");  
       const mail = $dc.addInputForm("email", "Mail", "mail-carrera");  

       // Asignar la función 'Submit'  
        g.onsubmit = Submit;  


    };






    //REGISTROSLOGINS
    this.Regist = function () {
        const Submit = function () {
            try {
                let Fdr = new FormData();
                Fdr.append("accion", "ADDREGISTRO");
                Fdr.append("Nombre", nombre.value);
                Fdr.append("Apellido", apellido.value);
                Fdr.append("Dni", dni.value);
                Fdr.append("Mail", mail.value);
                Fdr.append("Contraseña", pass.value);
                Fdr.append("Célular", celular.value);
                Fdr.append("Correo Postal", correop.value);
                Fdr.append("Domicilio", direccionf.value);


                const res = Post(Fdr);
                if (res !== "OK") alert(res);
                $f.Regist();
            }
            catch (e) { alert(e); }
            return false;

        }


        const $x = {
            deleteRegistro: function () {
                console.log("Registro eliminado");
            }
        };

        this.deleteRegistro = function (registro) {
            // Crear función Submit para enviar el formulario de eliminación
            const Submit = async function () {
                try {
                    let Rdc = new FormData();
                    Rdc.append("accion", "DELETEREGISTRO");
                    Rdc.append("ID", registro.ID); // Usar solo el ID de ña carrera

                    const resc = await Post(Rdc); // Llamada al servidor

                    console.log(Rdc);
                    console.log(resc);

                    if (resc !== "OK") {
                        alert("Error al eliminar: " + resc);
                    } else {
                        console.log("Registro eliminado");
                        $x.deleteCarrera(); // Aquí el código de eliminación de la carrera
                    }
                } catch (e) {
                    alert("Error: " + e.message);
                }
                return false;
            }

            // Limpiar la sección principal antes de mostrar el formulario
            $ds.clearSection("main");

            // Crear formulario 2 con el título "Eliminar Carrera"
            const x = $dc.form("¿Estás seguro de eliminar el registro?", "Eliminar");

            // Crear un mensaje de confirmación
            const confirmationMessage = document.createElement("p");
            confirmationMessage.textContent = `¿Deseas eliminar el registro ${registro.Nombre}?`;



            // Añadir el mensaje y el botón al formulario
            x.appendChild(confirmationMessage);
            x.appendChild(confirmButton);
            return false;
            x.onsubmit = Submit;

        };


        const ListRegistros = function () {
            let fdr = new FormData();
            fdr.append("accion", "LISTREGISTROS");
            const res = Post(fdr);
            let listr;
            try {
                if (res && typeof res === "string") {
                    // Verificar si la respuesta es un JSON válido antes de intentar analizarlo  
                    try {
                        listr = JSON.parse(res);
                    } catch (jsonError) {
                        throw new Error("Respuesta no válida del servidor: " + res);
                    }
                } else {
                    throw new Error("Respuesta no válida del servidor");
                }
            } catch (e) {
                alert("Error al analizar JSON: " + e.message);
                return;
            }

            try {
                const listTitles = ["ID", "Nombre", "Apellido", "DNI", "Mail", "Contraseña", "Célular", "Fecha ingreso", "Correo Postal", "Dirección física"];

                const list1 = listr.slice(0, 4);   // Primeras 4 filas
                const list2 = listr.slice(4);      // Desde la 5ta en adelante

                $dt.table(listTitles, list1);
                $dt.table(listTitles, list2);

            } catch (e) {
                alert("Error al generar la tabla: " + e.message);
            }
        };


        this.modifyRegistro = function (registro) {

            const Submit = function () {
                try {
                    let Fdr = new FormData();
                    Fdr.append("accion", "MODIFYREGISTRO");
                    Fdr.append("ID", registro.ID);
                    Fdr.append("Nombre", nombre.value);
                    Fdr.append("Apellido", apellido.value);
                    Fdr.append("Dni", dni.value);
                    Fdr.append("Mail", mail.value);
                    Fdr.append("Contraseña", pass.value);
                    Fdr.append("Célular", celular.value);
                    Fdr.append("Correo Postal", correop.value);
                    Fdr.append("Domicilio", direccionf.value);

                    let resc = Post(Fdr);
                    if (resc !== "OK") alert(resc);
                    $f.Regist();
                } catch (e) {
                    alert(e);
                }
                return false;
            }



            $ds.clearSection("main");

            const f = $dc.form("Modificar Registro", "Modificar");
            const nombre = $dc.addInputForm("text", "Nombre", "name-registro");
            const apellido = $dc.addInputForm("text", "Apellido", "apellido-registro");
            const celular = $dc.addInputForm("number", "Célular", "celular-registro");
            const correop = $dc.addInputForm("text", "Correo Postal", "correop-registro");
            const direccionf = $dc.addInputForm("text", "Domicilio", "direccionf-registro");
            const dni = $dc.addInputForm("number", "DNI", "dni-registro");
            const mail = $dc.addInputForm("email", "Mail", "mail-registro");
            const pass = $dc.addInputForm("password", "Contraseña", "pass-registro");

            nombre.value = registro.Nombre;
            apellido.value = registro.Apellido;
            celular.value = registro.Célular;
            correop.value = registro.Correop;
            direccionf.value = registro.Direccionf;
            dni.value = registro.DNI;
            mail.value = registro.Mail;
            pass.value = registro.Contraseña;

            // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
            f.onsubmit = Submit;

        };




        $ds.clearSection("main");
        const f = $dc.form("Registro", "Registrar");
        const nombre = $dc.addInputForm("text", "Nombre", "name-registro");
        const apellido = $dc.addInputForm("text", "Apellido", "apellido-registro");
        const celular = $dc.addInputForm("number", "Célular", "celular-registro");
        const correop = $dc.addInputForm("text", "Correo Postal", "correop-registro");
        const direccionf = $dc.addInputForm("text", "Direccion Fisica", "direccion-registro");
        const dni = $dc.addInputForm("number", "DNI", "dni-registro");
        const mail = $dc.addInputForm("email", "Mail", "mail-registro");
        const pass = $dc.addInputForm("password", "Contraseña", "pass-registro");



        f.onsubmit = Submit;


        ListRegistros();




    };


    this.clearSection = function (section) {
        const sectionForClear = $d.querySelector(section);
        sectionForClear.innerHTML = "";
    };


    this.home1 = function () {
        $ds.clearSection("main");
        isTable = false;

        const containerMain = $d.querySelector("main");
        const imgContainer = $dc.createAndAppend(containerMain, "div");
        imgContainer.className = "main__img";

        const img = $dc.img(imgContainer, "https://i.pinimg.com/736x/02/d9/83/02d98338ca71da358d89c6f6529457c8.jpg");
    };


  
    this.Login = function () {
        // Función que se ejecuta al enviar el formulario
        const Submit = function () {
            try {
                let Fdl = new FormData();

                if (!mail.value || !pass.value) {
                    alert("Completa todos los campos.");
                    return false;
                }

                Fdl.append("accion", "LOGIN");
                Fdl.append("Mail", mail.value);
                Fdl.append("Contraseña", pass.value);

                const res = Post(Fdl);

                console.log(Fdl);

                console.log("respuesta:" + res);

                if (res !== "OK") {
                    alert(res);
                } else {
                    console.log("Login exitoso");

                    // Lógica adicional si el login fue exitoso
                 

                    $f.home1();                  
                }

            } catch (e) {
                alert("Error: " + e.message);
            }

            return false; // Previene el envío tradicional del formulario
        };

        // Limpia la sección principal y crea el formulario
        $ds.clearSection("main");
        const f = $dc.form("Login", "Ingresar");
        const mail = $dc.addInputForm("email", "Mail", "mail-login");
        const pass = $dc.addInputForm("password", "Contraseña", "pass-login");
        f.onsubmit = Submit;
    };




};



const $f = new $$form();  
