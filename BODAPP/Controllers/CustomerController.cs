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
    public class CustomerController : Controller
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

        public CustomerController()
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
        public ActionResult AddCustomerDetails()
        {
            if (SMMEUserModel != null)
            {
                ViewBag.SMMEId = SMMEUserModel.UM_MainID;
            }
            else if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            else
            {
                ViewBag.Id = UserModel.UM_MainID;
            }
            return View();
        }
        public ActionResult ViewAllCustomerForAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAllCustomerForEnterprise()
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
        public ActionResult ViewAllCustomerForSMME()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            else
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                return View();
            }
        }
        public ActionResult EnterpriseWiseCustomer(int? Id)
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "CD_EnterpriseId";
            global.StoreProcedure = "CustomerDetails_USP";
            global.TransactionType = "SelectEnterpriseWiseCustomer";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(ds.Tables[0]);
            Entreg.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
            var Srecord = Entreg;
            return View(Srecord);
        }
        public ActionResult SMMEWiseCustomer(int? Id)
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "CD_SmmeId";
            global.StoreProcedure = "CustomerDetails_USP";
            global.TransactionType = "SelectSMMEWiseCustomer";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMERegistration smme = new SMMERegistration();
            smme = GetItem1<SMMERegistration>(ds.Tables[0]);
            smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
            var Srecord = smme;
            return View(Srecord);
        }
        public ActionResult CreateJobs()
        {
            if (UserModel == null)
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
            return View();
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
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            else
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                return View();
            }
        }
        public ActionResult ViewAllJobsForSMME()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            else
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                return View();
            }
        }


        public ActionResult CustomerDetails(int? Id)
        {
            if (SMMEUserModel != null)
            {
                ViewBag.JobType = "SMME";
            }
            else if (EnterpriseUserModel != null)
            {
                ViewBag.JobType = "Enterprise";
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.JobType = "Admin";

            }
            DataTable dt = new DataTable();
            global.StoreProcedure = "CustomerDetails_USP";
            global.TransactionType = "SelectForDetails";
            global.param1 = "CD_Id";
            global.param1Value = Id;
            dt = dl.GetGlobalMasterTransaction(global);
            CustomerDetails cust = new CustomerDetails();
            cust = GetItem1<CustomerDetails>(dt);
            var Srecord = cust;
            return View(Srecord);
            }
        }
    
}