using CapaDeDatos.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace CapaDeDatos.Clases
{
    public class ParentSingleton
    {
        public IConnection IConnection => Connection.GetInstance;

        public IJsonConverter IJsonConverter
        {
            get => new JsonConverter();
        }
    }
}
