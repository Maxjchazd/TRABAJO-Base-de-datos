using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDeNegocio
{
    internal interface IUsuario : IABMC
    {
        string Nombre { get; set; }
        int Dni { get; set; }
        string Mail { get; set; }

        bool DniExist();
        bool MailExist();
        string FindByMail();
        string FindByDni();
    }
}