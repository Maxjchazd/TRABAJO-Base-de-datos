using System;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace CapaDeNegocio

{
    internal partial class SingletonUsuario : ISingletonUsuario

    {


        #region InstanciaSingletonUsuario
        public ISingletonUsuario ISU { get => this; }
        #endregion
      


        #region IGenericSingletonUsuario
        void IGenericSingletonUsuario.Add(Usuario Data)
        {
            if (Data.DniExist()) throw new Exception("Existe otro usuario con el mismo Dni");
            if (Data.MailExist()) throw new Exception("Existe otro usuario con el mismo Mail");

            IConnection.CreateCommand("Usuarios Insert", "Usuario");
            IConnection.ParameterAddVarChar("Nombre", Data.Nombre);
            IConnection.ParameterAddInt("Dni", Data.Dni);
            IConnection.ParameterAddVarChar("Mail", Data.Mail);

            Data.ID = IConnection.Insert(); //devuelve la primera columna de la primera fila, o sea el ID
        }

        void IGenericSingletonUsuario.Erase(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios Delete", "Usuarios");
            IConnection.ParameterAddInt("ID", Data.ID);
            IConnection.Delete();
        }

        string IGenericSingletonUsuario.Find(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios Find", "Usuario");
            IConnection.ParameterAddInt("ID", Data.ID);
            DataRow Dr = IConnection.Find();
            return IJsonConverter.RowToJson(Dr);
        }

        void IGenericSingletonUsuario.Modify(Usuario Data)
        {
            if (Data.DniExist()) throw new Exception("Existe otro usuario con el mismo Dni");
            if (Data.MailExist()) throw new new Exception("Existe otro usuario con el mismo Mail");

            IConnection.CreateCommand("Usuarios Update", "Usuario");
            IConnection.ParameterAddInt("ID", Data.ID);
            IConnection.ParameterAddVarChar("Nombre", Data.Nombre);
            IConnection.ParameterAddInt("Dni", Data.Dni);
            IConnection.ParameterAddVarChar("Mail", Data.Mail);
            IConnection.Update();
        }
        #endregion

        #region SingletonUsuario
        bool ISingletonUsuario.MailExists(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios MailExists", "Usuarios");
            IConnection.ParameterAddInt("ID", Data.ID);
            IConnection.ParameterAddVarChar("Mail", Data.Mail);
            return IConnection.Exists();
        }

        bool ISingletonUsuario.DniExists(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios DniExists", "Usuario");
            IConnection.ParameterAddInt("ID", Data.ID);
            IConnection.ParameterAddInt("Dni", Data.Dni);
            return IConnection.Exists();
        }

        string ISingletonUsuario.FindByDni(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios FindByDni", "Usuario");
            IConnection.ParameterAddInt("Dni", Data.Dni);
            DataRow Dr = IConnection.Find();
            return IJsonConverter.RowToJson(Dr);
        }

        string ISingletonUsuario.FindByMail(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios FindByMail", "Usuarios");
            IConnection.ParameterAddVarChar("Mail", Data.Mail);
            DataRow Dr = IConnection.Find();
            return IJsonConverter.RowToJson(Dr);
        }



        bool ISingletonUsuario.DniExists(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios DniExists", "Usuario");
            IConnection.ParameterAddInt("ID", Data.ID);
            IConnection.ParameterAddInt("Dni", Data.Dni);
            return IConnection.Exists();
        }

        string ISingletonUsuario.FindByDni(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios FindByDni", "Usuario");
            IConnection.ParameterAddInt("Dni", 1  Data.Dni);
            DataRow Dr = IConnection.Find();
            return IJsonConverter.RowToJson(Dr);
        }

        string ISingletonUsuario.FindByMail(Usuario Data)
        {
            IConnection.CreateCommand("Usuarios FindByMail", "Usuarios");
            IConnection.ParameterAddVarChar("Mail", Data.Mail);
            DataRow Dr = IConnection.Find();
            return IJsonConverter.RowToJson(Dr);
        }

        string ISingletonUsuario.List()
        {
            try
            {
                DataTable Dt = IConnection.CreateCommand("Usuarios List", "Usuario").List();
                return IJsonConverter.TableToJson(Dt);
            }
            catch (Exception)
            {
                throw new Exception("ERROR: no se pudo listar los usuarios");
            }
        }
        #endregion


    }
}
