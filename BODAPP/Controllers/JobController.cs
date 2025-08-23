using BODDal;
using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;


namespace BODAPP.Controllers
{
    public class JobController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public static UserModel SMMEUserEmpModel { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static GlobalPages pageName { get; set; }
        public GlobalData global = new GlobalData();
        public static DataTable dt = new DataTable();
        DAL dl = new DAL();

        public static void GetSession()
        {
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            EnterpriseUserModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseUserDataModel"];
            SMMEUserModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserDataModel"];
            SMMEUserEmpModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserEmpDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
        }

        public JobController()
        {
            GetSession();

        }
        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }

        private static T GetItem1<T>(DataTable dt)
        {
            Type temp = typeof(T);

            T data = Activator.CreateInstance<T>();
            foreach (DataRow row in dt.Rows)
            {
                data = GetItem<T>(row);
            }

            return data;
        }

        public ActionResult CreateJobs()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAllJobsForAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }

            else
            {
                DataSet ds = new DataSet();
                
                global.StoreProcedure = "AdminDashBoard_USP";
                global.TransactionType = "SelectAdminDashBoard";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                AdminDashBoard dash = new AdminDashBoard();
                dash = GetItem1<AdminDashBoard>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = dash;
                return View(Srecord);
            }

        }
        public ActionResult CreateJobsForEnterprise()
        {

            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
                return View();
            
        }
        public ActionResult ViewAllJobsForEnterprise()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
                return View();
            
        }
        public ActionResult CreateJobsForSMME()
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            if (SMMEUserModel != null)
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                return View();
            }
            else
            {
                ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
                return View();
            }
        }
        public ActionResult ViewAllJobsForSMME()
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            if (SMMEUserModel != null)
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                return View();
            }
            else
            {
                ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
                return View();
            }
        }
        public ActionResult ViewAllJobsCardForSMME()
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            if (SMMEUserModel != null)
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                ViewBag.UmId = SMMEUserModel.UserID;
                return View();
            }
            else
            {
                ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
                ViewBag.UmId = SMMEUserEmpModel.UserID;
                return View();
            }
        }
        public ActionResult JobProgressSMME(int? Id, string type, int? MId)
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            if (SMMEUserModel != null)
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;

                DataSet ds = new DataSet();
                global.param1Value = Id;
                global.param1 = "JD_Id";
                global.param3Value = MId;
                global.param3 = "JobChildId";
                global.paramString2 = type;
                global.param2 = "JD_VistType";
                global.StoreProcedure = "JobDetails_USP";
                global.TransactionType = "SelectJobCustDataForProgress";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                JobDetails job = new JobDetails();
                job = GetItem1<JobDetails>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = job;
                return View(Srecord);
            }
            else
            {
                ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;

                DataSet ds = new DataSet();
                global.param1Value = Id;
                global.param1 = "JD_Id";
                global.param3Value = MId;
                global.param3 = "JobChildId";
                global.paramString2 = type;
                global.param2 = "JD_VistType";
                global.StoreProcedure = "JobDetails_USP";
                global.TransactionType = "SelectJobCustDataForProgress";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                JobDetails job = new JobDetails();
                job = GetItem1<JobDetails>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = job;
                return View(Srecord);
            }
        }
        public ActionResult JobProgressEnterprise(int? Id, string type, int? MId)
        {
         if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }

                DataSet ds = new DataSet();
                global.param1Value = Id;
                global.param1 = "JD_Id";
                global.param3Value = MId;
                global.param3 = "JobChildId";
                global.paramString2 = type;
                global.param2 = "JD_VistType";
                global.StoreProcedure = "JobDetails_USP";
                global.TransactionType = "SelectJobCustDataForProgress";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                JobDetails job = new JobDetails();
                job = GetItem1<JobDetails>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = job;
                return View(Srecord);
            
        }

        public ActionResult JobCalender()
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }
        public ActionResult JobProgressAdmin(int? Id, string type, int? MId)
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            else
            {
                //ViewBag.EntrId = UserModel.UM_MainID;

                DataSet ds = new DataSet();
                global.param1Value = Id;
                global.param1 = "JD_Id";
                global.param3Value = MId;
                global.param3 = "JobChildId";
                global.paramString2 = type;
                global.param2 = "JD_VistType";
                global.StoreProcedure = "JobDetails_USP";
                global.TransactionType = "SelectJobCustDataForProgress";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                JobDetails job = new JobDetails();
                job = GetItem1<JobDetails>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = job;
                return View(Srecord);
            }
        }

        public ActionResult JobInvoice(int? Id, string M ,int? MId)
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            DataSet ds = new DataSet();

            if (M == "E")
            {
                global.param1Value = Id;
                global.param1 = "JI_Id";
                global.param2Value = SMMEUserModel.UM_MainID;
                global.param2 = "JI_SMMEId";
                global.StoreProcedure = "JobInvoice_USP";
                global.TransactionType = "SelectForInvoicePreview";
            }
            else
            {
                global.param1Value = Id;
                global.param1 = "JI_JobId";
                global.param3Value = MId;
                global.param3 = "JI_ChildId";
                global.param2Value = SMMEUserModel.UM_MainID;
                global.param2 = "JI_SMMEId";
                global.StoreProcedure = "JobInvoice_USP";
                global.TransactionType = "SelectForInvoice";

            }
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobInvoice job = new JobInvoice();
            job = GetItem1<JobInvoice>(ds.Tables[0]);
            job.UserName = SMMEUserModel.UserName;
            ViewBag.JI_Id = Id;
            ViewBag.MId = MId;
            ViewBag.Mode = M;
            return View(job);
        }
      public ActionResult JobInvoiceList()
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }
      public ActionResult JobInvoicePreview(int? Id, int? MId)
      {
        
          DataSet ds = new DataSet();
          global.param1Value = Id;
          global.param1 = "JI_Id";
          global.param3Value = MId;
          global.param3 = "JI_ChildId";
          global.param2Value = SMMEUserModel.UM_MainID;
          global.param2 = "JI_SMMEId";
          global.StoreProcedure = "JobInvoice_USP";
          global.TransactionType = "SelectForInvoicePreview";
          ds = dl.GetGlobalMasterTransactionSingle1(global);
          JobInvoice job = new JobInvoice();
          job = GetItem1<JobInvoice>(ds.Tables[0]);
          job.JobInvoiceTransactionList = ConvertDataTable<JobInvoiceTransaction>(ds.Tables[1]);
          job.UserName = SMMEUserModel.UserName;
          ViewBag.JI_Id = Id;
          ViewBag.MId = MId;
          return View(job);
      }
      public ActionResult JobInvoicePreviewPrint(int? Id, int? MId)
      {
        
          DataSet ds = new DataSet();
          global.param1Value = Id;
          global.param1 = "JI_Id";
          global.param3Value = MId;
          global.param3 = "JI_ChildId";
          global.param2Value = SMMEUserModel.UM_MainID;
          global.param2 = "JI_SMMEId";
          global.StoreProcedure = "JobInvoice_USP";
          global.TransactionType = "SelectForInvoicePreview";
          ds = dl.GetGlobalMasterTransactionSingle1(global);
          JobInvoice job = new JobInvoice();
          job = GetItem1<JobInvoice>(ds.Tables[0]);
          job.JobInvoiceTransactionList = ConvertDataTable<JobInvoiceTransaction>(ds.Tables[1]);
          job.UserName = SMMEUserModel.UserName;
          ViewBag.JI_Id = Id;
          ViewBag.MId = MId;
          return View(job);
      }
      public ActionResult JobInvoiceEnterpriseList()
      {
          if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
          {
              return RedirectToAction("EnterpriseLogin", "Account");
          }
          return View();
      }
    }
}