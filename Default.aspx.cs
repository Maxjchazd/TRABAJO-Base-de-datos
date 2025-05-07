using System;
using System.Text.Json;
using System.Data.SqlClient;
using System.Collections.Generic;
using CapaDeNegocio;


public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request["accion"] == null) return;

        switch (Request["accion"])
        {
            case "ADDUSUARIO": AddUsuario(); break;
            case "LISTUSUARIOS": ListUsuarios(); break;
            case "DELETEUSER": DeleteUser(); break;
            case "MODIFYUSER": ModifyUser(); break;
            case "FINDUSER": FindUser(); break;
        }
    }


    

    private readonly string connectionString = "Data Source=localhost\\SQLEXPRESS;Initial Catalog=DBWebEscuela25;Integrated Security=True";

    private void AddUsuario()
    {
        string query = "INSERT INTO Usuarios (Nombre, Mail, Dni) VALUES (@Nombre, @Mail, @Dni)";
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Nombre", Request["Nombre"]);
                command.Parameters.AddWithValue("@Mail", Request["Mail"]);
                command.Parameters.AddWithValue("@Dni", int.Parse(Request["Dni"]));

                connection.Open(); 
                int rowsAffected = command.ExecuteNonQuery(); 

                if (rowsAffected > 0)
                {
                    Response.Write("Usuario agregado correctamente.");
                }
                else
                {
                    Response.Write("No se pudo agregar el usuario.");
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message); 
            }
        }
    }

    private void ListUsuarios()
    {
        string query = "SELECT * FROM Usuarios"; 
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                SqlCommand command = new SqlCommand(query, connection);
                connection.Open(); 

                SqlDataReader reader = command.ExecuteReader();
                var usuarios = new List<Usuario>();

                while (reader.Read())
                {
                    var usuario = new Usuario
                    {
                        ID = reader.GetInt32(reader.GetOrdinal("ID")),
                        Nombre = reader.GetString(reader.GetOrdinal("Nombre")),
                        Mail = reader.GetString(reader.GetOrdinal("Mail")),
                        Dni = reader.GetInt32(reader.GetOrdinal("Dni"))
                    };

                    usuarios.Add(usuario);
                    Console.WriteLine(usuario);
                }

                connection.Close(); 

                
                string jsonResponse = JsonSerializer.Serialize(usuarios);
                Response.ContentType = "application/json";
                Response.Write(jsonResponse);
                Console.WriteLine(jsonResponse);

            }
            catch (Exception ex)
            {
                Response.Write(ex.Message); 
        }
    }

    private void DeleteUser()
    {
        string query = "DELETE FROM Usuarios WHERE ID = @ID"; 
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@ID", int.Parse(Request["ID"])); 

                connection.Open(); 
                int rowsAffected = command.ExecuteNonQuery(); 
                if (rowsAffected > 0)
                {
                    Response.Write("Usuario eliminado correctamente.");
                }
                else
                {
                    Response.Write("No se encontró el usuario para eliminar.");
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message); 
            }
        }
    }

    private void ModifyUser()
    {
        string query = "UPDATE Usuarios SET Nombre = @Nombre, Mail = @Mail, Dni = @Dni WHERE ID = @ID"; 
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@ID", int.Parse(Request["ID"])); 
                command.Parameters.AddWithValue("@Nombre", Request["Nombre"]);
                command.Parameters.AddWithValue("@Mail", Request["Mail"]);
                command.Parameters.AddWithValue("@Dni", int.Parse(Request["Dni"]));

                connection.Open(); 
                int rowsAffected = command.ExecuteNonQuery(); 

                if (rowsAffected > 0)
                {
                    Response.Write("Usuario modificado correctamente.");
                }
                else
                {
                    Response.Write("No se encontró el usuario para modificar.");
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message); 
            }
        }
    }


    private void FindUser()
    {
        string query = "SELECT * FROM Usuarios WHERE ID = @ID"; 
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@ID", int.Parse(Request["ID"])); 

                connection.Open(); 
                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    var usuario = new Usuario
                    {
                        ID = reader.GetInt32(reader.GetOrdinal("ID")),
                        Nombre = reader.GetString(reader.GetOrdinal("Nombre")),
                        Mail = reader.GetString(reader.GetOrdinal("Mail")),
                        Dni = reader.GetInt32(reader.GetOrdinal("Dni"))
                    };

                   
                    string jsonResponse = JsonSerializer.Serialize(usuario);
                    Response.ContentType = "application/json";
                    Response.Write(jsonResponse);
                }
                else
                {
                    Response.Write("Usuario no encontrado.");
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message); 
            }
        }
    }
}
