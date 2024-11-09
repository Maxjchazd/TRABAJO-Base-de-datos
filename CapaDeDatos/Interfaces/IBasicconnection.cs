using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace CapaDeDatos.Interfaces
{
    public interface IBasicconnection
    {
        SqlConnection MyConnection { get; set; }
        SqlCommand MyCommand { get; set; }
        string Referente { get; set; }
        string ConnectionString { get; set; }
        void OpenConnection();
    }
}
