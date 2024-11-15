using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaDeDatos;
using CapaDeDatos.Clases;
using CapaDeNegocio;
using Newtonsoft.Json;



public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request["accion"] == null) return;

        switch (Request["accion"])
        {

            case "ADDUSUARIO": AddUsuario(); break;

            case "LISTUSUARIOS": ListUsuarios(); break;

            case "DELETEUSER": DeleteUser(); break;

            case "MODIFYUSER": ModifyUser(); break;

            case "FINDUSER": FindUser(); break;

        }
    }

        private void AddUsuario()
        {
            Usuario u = new Usuario();
            u.Nombre = Request["Nombre"];
           u.Mail = Request["Mail"];
           u.Dni = int.Parse(Request["Dni"]);
            try
            {
                u.Add();
                Response.Write("OK");
            }
            catch (Exception er)
            {
                Response.Write(er.Message);
            }

        }



    private void ListUsuarios()
    {
        Usuario u = new Usuario();
        string lista = u.List();
        Response.Write(lista);

    }



    private void DeleteUser()
    {
        Usuario u = new Usuario();
        u.ID = int.Parse(Request["ID"]);

        try
        {
            u.Erase();
            Response.Write("OK");
        }
        catch (Exception er)
        {
            Response.Write(er.Message);
        }
    }

    private void ModifyUser()

    {
        Usuario U = new Usuario();
        U.ID = int.Parse(Request["ID"]);
        U.Nombre = Request["Nombre"];
        U.Dni =int.Parse(Request["DNI"]);
        U.Mail = Request["Mail"];

        try
        {

            U.Modify();
            Response.Write("OK");
        }
        catch (Exception er)
        {
            Response.Write(er.Message);
        }
}



        private void FindUser()
    {
        Usuario u = new Usuario();

        u.ID = int.Parse(Request["ID"]);
        
        u.Dni = int.Parse(Request["Dni"]);
        
        try
        {

            string user = JsonConvert.SerializeObject(u.Find());

            Response.Write(user);
        }
        catch (Exception er)
        {
            Response.Write(er.Message);
        }
    }


}

