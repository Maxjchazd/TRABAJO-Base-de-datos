using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace CapaDeDatos.Interfaces
{
    public interface IJsonConverter
    {
string RowToJson(DataRow Dr);

string TableToJson(DataTable Dt);
    }
}
