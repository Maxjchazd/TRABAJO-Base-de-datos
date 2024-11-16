using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace CapaDeDatos.Interfaces
{
    public interface IConnection: IParameters
    {
        void CreateCommand(string storeprocedure, string referente);
int Insert();
void InsertWithoutID();
bool Exists();
void Update();
void Delete();
DataTable List();
DataRow Find();

    }
}
