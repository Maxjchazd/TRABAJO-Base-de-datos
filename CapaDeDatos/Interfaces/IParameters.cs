using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;


namespace CapaDeDatos.Interfaces
{
    public interface IParameters
    {
void ParameterAddVarChar(string Name, string Value);

void ParameterAddInt(string Name, int Value);

void ParameterAddBool(string Name, bool Value);

void ParameterAddDateTime(string Name, System.DateTime Value);

void ParameterAddFloat(string Name, double Value);

    }
}
