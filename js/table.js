const $$DomTable = function () {
    this.row = function (parent, id) {
        const row = $dc.createAndAppend(parent, "tr");
        row.id = `${id}`;
        return row;
    };

    this.dataCell = function (parent) {
        return $dc.createAndAppend(parent, "td");
    };

    this.headerCell = function (parent) {
        return $dc.createAndAppend(parent, "th");
    };

    this.createTable = function () {
        const containerMain = $d.querySelector("main");
        const containerTable = $dc.div(containerMain);
        containerTable.classList.add("container__table");
        $dc.createAndAppend(containerTable, "table");
    };

    this.createThead = function () {
        const table = $d.querySelector("table");
        return $dc.createAndAppend(table, "thead");
    };

    this.createTbody = function () {
        const table = $d.querySelector("table");
        $dc.createAndAppend(table, "tbody");
    };

    let isTable = function () {
        return $d.querySelector("table") !== null;
    };

    this.table = function (listTitles, data) {
        if (!data || !Array.isArray(data) || data.length === 0) return;

        const isUsuario = data[0].hasOwnProperty("NombreUsuario");

        if (!isTable()) {
            this.createTable();
            this.createThead();
            this.createTbody();
            this.addTheadTitle(listTitles);
        }


        if (isUsuario) {
            this.addUsuarioTbodyItem(data);
        } else {
            this.addCarreraTbodyItem(data);
        }
    };

    this.addTheadTitle = function (listTitles) {
        const tableHeader = $d.querySelector("thead");
        const headerRow = this.row(tableHeader, "thead");
        listTitles.forEach((title) => {
            const headerCell = this.headerCell(headerRow);
            headerCell.textContent = title;
        });
        const deleteHeaderCell = this.headerCell(headerRow);
        deleteHeaderCell.textContent = "Borrar";
        const editHeaderCell = this.headerCell(headerRow);
        editHeaderCell.textContent = "Modificar";
    };




    this.addUsuarioTbodyItem = function (data) {
        const tbody = $d.querySelector("tbody");
        data.forEach((userData) => {
            const row = this.row(tbody, userData.ID);
            Object.entries(userData).forEach(([key, value]) => {
                const cell = this.dataCell(row);
                cell.textContent = value;
            });

            const deleteCell = this.dataCell(row);
            createDeleteIcon(deleteCell, userData, row, deleteUser);  // Aquí la función de eliminar es `deleteUser`

            const editCell = this.dataCell(row);
            createEditIcon(editCell, userData, row, modifyUser);
        });
    };

    this.addCarreraTbodyItem = function (data) {
        const tbody = $d.querySelector("tbody");
        data.forEach((carreraData) => {
            const row = this.row(tbody, carreraData.ID);
            Object.entries(carreraData).forEach(([key, value]) => {
                const cell = this.dataCell(row);
                cell.textContent = value;
            });

            const deleteCell = this.dataCell(row);
            createDeleteIcon(deleteCell, carreraData, row, deleteCarrera);  // Aquí la función de eliminar es `deleteCarrera`

            const editCell = this.dataCell(row);
            createEditIcon(editCell, carreraData, row, modifyCarrera);
        });
    };


    this.addRegistroTbodyItem = function (data) {
        const tbody = $d.querySelector("tbody");
        data.forEach((registroData) => {
            const row = this.row(tbody, registroData.ID);
            Object.entries(registroData).forEach(([key, value]) => {
                const cell = this.dataCell(row);
                cell.textContent = value;
            });

            const deleteCell = this.dataCell(row);
            createDeleteIcon(deleteCell, registroData, row, deleteRegistro);  // Aquí la función de eliminar es `deleteRegistro`

            const editCell = this.dataCell(row);
            createEditIcon(editCell, registroData, row, modifyRegistro);
        });
    };


    function createDeleteIcon(parent, data, row) {
        const icono = $dc.icono(parent, "bi-trash3-fill");
        icono.classList.add("tr__icono--delet");

        icono.addEventListener("click", function () {
            const numProps = Object.keys(data).length;
            console.log("Número de propiedades:", numProps); // Solo para verificar

            if (numProps === 4) {
                deleteUser(data, row);
            } else if (numProps === 5) {
                deleteCarrera(data, row);
            } else if (numProps==10){
                deleteRegistro(data, row);
            } else {
                console.error("No se pudo determinar el tipo de objeto:", data);
            }
        });
    }



    function createEditIcon (parent, data, row) {
        const icono = $dc.icono(parent, "bi-pencil-square");
        icono.classList.add("tr__icono--edit");


        icono.addEventListener("click", function () {
            const numProps = Object.keys(data).length;
            console.log("Número de propiedades:", numProps); // Solo para verificar

            if (numProps === 4) {
                modifyUser(data, row);
            } else if (numProps === 5) {
                modifyCarrera(data, row);
            } else if (numProps==10) {
                modifyRegistro(data, row);
            } else {
                console.error("No se pudo determinar el tipo de objeto:", data);
            }
        });
    };
};



   





