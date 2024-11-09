using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.IO;



namespace Crud
{
    public class Usuario : IABMC<Usuario>, IUsuario
    {
        private static Datos datos =new Datos();
        
        #region IID
        public int ID { get ; set ; }

        #endregion

        #region IUsuario
        public string Nombre { get ; set ; }
        public int Dni { get; set; }
        public string Mail { get; set; }

        public bool DniExist(int dni)
        {
         
            return false;
            
        }
        public bool MailExist(string mail)
        {
            return false;

        }
        //-------------realizar los alumnos
        public Usuario FindDni(int dni)
        {
            throw new NotImplementedException();
        }

        public Usuario FindMail(string mail)
        {
            throw new NotImplementedException();
        }
        //---------------------------------

        public string List()
        {

            return datos.List();
        }


        #endregion

        #region IABMC
        public void Add()
        {
            datos.Add(this);
        }
        public void Erase()
        {
            datos.Erase(this);
        }

        public Usuario Find()
        {
          datos.Find(this);
            return this;



        }
        
        public void Modify()
        {

            datos.Modify(this);
            
        }
        #endregion

    }
}
