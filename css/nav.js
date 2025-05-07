const $$Nav=function(){

    this.init = () => {
        $ds.nav("body");
        $dn.makeButton("Inicio", $ds.home);
        $dn.makeButtonLogin("Ingresar", $f.Login);
        $dn.makeButtonReg("Registro", $f.Regist);
        $dn.makeDropDown("Usuarios", ["Agregar usuario", "Buscar Usuario"], [$f.addUser, $f.findUsers]);
        $dn.makeDropDown("Carreras", ["Agregar carrera", "Buscar Carrera"], [$f.addCarrera, $f.findCarreras]);
        $dn.makeDropDown("Listas", ["Listas de usuarios", "Listas de carreras"], [$f.ListUsers, $f.ListMcarreras]);

    }

}

const $nav=new $$Nav