// Definimos el objeto $f para manejar las funciones globales
if (typeof $f === "undefined") {
    window.$f = {};
}

if (typeof $f.deleteUser === "undefined") {
    $f.deleteUser = function (user) {
        console.log("Eliminando usuario:", user);
    };
}

if (typeof $f.modifyUser === "undefined") {
    $f.modifyUser = function (user) {
        console.log("Modificando usuario:", user);
    };
}



// Función para eliminar un usuario
function deleteUser(user, row) {

    document.querySelector("main").innerHTML = "";

    // Si $f.deleteUser no está definido, mostramos un error
    if (!$f || !$f.deleteUser) {
        console.error("Error: $f.deleteUser no está definido");
        return;
    }



    // Mostrar formulario de confirmación de eliminación
    const Submit = async function () {
        try {
            let Fd = new FormData();
            Fd.append("accion", "DELETEUSER");
            Fd.append("ID", user.ID); // Usar solo el ID del usuario

            const res = await Post(Fd); // Llamada al servidor para eliminar el usuario

            console.log(Fd);
            console.log(res);

            if (res !== "OK") {
                alert("Error al eliminar: " + res);
            } else {
                console.log("Usuario eliminado");
                alert("Usuario eliminado");
                $f.deleteUser(user); // Llamamos a la función de eliminación del usuario

                // Eliminar la fila del DOM si la eliminación fue exitosa
                if (row && row.parentNode) {
                    row.parentNode.removeChild(row);
                    z.appendChild(confirmationMessage);
                    z.appendChild(confirmButton);
                    window.history.go(-1);
                    z.onsubmit = Submit;

                }
            }
        } catch (e) {
            alert("Error: " + e.message);
        }
        return false;
    };

    // Limpiar la sección principal antes de mostrar el formulario de confirmación
    $ds.clearSection("main");

   

    // Crear formulario de confirmación con el título "Eliminar Usuario"
    const z = $dc.form("¿Estás seguro de eliminar al usuario?", "Eliminar");

    // Crear un mensaje de confirmación
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = `¿Deseas eliminar al usuario ${user.Nombre}?`;

    // Crear un botón de "Confirmar"
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("bi-trash3-fill", "tr__icono--delet");
    confirmButton.textContent = "Confirmar eliminación";
    confirmButton.addEventListener("click", Submit); // Llamar a la función Submit al hacer clic 
    z.appendChild(confirmationMessage);
    z.appendChild(confirmButton);

    return false;

    z.onsubmit = Submit;

}

// Función para modificar un usuario (por ahora solo muestra un mensaje)
function modifyUser(user) {
    if (!$f || !$f.modifyUser) {
        console.error("Error: $f.modifyUser no está definido");
        return;
    }
    $f.modifyUser(user); // Llamamos a la función para modificar el usuario
}




//Mostrar formulario para modificar usuario
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



}
    //sección carreras

