using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using CapaDeDatos.Interfaces;



namespace CapaDeDatos.Clases
{
    public class Connection : IBasicconnection, IConnection
    {
#region Propiedades
        public SqlConnection MyConnection { get; set; }
        public SqlCommand MyCommand { get; set; }
        public string Referente { get; set; }
        public string ConnectionString { get; set; }

        #endregion


        #region constructor Singleton

        static Connection instance = new Connection(); // static: se carga una sola vez cuando se invoca por primera vez
                                                    

        public static Connection GetInstance => instance; // único punto de acceso para obtener la instancia de la conexión
                                                         

        private Connection()
        {
            string PathConfig = AppDomain.CurrentDomain.BaseDirectory + "Web.config"; // Esta variable almacena la ruta
            
            
            if (File.Exists(PathConfig))
            {
                ConnectionString = ConfigurationManager.ConnectionStrings["MyConnection"].ConnectionString;
                MyConnection = new SqlConnection(ConnectionString);
                return;
            }

            throw new Exception("ERROR: No se encontró la base de datos");
        }


        #endregion


        #region IBasisconection
        public void OpenConnection()
        {
            if (MyConnection.State != ConnectionState.Open) // connectionState es una enumeración
            {
                try
                {
                    MyConnection.Open();
                }
                catch (Exception)
                {
                    throw new Exception("ERROR: no se pudo abrir la conexión");
                }
            }
        }
        #endregion



        #region IConnection


        public void CreateCommand(string storeprocedure, string referente)
        {
            MyCommand = new SqlCommand(storeprocedure, MyConnection);
            MyCommand.CommandType = CommandType.StoredProcedure;
            Referente = referente;
        }

        public void Delete()
        {
            OpenConnection();
            try
            {
                MyCommand.ExecuteNonQuery();
            }
            catch (Exception)
            {
                throw new Exception("ERROR: No se pudo eliminar el registro" + Referente);
            }
            finally
            {
                MyConnection.Close();
            }
        }

        public bool Exists()
        {
            OpenConnection();
            try
            {
                int i = int.Parse(MyCommand.ExecuteScalar().ToString());
                return i > 0;
            }
            catch (Exception)
            {
                throw new Exception("ERROR: no se pudo encontrar " + Referente);
            }
            finally
            {
                MyConnection.Close();
            }
        }

        public DataRow Find()
        {
            OpenConnection();
            try
            {
                DataTable DT = new DataTable();
                DT.Load(MyCommand.ExecuteReader()); // Carga en la tabla los datos
                return DT.Rows[0]; // Devuelve la primera fila de la tabla
            }
            catch (Exception)
            {
                throw new Exception("ERROR: no se pudo encontrar " + Referente);
            }
            finally
            {
                MyConnection.Close();
            }
        }

        public int Insert()
        {
            OpenConnection();
            try
            {
                int i = int.Parse(MyCommand.ExecuteScalar().ToString());
                return i;
            }
            catch (Exception)
            {
                throw new Exception("ERROR: no se pudo agregar " + Referente);
            }
            finally
            {
                MyConnection.Close();
            }
        }

        public void InsertWithoutID()
        {
            OpenConnection();
            try
            {
                MyCommand.ExecuteNonQuery();
            }
            catch (Exception)
            {
                throw new Exception("ERROR: No se pudo insertar el registro");
            }
            finally
            {
                MyConnection.Close();
            }
        }

        public DataTable List()
        {
            OpenConnection();
            try
            {
                DataTable DT = new DataTable();
                DT.Load(MyCommand.ExecuteReader()); // Carga en la tabla los datos
                return DT;
            }
            catch (Exception)
            {
                throw new Exception("ERROR: no se pudo listar " + Referente);
            }
            finally
            {
                MyConnection.Close();
            }
        }

        public void Update()
        {
            OpenConnection();
            try
            {
                MyCommand.ExecuteNonQuery();
            }
            catch (Exception)
            {
                throw new Exception("ERROR: No se pudo actualizar el registro");
            }
            finally
            {
                MyConnection.Close();
            }
        }



        #endregion



        #region Iparameters



        public void ParameterAddBool(string Name, bool Value)
        {
            MyCommand.Parameters.AddWithValue("@" + Name, Value);
        }

        public void ParameterAddDateTime(string Name, DateTime Value)
        {
            MyCommand.Parameters.AddWithValue("@" + Name, Value);
        }

        public void ParameterAddFloat(string Name, double Value)
        {
            MyCommand.Parameters.AddWithValue("@" + Name, Value);
        }

        public void ParameterAddInt(string Name, int Value)
        {
            MyCommand.Parameters.AddWithValue("@" + Name, Value);
        }

   

        public void ParameterAddVarChar(string Name, string Value)
        {
            MyCommand.Parameters.AddWithValue("@" + Name, Value);
        }

        #endregion

    }
}
