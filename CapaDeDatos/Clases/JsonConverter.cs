using CapaDeDatos.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CapaDeDatos.Clases
{
    public class JsonConverter : IJsonConverter
    {
        public string RowToJson(DataRow row)
        {
            // Crea un diccionario para almacenar los pares clave-valor de la fila.
            var rowDict = new Dictionary<string, object>();

            // Itera sobre las columnas de la DataTable.
            foreach (DataColumn column in row.Table.Columns)
            {
                // Agrega un par clave-valor al diccionario, donde la clave es el
                // nombre de la columna y el valor es el valor de la celda correspondiente.
                rowDict.Add(column.ColumnName, row[column]);
            }

            // Serializa el diccionario a formato JSON.
            var jsonRow = JsonSerializer.Serialize(rowDict);

            return jsonRow;
        }

        public string TableToJson(DataTable dt)
        {
            // Crea una lista para almacenar los diccionarios de cada fila.
            List<Dictionary<string, object>> ListDict = new List<Dictionary<string, object>>();

            // Itera sobre las filas de la DataTable.
            foreach (DataRow row in dt.Rows)
            {
                // Crea un diccionario para representar la fila actual.
                Dictionary<string, object> rowDict = new Dictionary<string, object>();

                // Itera sobre las columnas de la DataTable.
                foreach (DataColumn column in dt.Columns)
                {
                    // Agrega un par clave-valor al diccionario.
                    rowDict.Add(column.ColumnName, row[column]);
                }

                // Agrega el diccionario a la lista.
                ListDict.Add(rowDict);
            }

            // Serializa la lista de diccionarios a una cadena JSON.
            string jsonList = JsonSerializer.Serialize(ListDict);

            return jsonList;
        }
    }
}