// Definimos el objeto $f para manejar las funciones globales

    if (typeof $f === "undefined") {
        window.$f = {};
    }

    if (typeof $f.deleteCarrera === "undefined") {
        $f.deleteCarrera = function (carrera) {
            console.log("Eliminando carrera:", carrera);
        };
    }

    if (typeof $f.modifyCarrera === "undefined") {
        $f.modifyCarrera = function (carrera) {
            console.log("Modificando carrera:", carrera);
        };
    }



// Función para eliminar una carrera
function deleteCarrera(carrera, row) {

    document.querySelector("main").innerHTML = "";


    // Verificar que la función deleteCarrera esté definida
    if (!$f || !$f.deleteCarrera) {
        console.error("Error: $f.deleteCarrera no está definido");
        return;
    }

  

    // Función de confirmación
    const Submit = async function (e) {
        e.preventDefault();

        try {
            let Fdc = new FormData();
            Fdc.append("accion", "DELETECARRERA");
            Fdc.append("ID", carrera.ID);
            Fdc.append("Cátedra", carrera.Cátedra);

            const res = await Post(Fdc);

            console.log(Fdc);
            console.log(res);

            if (res !== "OK") {
                alert("Error al eliminar: " + res);
            }
            
            else {
                alert("Carrera eliminada");
                $f.deleteCarrera(carrera);

                // Eliminar la fila del DOM si fue exitosa
                if (row && row.parentNode) {
                    row.parentNode.removeChild(row);
                }

                // Volver a la pantalla anterior
                window.history.go(-1);
            }
        } catch (e) {
            alert("Error: " + e.message);
        }

        return false;
    };

    // Limpiar la sección principal antes de mostrar el formulario de confirmación
    $ds.clearSection("main");

    // Crear formulario de confirmación con el título "Eliminar Carrera"
    const x = $dc.form("¿Estás seguro de eliminar la carrera?", "Eliminar");

    // Crear un mensaje de confirmación
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = `¿Deseas eliminar la carrera ${carrera.Nombre}?`;
    x.appendChild(confirmationMessage);

    // Crear un botón de "Confirmar"
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("btn-eliminar-carrera"); // CLASE ÚNICA para diferenciarla de usuarios
    confirmButton.textContent = "Confirmar eliminación";

    // Asociar evento al botón de confirmar
    confirmButton.addEventListener("click", Submit);
    x.appendChild(confirmButton);
    // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
    x.onsubmit = Submit;

}


    // Función para modificar carrera(por ahora solo muestra un mensaje)
    function modifyCarrera(carrera) {
        if (!$f || !$f.modifyCarrera) {
            console.error("Error: $f.modifyCarrera no está definido");
            return;
        }
        $f.modifyCarrera(carrera); // Llamamos a la función para modificar carrera
    }




    //Mostrar formulario para modificar carrera
this.modifyCarrera = function (carrera) {

    const Submit = function () {
        try {
            let Fdc = new FormData();
            Fdc.append("accion", "MODIFYCARRERA");
            Fdc.append("ID", carrera.ID);
            Fdc.append("Nombre", nombre.value);
            Fdc.append("Mail", mail.value);
            Fdc.append("Cátedra", cátedra.value);
            Fdc.append("código", código.value);
            let res = Post(Fdc);
            if (res !== "OK") alert(res);
            $f.addCarrera();
        } catch (e) {
            alert(e);
        }
        return false;
    }

    $ds.clearSection("main");

    // Crea un formulario con el título "Modificar Carrera" y un botón con el texto "Modificar"
    const f = $dc.form("Modificar Carrera", "Modificar");

    // Crea campos de entrada para nombre, DNI y correo electrónico
    const nombre = $dc.addInputForm("text", "Nombre", "name-carrera");
    const código = $dc.addInputForm("number", "Código", "código-carrera");
    const cátedra = $dc.addInputForm("text", "Cátedra", "cátedra-carrera");
    const mail = $dc.addInputForm("email", "Mail", "mail-carrera");

    // Asigna los valores del objeto 'carrera' a los campos del formulario
    nombre.value = carrera.Nombre;
    código.value = carrera.Código;
    cátedra.value = carrera.Cátedra;
    mail.value = carrera.Mail;

    // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
    f.onsubmit = Submit;

};

        //ZONA REGISTRO


