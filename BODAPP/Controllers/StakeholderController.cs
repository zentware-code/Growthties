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
    public class StakeholderController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static UserModel StakeHolderUserModel { get; set; }
        public static GlobalPages pageName { get; set; }
        public GlobalData global = new GlobalData();
        public static DataTable dt = new DataTable();
        DAL dl = new DAL();

        public static void GetSession()
        {
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            EnterpriseUserModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseUserDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
            StakeHolderUserModel = (UserModel)System.Web.HttpContext.Current.Session["StakeHolderUserModel"];
        }

        public StakeholderController()
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

        //public ActionResult StakeHolderDashboard(int? Id)
        //{
        //    if (EnterpriseUserModel != null)
        //    {
        //        if (EnterpriseUserModel.StakeHolderId != Id)
        //        {
        //            EnterpriseUserModel.StakeHolderId = Id;
        //        }
        //    }
        //   else if (EnterpriseEMPUserDataModel != null)
        //    {
        //        if (EnterpriseEMPUserDataModel.StakeHolderId != Id)
        //        {
        //            EnterpriseEMPUserDataModel.StakeHolderId = Id;
        //        }
        //    }

        //    string stakeholderLogo = "";
        //   DataSet ds = new DataSet();

        //    global.param1 = "EnrId";
        //    if (EnterpriseUserModel != null)
        //    {
        //        ViewBag.EnrId = EnterpriseUserModel.StakeHolderId;
        //        stakeholderLogo = GetStakeholderLogo(EnterpriseUserModel);
        //        if (EnterpriseUserModel.StakeHolderId == 0)
        //        {
        //            global.param1Value = EnterpriseUserModel.StakeHolderId;
        //        }
        //    }
        //    else if (EnterpriseEMPUserDataModel != null)
        //    {
        //        ViewBag.EnrId = EnterpriseEMPUserDataModel.StakeHolderId;
        //        stakeholderLogo = GetStakeholderLogo(EnterpriseEMPUserDataModel);
        //        if (EnterpriseEMPUserDataModel.StakeHolderId == 0)
        //        {
        //            global.param1Value = EnterpriseEMPUserDataModel.StakeHolderId;
        //        }
        //    }
        //    global.StoreProcedure = "EnterpriseDashBoard_USP";
        //    global.TransactionType = "SelectEnterpriseDashBoard";
        //    ds = dl.GetGlobalMasterTransactionSingle1(global);
        //    EnrDashBoard dash = new EnrDashBoard();
        //    dash = GetItem1<EnrDashBoard>(ds.Tables[0]);




        //    ViewBag.StakeholderLogo = stakeholderLogo;

        //    var Srecord = dash;
        //    return View(Srecord);
        //}




        public ActionResult StakeHolderDashboard(int? Id)
        {
            int? stakeholderId = null;
            string stakeholderLogo = "";
          int?  UmMainid = null;
            DataSet ds = new DataSet();

            // Set StakeHolderId on the appropriate user model
            if (EnterpriseUserModel != null)
            {
                UmMainid = EnterpriseUserModel.UM_MainID;
                if (Id.HasValue && EnterpriseUserModel.StakeHolderId != Id.Value)
                {
                    EnterpriseUserModel.StakeHolderId = Id.Value;
                  
                }

                stakeholderId = EnterpriseUserModel.StakeHolderId;
                stakeholderLogo = GetStakeholderLogo(EnterpriseUserModel);
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                UmMainid = EnterpriseEMPUserDataModel.UM_MainID;
                if (Id.HasValue && EnterpriseEMPUserDataModel.StakeHolderId != Id.Value)
                {
                    EnterpriseEMPUserDataModel.StakeHolderId = Id.Value;
                }

                stakeholderId = EnterpriseEMPUserDataModel.StakeHolderId;
                stakeholderLogo = GetStakeholderLogo(EnterpriseEMPUserDataModel);
            }

            // ViewBag assignment
            ViewBag.EnrId = stakeholderId;
            ViewBag.StakeHolderId = UmMainid;
            ViewBag.StakeholderLogo = stakeholderLogo;

            // Global settings
            if (EnterpriseUserModel != null)
            {
                global.param1 = "EnrId";
                global.param1Value = stakeholderId ?? 0;
                global.param2 = "StakeHolderId";
                global.param2Value = UmMainid ?? 0;
                global.StoreProcedure = "EnterpriseStakeHolderDashBoard_USP";
                global.TransactionType = "SelectEnterpriseDashBoard";
                ViewBag.Type = "S";
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                global.param1 = "EnrId";
                global.param1Value = stakeholderId ?? 0;
                global.param2 = "StakeHolderId";
                global.param2Value = UmMainid ?? 0;
                global.param3 = "UserId";
                global.param3Value = EnterpriseEMPUserDataModel.UserID;
                global.StoreProcedure = "EnterpriseStakeHolderDashBoard_USP";
                global.TransactionType = "SelectEnterpriseDashBoardStakholderUser";
                ViewBag.Type = "SU";
            }
           
           
            // Get data
            ds = dl.GetGlobalMasterTransactionSingle1(global);

            EnrDashBoard dash = new EnrDashBoard();
            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                dash = GetItem1<EnrDashBoard>(ds.Tables[0]);
            }

            return View(dash);
        }






        public string GetStakeholderLogo(UserModel user)
        {
            // Call the DAL method to get the logo
            string StakeholderLogo = dl.GetStakeholderLogo(user);
            return StakeholderLogo;
        }


        public ActionResult ViewAllUser()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult UserPermissionList()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult ProjectDetails()
        {
            if (UserModel != null || AdminUserModel != null)
            {
                // Regular or admin user is logged in
                return View();
            }

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                ViewBag.StakeholderId = EnterpriseUserModel.StakeHolderId;
                return View();
            }

            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                ViewBag.StakeholderId = EnterpriseEMPUserDataModel.StakeHolderId;
                return View();
            }

            // No user is logged in at all
            return RedirectToAction("EnterpriseLogin", "Account");
        }

        //public ActionResult ProjectDetails()
        //{
        //    if ((UserModel == null) && (AdminUserModel == null))
        //    {
        //        if (EnterpriseUserModel != null)
        //        {
        //            ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
        //            ViewBag.StakeholderId = EnterpriseUserModel.StakeHolderId;
        //            return View();
        //        }

        //        return RedirectToAction("AdminLogin", "Account");
        //    }
        //    return View();
        //}

        public ActionResult ProjectListForStakeholder()
        {
            ViewBag.Type = "S";
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.Type = "SU";
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }

            return View();
        }

        public ActionResult CreateActivity()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult CreateActivityList()
        {
            ViewBag.Type = "S";
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.Type = "SU";
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult ProjectListToAssignSMMEFromEnterp()
        {
            ViewBag.Type = "S";
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
                ViewBag.UesrRole = EnterpriseUserModel.UM_Role;
            }
            else
            {
                ViewBag.Type = "SU";
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
                ViewBag.UesrRole = EnterpriseEMPUserDataModel.UM_Role;
            }
            return View();
        }

        public ActionResult SMMESettings_company(int? Id, string M)
        {
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = 0;
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            { ViewBag.M = M; }
            else
            {
                ViewBag.M = "";
            }
            return View();
        }

        public ActionResult SMMESettings_contact(int? Id, string M)
        {
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = 0;
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            { ViewBag.M = M; }
            else
            {
                ViewBag.M = "";
            }

            return View();
        }

        public ActionResult SMMESettings_legalentity(int? Id, string M)
        {
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = 0;
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            { ViewBag.M = M; }
            else
            {
                ViewBag.M = "";
            }
            return View();
        }

        public ActionResult SMMESettings_financial(int? Id, string M)
        {
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = 0;
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            { ViewBag.M = M; }
            else
            {
                ViewBag.M = "";
            }
            return View();
        }


        public ActionResult ViewAllSMMEForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.Type = "SU";
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }

        public ActionResult AssessmentCategorySetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult AssessmentSegmentSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult AddQuestionSetup()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult QuestionSetupList()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult QuestionBuilding()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult ViewAllBuildQuestionStakeholder()
        {

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }

            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }

            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult AssignSMMEAssessmentForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult AllAssignAssessmnetByStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult ViewAssessmentForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult CreateTask()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult TaskList()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.Type = "SU";
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult AddCustomerDetails()
        {
            //if (SMMEUserModel != null)
            //{
            //    ViewBag.SMMEId = SMMEUserModel.StakeHolderId;
            //}
            //else

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            else
            {
                ViewBag.Id = UserModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult ViewAllCustomerForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }

        public ActionResult CustomerDetails(int? Id)
        {
            //if (SMMEUserModel != null)
            //{
            //    ViewBag.JobType = "SMME";
            //}
            //else
            if (EnterpriseUserModel != null)
            {
                ViewBag.JobType = "Enterprise";
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.JobType = "Enterprise";
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            else if(AdminUserModel != null)
            {
                ViewBag.JobType = "Admin";
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

        public ActionResult CreateJobsForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult ViewAllJobsForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }

        public ActionResult JobInvoiceStakeholderList()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult JobInvoice(int? Id, string M, int? MId)
        {
            //if (SMMEUserModel == null)
            //{
            //    return RedirectToAction("SMMELogin", "Account");
            //}
            DataSet ds = new DataSet();
            if (M == "E")
            {
                global.param1Value = Id;
                global.param1 = "JI_Id";

                //  global.param2Value = SMMEUserModel.StakeHolderId;
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
                //  global.param2Value = SMMEUserModel.StakeHolderId;
                global.param2 = "JI_SMMEId";
                global.StoreProcedure = "JobInvoice_USP";
                global.TransactionType = "SelectForInvoice";

            }
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobInvoice job = new JobInvoice();
            job = GetItem1<JobInvoice>(ds.Tables[0]);
            // job.UserName = SMMEUserModel.UserName;
            ViewBag.JI_Id = Id;
            ViewBag.MId = MId;
            ViewBag.Mode = M;
            return View(job);
        }

        public ActionResult JobInvoicePreview(int? Id, int? MId)
        {

            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "JI_Id";
            global.param3Value = MId;
            global.param3 = "JI_ChildId";
            // global.param2Value = SMMEUserModel.StakeHolderId;
            global.param2 = "JI_SMMEId";
            global.StoreProcedure = "JobInvoice_USP";
            global.TransactionType = "SelectForInvoicePreview";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobInvoice job = new JobInvoice();
            job = GetItem1<JobInvoice>(ds.Tables[0]);
            job.JobInvoiceTransactionList = ConvertDataTable<JobInvoiceTransaction>(ds.Tables[1]);
            //    job.UserName = SMMEUserModel.UserName;
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
            // global.param2Value = SMMEUserModel.StakeHolderId;
            global.param2 = "JI_SMMEId";
            global.StoreProcedure = "JobInvoice_USP";
            global.TransactionType = "SelectForInvoicePreview";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobInvoice job = new JobInvoice();
            job = GetItem1<JobInvoice>(ds.Tables[0]);
            job.JobInvoiceTransactionList = ConvertDataTable<JobInvoiceTransaction>(ds.Tables[1]);
            //   job.UserName = SMMEUserModel.UserName;
            ViewBag.JI_Id = Id;
            ViewBag.MId = MId;
            return View(job);
        }

        public ActionResult AssignProjectWiseStakeholderForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
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

        public ActionResult AssignStakeholderWiseSMME()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
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

        public ActionResult AssignStakeholderWiseAssessment()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult AssignStakeholderWiseJob()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult EnterpriseProfieView_Profiles(int? Id)
        {
            if (EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                if(EnterpriseEMPUserDataModel == null)
                {
                    Id = EnterpriseEMPUserDataModel.StakeHolderId;
                }
                Id = EnterpriseUserModel.StakeHolderId;
            }
            ViewBag.EntrId = Id;
            DataTable dt = new DataTable();
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "Select";
            global.param1 = "ENR_Id";
            global.param1Value = Id;
            dt = dl.GetGlobalMasterTransaction(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(dt);
            var Srecord = Entreg;
            return View(Srecord);
        }



        public ActionResult EnterpriseProfieView_SMME(int? Id)
        {
            int? MainId=0;
            if (EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                if (EnterpriseEMPUserDataModel == null)
                {
                    Id = EnterpriseEMPUserDataModel.StakeHolderId;
                    MainId = EnterpriseEMPUserDataModel.UM_MainID;
                }
                Id = EnterpriseUserModel.StakeHolderId;
                MainId = EnterpriseUserModel.UM_MainID;
            }
            else {
                if (EnterpriseUserModel == null)
                {
                    if (EnterpriseEMPUserDataModel != null)
                    {

                        MainId = EnterpriseEMPUserDataModel.UM_MainID;
                    }

                }
                else { MainId = EnterpriseUserModel.UM_MainID; }

               

            }

            ViewBag.EntrId = Id;
            DataSet ds = new DataSet();
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "SelectForStakeholder";
            global.param1 = "ENR_Id";
            global.param1Value = Id;

            global.param2 = "StakeholderId";
            global.param2Value = MainId;
            ViewBag.EntrId = Id;
            ViewBag.StakeholderId = MainId;
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(ds.Tables[0]);
            Entreg.EnterPriseWiseSMMEList = ConvertDataTable<EnterpriiseWiseSMME>(ds.Tables[1]);
            var Srecord = Entreg;
            return View(Srecord);
        }
        public ActionResult EnterpriseProfieView_Branches(int? Id)
        {
            if (EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                if (EnterpriseEMPUserDataModel == null)
                {
                    Id = EnterpriseEMPUserDataModel.StakeHolderId;
                }
                Id = EnterpriseUserModel.StakeHolderId;
            }
            ViewBag.EntrId = Id;
            DataTable dt = new DataTable();
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "Select";
            global.param1 = "ENR_Id";
            global.param1Value = Id;
            dt = dl.GetGlobalMasterTransaction(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(dt);
            var Srecord = Entreg;
            return View(Srecord);

        }
        public ActionResult EnterpriseProfieView_Projects(int? Id)
        {
            int? MainId = 0;
            if (EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                if (EnterpriseEMPUserDataModel == null)
                {
                    Id = EnterpriseEMPUserDataModel.StakeHolderId;
                    MainId = EnterpriseEMPUserDataModel.UM_MainID;
                }
                Id = EnterpriseUserModel.StakeHolderId;
                MainId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                if (EnterpriseUserModel == null)
                {
                    if (EnterpriseEMPUserDataModel != null)
                    {

                        MainId = EnterpriseEMPUserDataModel.UM_MainID;
                    }

                }
                else { MainId = EnterpriseUserModel.UM_MainID; }



            }
            ViewBag.EntrId = Id;
            ViewBag.MainId = MainId;
            DataTable dt = new DataTable();
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "Select";
            global.param1 = "ENR_Id";
            global.param1Value = Id;
            dt = dl.GetGlobalMasterTransaction(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(dt);
            var Srecord = Entreg;
            return View(Srecord);

        }

        public ActionResult SMMEProfile(int? Id)
        {
            ViewBag.Id = Id;
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "SMME_Id";
            global.StoreProcedure = "SMMERegistration_USP";
            global.TransactionType = "SelectSMME";
            global.TransactionType = "SelectSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMERegistration sme = new SMMERegistration();
            sme = GetItem1<SMMERegistration>(ds.Tables[0]);

            var Srecord = sme;
            return View(Srecord);
        }

        public ActionResult SMMEProfile_Job(int? Id)
        {
            ViewBag.Id = Id;
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "SMME_Id";
            global.StoreProcedure = "SMMERegistration_USP";
            global.TransactionType = "SelectSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMERegistration sme = new SMMERegistration();
            sme = GetItem1<SMMERegistration>(ds.Tables[0]);

            var Srecord = sme;
            return View(Srecord);
        }

        public ActionResult SMMEProfile_Task(int? Id)
        {
            ViewBag.Id = Id;
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "SMME_Id";
            global.StoreProcedure = "SMMERegistration_USP";
            global.TransactionType = "SelectSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMERegistration sme = new SMMERegistration();
            sme = GetItem1<SMMERegistration>(ds.Tables[0]);

            var Srecord = sme;
            return View(Srecord);
        }

        public ActionResult SMMEProfile_Dashboard(int? Id)
        {
            ViewBag.Id = Id;
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "SMME_Id";
            global.StoreProcedure = "SMMERegistration_USP";
            global.TransactionType = "SelectSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMERegistration sme = new SMMERegistration();
            sme = GetItem1<SMMERegistration>(ds.Tables[0]);

            var Srecord = sme;
            return View(Srecord);
        }

        public ActionResult ViewAllBranch()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult AddBranch()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }



        public ActionResult ProjectDetailsNew(int? Id, string Role)
        {
            ViewBag.Id = Id;

            if (Role == "A")
            {
                if (UserModel == null || AdminUserModel == null)
                {
                    return RedirectToAction("AdminLogin", "Account");
                }
            }
            else if (Role == "E")
            {
                if (EnterpriseUserModel == null || EnterpriseEMPUserDataModel == null)
                {
                    return RedirectToAction("EnterpriseLogin", "Account");
                }
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.UserType = "Enr";
                ViewBag.EnrId = EnterpriseUserModel.UM_MainID;
                return View();
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.UserType = "EnrUser";
                ViewBag.EnrId = EnterpriseEMPUserDataModel.UM_MainID;
                return View();
            }
            return View();
        }


        //public ActionResult ProjectDetailsNew(int? Id)
        //{
        //    ViewBag.Id = Id;
        //    if (EnterpriseUserModel != null)
        //    {
        //        ViewBag.UserMainId = EnterpriseUserModel.UM_MainID;
        //    }
        //    if (EnterpriseEMPUserDataModel != null)
        //    {
        //        ViewBag.UserMainId = EnterpriseEMPUserDataModel.UM_MainID;
        //    }

        //    return View();
        //}

        public ActionResult ProjectBudgetDashboard(int? Id, int? ENR_Id)
        {
            ViewBag.Id = Id;
            ViewBag.ENR_Id = ENR_Id;             // new added

            DataTable dt = new DataTable();

            Dictionary<string, object> childRow = new Dictionary<string, object>();
            global.StoreProcedure = "ProjectDetails_USP";
            global.TransactionType = "SelectFY";
            /// global.Param = new string[] { };
            global.Param = new string[] { "ENR_Id" };
            global.paramValue = new string[] { Convert.ToString(ENR_Id) };    // new added


            dt = dl.GetGlobalMaster(global);

            if (dt.Rows.Count > 0)
            {
                foreach (DataColumn col in dt.Columns)
                {
                    childRow[col.ColumnName] = dt.Rows[0][col]; // Just take the first row
                }

                if (childRow.ContainsKey("FM_Id"))
                {
                    ViewBag.FyId = childRow["FM_Id"];
                }
            }
            else
            {
                // Optional: handle no data case
                ViewBag.FyId = null;
                // Or ViewBag.Message = "No financial year found.";
            }

            return View();
        }

        public ActionResult ProjectFundExpenditure(int? Id, int? ENR_Id)
        {
            ViewBag.Id = Id; // one-time assignment is enough
            ViewBag.ENR_Id = ENR_Id;
            DataTable dt = new DataTable();
            Dictionary<string, object> childRow = new Dictionary<string, object>();

            global.StoreProcedure = "ProjectDetails_USP";
            global.TransactionType = "SelectFY";
            global.Param = new string[] { "ENR_Id" };
            global.paramValue = new string[] { Convert.ToString(ENR_Id) };    // new added

            dt = dl.GetGlobalMaster(global);

            if (dt.Rows.Count > 0)
            {
                // Use only the first row, since you're expecting a single current FY record
                DataRow row = dt.Rows[0];
                foreach (DataColumn col in dt.Columns)
                {
                    childRow[col.ColumnName] = row[col];
                }

                if (childRow.ContainsKey("FM_Id"))
                {
                    ViewBag.FyId = childRow["FM_Id"];
                }
            }
            else
            {
                ViewBag.FyId = null; // or handle the empty state as needed
                                     // Optionally: ViewBag.Message = "No financial year data found.";
            }

            return View();
        }
        public ActionResult TaskProgressEnterprise(int? Id)
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            else
            {
                DataSet ds = new DataSet();
                global.param1Value = Id;
                global.param1 = "TD_Id";

                global.StoreProcedure = "TaskDetails_USP";
                global.TransactionType = "SelectTaskForProgress";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                CreateTask task = new CreateTask();
                task = GetItem1<CreateTask>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = task;
                return View(Srecord);
            }
        }

        public ActionResult ProjectWiseDoc(int? Id)
        {
            ViewBag.Id = Id;
            return View();
        }

        public ActionResult AssessmnetWiseSMMEByAdmin()
        {
            return View();
        }
        public ActionResult ViewSMMEWiseAssessment(int? Id)
        {
            ViewBag.SmmeId = Id;
            return View();
        }

        public ActionResult ActivityDescription()
        {
            if (UserModel == null && AdminUserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
               
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult AssignedUser()
        {
            if (UserModel == null && AdminUserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.UserType = "Enr";
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.UserType = "EnrUser";
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
                //if (SMMEUserModel != null)
                //{
                //    ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                //    return View();
                //}
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
    }
}
