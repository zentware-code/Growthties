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
    public class EnterpriseController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel AdminUserModel { get; set; }
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
        }

        public EnterpriseController()
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
        public ActionResult EnterpriseProfieView_SMME(int? Id)
        {
            if (EnterpriseUserModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                Id = EnterpriseUserModel.UM_MainID;
            }
            DataSet ds = new DataSet();
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "Select";
            global.param1 = "ENR_Id";
            global.param1Value = Id;
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(ds.Tables[0]);
            Entreg.EnterPriseWiseSMMEList = ConvertDataTable<EnterpriiseWiseSMME>(ds.Tables[1]);
            var Srecord = Entreg;
            return View(Srecord);
        }
        public ActionResult EnterpriseProfieView_Branches(int? Id)
        {
            if (EnterpriseUserModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                Id = EnterpriseUserModel.UM_MainID;
            }
            DataTable dt = new DataTable();

            ViewBag.EntrId = Id;
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
            if (EnterpriseUserModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                Id = EnterpriseUserModel.UM_MainID;
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
        public ActionResult EnterpriseProfieView_Profiles(int? Id)
        {
            if (EnterpriseUserModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                Id = EnterpriseUserModel.UM_MainID;
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
        public ActionResult EnterpriseLists()
        {
            if (UserModel == null)
            {
                if (AdminUserModel == null)
                {
                    return RedirectToAction("AdminLogin", "Account");
                }
            }
            return View();
        }
        public ActionResult EnterpriseDashboard()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            else
            {
                DataSet ds = new DataSet();

                global.param1 = "EnrId";
                global.param1Value = EnterpriseUserModel == null ? EnterpriseEMPUserDataModel.UM_MainID : EnterpriseUserModel.UM_MainID;
                global.StoreProcedure = "EnterpriseDashBoard_USP";
                global.TransactionType = "SelectEnterpriseDashBoard";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                EnrDashBoard dash = new EnrDashBoard();
                dash = GetItem1<EnrDashBoard>(ds.Tables[0]);
                ViewBag.EnrId = EnterpriseUserModel == null ? EnterpriseEMPUserDataModel.UM_MainID : EnterpriseUserModel.UM_MainID;
                if(EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.UserType = "EnrUser";
                    ViewBag.UserId = EnterpriseEMPUserDataModel.UserID;
                }
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                //var Srecord = dash;

                if (EnterpriseUserModel != null)
                {
                    if (EnterpriseUserModel.UM_EmailVery == null || EnterpriseUserModel.UM_EmailVery.Trim() != "Y")
                    {
                        ViewBag.Message = "Your email is not verified. Please verify your email to login.";
                        return RedirectToAction("EnterpriseLogin", "Account");
                    }
                }
                else
                {
                    if (EnterpriseEMPUserDataModel.UM_EmailVery == null || EnterpriseEMPUserDataModel.UM_EmailVery.Trim() != "Y")
                    {
                        ViewBag.Message = "Your email is not verified. Please verify your email to login.";
                        return RedirectToAction("EnterpriseLogin", "Account");
                    }
                }
                return View();
            }

        }
        public ActionResult EnterpriseWiseSMME(int? Id)
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "ENR_Id";
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "SelectEnterpriseWiseSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(ds.Tables[0]);
            Entreg.SMMERegistrationList = ConvertDataTable<SMMERegistration>(ds.Tables[1]);
            var Srecord = Entreg;
            return View(Srecord);
        }
        public ActionResult EnterpriseWiseSMMEList()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }

            return View();
        }
        public ActionResult ViewAllSMMEForEnterprise()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
        public ActionResult AssignSMMEToEnterprise()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAllEnterPriseUser()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
        public ActionResult AddEnterPriseUser()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAllUser()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if(EnterpriseUserModel != null)
            {
                ViewBag.EnrId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EnrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }
        public ActionResult EnterpriseProfieView_SMMESingle(int? Id)
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            if (Id == null)
            {
                Id = UserModel.UM_MainID;
            }
            DataTable dt = new DataTable();
            global.StoreProcedure = "EnterpriseWiseSMME_USP";
            global.TransactionType = "SelectSMMEByEnterprise";
            global.param1 = "EWS_EnterpriseId";
            global.param1Value = Id;
            dt = dl.GetGlobalMasterTransaction(global);
            EnterpriiseWiseSMME Entreg = new EnterpriiseWiseSMME();
            Entreg = GetItem1<EnterpriiseWiseSMME>(dt);
            Entreg.EnterpriiseWiseSMMEList = ConvertDataTable<EnterpriiseWiseSMME>(dt);
            var Srecord = Entreg;
            return View(Srecord);
        }

        public ActionResult AddBranch()
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
        public ActionResult ViewAllBranch()
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

        public ActionResult EnterpriseProfileComplete(int? Id)
        {
            
            ViewBag.EntrId = Id;
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "ENR_Id";
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "SelectEnterpriseWiseSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(ds.Tables[0]);

            var Srecord = Entreg;
            return View(Srecord);

        }

        public ActionResult TeamBuilding()
        {
            if (EnterpriseUserModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }

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

        public ActionResult TeamBuildingList()
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

        public ActionResult UserPermission(int UserId)
        {
            int? mainid = 0;
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null) && (AdminUserModel == null) && (UserModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.Role = "E";
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                mainid = EnterpriseUserModel.UM_MainID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.Role = "E";
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                mainid = EnterpriseEMPUserDataModel.UM_MainID;
            }
            else if (AdminUserModel != null)
            {
                ViewBag.Role = "A";
                ViewBag.EntrId = AdminUserModel.UM_MainID;
                mainid = AdminUserModel.UM_MainID;
            }
            else if (UserModel != null)
            {
                ViewBag.Role = "A";
                ViewBag.EntrId = UserModel.UM_MainID;
                mainid = UserModel.UM_MainID;
            }


            ViewBag.userId = UserId;
            UserModel usr = new UserModel();
            global.StoreProcedure = "UserMaster_USP";
            global.TransactionType = "SelectUser";
            global.param1 = "UserId";

            global.param1Value = UserId;

            global.param2 = "UM_Id";
            global.param2Value = UserId;
            DataSet ds = dl.GetGlobalMasterTransactionSingle1(global);
            usr = GetItem1<UserModel>(ds.Tables[0]);
            usr.mainmenuLst = dl.GetMainMenuForUser(Convert.ToInt32(mainid), UserId, "E");
            usr.submenuList = dl.GetSubMenuForUser(Convert.ToInt32(mainid), UserId, "E");

            return View(usr);
        }
        public ActionResult UserPermissionList()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
        public ActionResult ChatForEnterprise()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null) && (UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.UserId = EnterpriseUserModel.UserID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.UserId = EnterpriseEMPUserDataModel.UserID;
            }
            if (UserModel != null)
            {
                ViewBag.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                ViewBag.UserId = AdminUserModel.UserID;
            }
            return View();
        }

        public ActionResult ProjectWiseStakeholderForEnterprise()
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

        public ActionResult ProjectListAsStakeHolderEnterprise()
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


        public ActionResult AddBulkSMMEForEnterprise()
        {
            if ((EnterpriseUserModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            return View();
        }

        public ActionResult AssignProjectWiseStakeholderForEnterprise()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }


        public ActionResult AssignStakeholderWiseSMME()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }
        //public ActionResult AssignStakeholderWiseSMME()
        //{
        //    //if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
        //    //{
        //    //    return RedirectToAction("EnterpriseLogin", "Account");
        //    //}
        //    if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
        //    {
        //        return RedirectToAction("EnterpriseLogin", "Account");
        //    }
        //    if (EnterpriseUserModel != null)
        //    {
        //        ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
        //    }
        //    if (EnterpriseEMPUserDataModel != null)
        //    {
        //        ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
        //    }
        //    else
        //    {
        //        DataSet ds = new DataSet();
        //        global.StoreProcedure = "AdminDashBoard_USP";
        //        global.TransactionType = "SelectAdminDashBoard";
        //        ds = dl.GetGlobalMasterTransactionSingle1(global);
        //        AdminDashBoard dash = new AdminDashBoard();
        //        dash = GetItem1<AdminDashBoard>(ds.Tables[0]);
        //        //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
        //        var Srecord = dash;
        //        return View(Srecord);
        //    }
        //}

        public ActionResult AssignStakeholderWiseJob()
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

        public ActionResult AssignStakeholderWiseAssessment()
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

        public ActionResult MyStakeholder()
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
                ViewBag.UserId = EnterpriseEMPUserDataModel.UserID;
                ViewBag.Type = "SU";
            }
            return View();
        }

        public ActionResult AssignedStakeholder()
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

        public ActionResult FinancialYearSetUp()
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

        public ActionResult BranchWiseArea()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult BranchWiseProject()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult BranchWiseUser()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult BranchDashboard()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
    }
}