if (typeof $f === "undefined") {
    window.$f = {};
}

if (typeof $f.deleteRegistro === "undefined") {
    $f.deleteRegistro = function (registro) {
        console.log("Eliminando registro:", registro);
    };
}

if (typeof $f.modifyRegistro === "undefined") {
    $f.modifyRegistro = function (registro) {
        console.log("Modificando registro:", registro);
    };
}



function deleteRegistro(registro, row) {



    // Verificar que la función deleteCarrera esté definida
    if (!$f || !$f.deleteRegistro) {
        console.error("Error: $f.deleteRegistro no está definido");
        return;
    }

    // Función de confirmación
    const Submit = async function (e) {
        e.preventDefault();

        try {
            let Rdc = new FormData();
            Rdc.append("accion", "DELETEREGISTRO");
            Rdc.append("ID", registro.ID);
            Rdc.append("Nombre", registro.Nombre);

            const res = await Post(Rdc);

            console.log(Rdc);
            console.log(res);

            if (res !== "OK") {
                alert("Error al eliminar: " + res);
            }

            else {
                alert("Registro eliminado");
                $f.deleteRegistro(registro);

                // Eliminar la fila del DOM si fue exitosa
                if (row && row.parentNode) {
                    row.parentNode.removeChild(row);
                }

                // Volver a la pantalla anterior
                window.history.go(-1);
            }
        } catch (e) {
            alert("Error: " + e.message);
        }

        return false;
    };

    // Limpiar la sección principal antes de mostrar el formulario de confirmación
    $ds.clearSection("main");

    // Crear formulario de confirmación con el título "Eliminar Carrera"
    const x = $dc.form("¿Estás seguro de eliminar el registro?", "Eliminar");

    // Crear un mensaje de confirmación
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = `¿Deseas eliminar la carrera ${registro.Nombre}?`;
    x.appendChild(confirmationMessage);

    // Crear un botón de "Confirmar"
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("btn-eliminar-carrera"); // CLASE ÚNICA para diferenciarla de usuarios
    confirmButton.textContent = "Confirmar eliminación";

    // Asociar evento al botón de confirmar
    confirmButton.addEventListener("click", Submit);
    x.appendChild(confirmButton);
    // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
    x.onsubmit = Submit;
};


function modifyRegistro(registro) {
    if (!$f || !$f.modifyRegistro) {
        console.error("Error: $f.modifyRegistro no está definido");
        return;
    }
    $f.modifyRegistro(registro); // Llamamos a la función para modificar carrera
}


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
    const f = $dc.form("Registro", "Registrar");
    const nombre = $dc.addInputForm("text", "Nombre", "name-registro");
    const apellido = $dc.addInputForm("text", "Apellido", "apellido-registro");
    const celular = $dc.addInputForm("number", "Célular", "celelular-registro");
    const correop = $dc.addInputForm("text", "Correo Postal", "correop-registro");
    const direccionf = $dc.addInputForm("text", "Domicilio", "direccion-registro");
    const dni = $dc.addInputForm("number", "DNI", "dni-registro");
    const mail = $dc.addInputForm("email", "Mail", "mail-registro");
    const pass = $dc.addInputForm("text", "Contraseña", "pass-registro");

    nombre.value = registro.Nombre;
    apellido.value = registro.Apellido;
    celular.value = registro.Célular;
    correop.value = registro.Corre_Postal;
    direccionf.value = registro.Domicilio;
    dni.value = registro.Dni;
    mail.value = registro.Mail;
    pass.value = registro.Contraseña;

    // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
    f.onsubmit = Submit;
};







// Instanciamos $$DomTable
const $dt = new $$DomTable();

