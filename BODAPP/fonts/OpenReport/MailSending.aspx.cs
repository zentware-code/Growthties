using System;
using System.Configuration;
using CrystalDecisions.CrystalReports;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.ReportSource;
using CrystalDecisions;
using CrystalDecisions.Shared;
using System.Web.Services;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using System.Linq;
using BODDal.Models;

using System.Net;
using System.Net.Mail;

namespace BODAPP.OpenReport
{
    public partial class MailSending : System.Web.UI.Page
    {
        ExportFormatType formatType = ExportFormatType.NoFormat;
        CrystalDecisions.CrystalReports.Engine.ReportDocument crystalReport = new ReportDocument();
        string conString = ConfigurationManager.ConnectionStrings["ConStr"].ConnectionString;
        SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();

        Dictionary<string, string> Params;
        public static UserModel UserModel { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];

            if (UserModel == null)
            {
                Response.Redirect("/Account/EmployeeLogin", true);
                return;
            }

            var keys = Request.QueryString["ReportName"];
            if (keys != null)
            {
                JObject obj = JObject.Parse(keys);
                var master = (JArray)obj.SelectToken("Master");
                var detal = (JArray)obj.SelectToken("Detail");

                GenerateReport(master, detal);
            }
        }
        private void GenerateReport(JArray master, JArray detal)
        {
            string FileName = "";
            try
            {
                string reportName = master[0]["ReportName"].ToString();
                FileName = master[0]["FileName"].ToString();

                crystalReport.Load(Server.MapPath("~/Reports/" + reportName));
                crystalReport.Refresh();

                builder.ConnectionString = conString;

                string server = builder.DataSource;
                string database = builder.InitialCatalog;
                string userid = builder.UserID;
                string password = builder.Password;

                crystalReport.DataSourceConnections[0].SetConnection(server, database, userid, password);
                crystalReport.DataSourceConnections[0].IntegratedSecurity = false;
                crystalReport.SetDatabaseLogon(server, database, userid, password);

                for (int i = 0; i < crystalReport.Subreports.Count; i++)
                {
                    crystalReport.Subreports[i].DataSourceConnections[0].SetConnection(server, database, userid, password);
                    crystalReport.Subreports[i].DataSourceConnections[0].IntegratedSecurity = false;
                    crystalReport.Subreports[i].SetDatabaseLogon(server, database, userid, password);
                }
                crystalReport.VerifyDatabase();

                foreach (var item in detal)
                {
                    string a = item.ToString();
                    string noNewLines = a.Replace("\n", "");
                    Params = JsonConvert.DeserializeObject<Dictionary<string, string>>(noNewLines);
                }
                Params.Add("CompanyId", UserModel.CompanyID.ToString());
                Params.Add("FyId", UserModel.FyId.ToString());
                //Params.Add("UserID", UserModel.UserID.ToString());

                foreach (KeyValuePair<string, string> entry in Params)
                {
                    crystalReport.SetParameterValue("@" + entry.Key, entry.Value == "" ? DBNull.Value : (object)entry.Value);
                }
                formatType = ExportFormatType.PortableDocFormat;

                crystalReport.ExportToHttpResponse(formatType, Response, true, FileName);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                sendMail(FileName);
                crystalReport.Close();
                crystalReport.Dispose();
                GC.Collect();
            }
        }

        private void sendMail(string fileName)
        {

            try
            {

                MailMessage mm = new MailMessage("madhushalaonlinecourse@gmail.com", "retina1991m@gmail.com");
                mm.Subject = "Application Confirm By Madhushala School Of Bevrage";
                mm.Body = "<!DOCTYPE html><html><head><title>Mail Body</title></head><body> <section style='font-family: calibri'><div style='-webkit-box-shadow: 0px 0px 70px -30px rgba(0,0,0,0.67); -moz-box-shadow: 0px 0px 70px -30px rgba(0,0,0,0.67); box-shadow: 0px 0px 70px -30px rgba(0,0,0,0.67); width: 80%; border-radius: 5px; margin: 0 auto; padding: 30px; text-align: center;'> <img src='https://thumbs.gfycat.com/ShyCautiousAfricanpiedkingfisher-size_restricted.gif' width='10%' /><h1 style='color: #32cd32;'>Congratulations, you have successfully registered for our Online Standard Bartending Certification Program</h1><h2 style='color: #ff8a00'>Your Registration ID is REG01 </h2><p style='color: #607d8b;font-size:16px'> <br>Please pay the fees <b>Rs.7999/- including GST  </b> <br>Through online transfer by <b style='color:green'>(Google Pay,NEFT,UPI,IMPS,RTGS)</b> or by depositing <b style='color:green'>Cheque </b>of the same amount to below account to get started with the course. Thanks <br> <br><b>Account Name : Madhushala Bar Academy</b> <br><b> Bank Name : ICICI<br>A/c No. : 698605500352<br>IFSC : ICIC0006986</b> <br /> <br />For further reference take a screenshot after fees payment and send in WhatsApp number <b style='color: #35cd96'>9920142092</b></p></div> </section></body></html>";
                mm.Attachments.Add(new Attachment(crystalReport.ExportToStream(ExportFormatType.PortableDocFormat), fileName + ".pdf"));
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential();
                NetworkCred.UserName = "madhushalaonlinecourse@gmail.com";
                NetworkCred.Password = "Madhushala123";
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = NetworkCred;
                smtp.Port = 587;
                smtp.Send(mm);


            }
            catch (Exception ex)
            {
            }
            finally
            {

                //mm.Dispose();
            }
        }

    }
}