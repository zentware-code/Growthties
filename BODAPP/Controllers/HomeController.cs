using BODDal;
using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Reflection;
using System.Configuration;
using System.Collections.Specialized;
using System.Web.Configuration;
//using BODDal.Model;
namespace BODAPP.Controllers
{
    public class HomeController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public static UserModel SMMEUserEmpModel { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static CommonCls cmnCls { get; set; }
        public static GlobalPages pageName { get; set; }
        public GlobalData global = new GlobalData();
        public static DataTable dt = new DataTable();
        DAL dl = new DAL();
        NameValueCollection myKeys = ConfigurationManager.AppSettings;
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
            T obj = Activator.CreateInstance<T>();

            T data = Activator.CreateInstance<T>();
            foreach (DataRow row in dt.Rows)
            {
                data = GetItem<T>(row);
            }


            return data;
        }
        public static void GetSession()
        {
            //UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            EnterpriseUserModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseUserDataModel"];
            SMMEUserModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserDataModel"];
            SMMEUserEmpModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserEmpDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
        }
     
      
        public HomeController()
        {
            GetSession();

        }
        public ActionResult Home()
        {
           

            return View();
        }
        public ActionResult AdminDashboard()
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
        public ActionResult FinancialYearMaster()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult FinancialYearMasterList()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult UserLayout()
        {
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            return PartialView(UserModel);
        }
        public ActionResult Menu()
        {
            MenuModel ObjMenuModel = new MenuModel();
            string userName = "";
            string profilePic = "";
            string prefix = "";
            string subrole = "";
            string role = "";
            int? UserId = 0;
            if (EnterpriseUserModel != null)
            {
                userName = EnterpriseUserModel.UserName;
                profilePic = EnterpriseUserModel.UM_ProfilePic;
                prefix = EnterpriseUserModel.UM_Prefix;
                subrole = EnterpriseUserModel.UM_SubRole;
                role = EnterpriseUserModel.UM_Role;
                UserId = EnterpriseUserModel.UserID;
            }
            else if (SMMEUserModel != null)
            {
                userName = SMMEUserModel.UserName;
                profilePic = SMMEUserModel.UM_ProfilePic;
                prefix = SMMEUserModel.UM_Prefix;
                subrole = SMMEUserModel.UM_SubRole;
                role = SMMEUserModel.UM_Role;
                UserId = SMMEUserModel.UserID;
                ViewBag.UmId = SMMEUserModel.UserID;
            }
            else if (SMMEUserEmpModel != null)
            {
                userName = SMMEUserEmpModel.UserName;
                profilePic = SMMEUserEmpModel.UM_ProfilePic;
                prefix = SMMEUserEmpModel.UM_Prefix;
                subrole = SMMEUserEmpModel.UM_SubRole;
                role = SMMEUserEmpModel.UM_Role;
                UserId = SMMEUserEmpModel.UserID;
                ViewBag.UmId = SMMEUserEmpModel.UserID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                userName = EnterpriseEMPUserDataModel.UserName;
                profilePic = EnterpriseEMPUserDataModel.UM_ProfilePic;
                prefix = EnterpriseEMPUserDataModel.UM_Prefix;
                subrole = EnterpriseEMPUserDataModel.UM_SubRole;
                role = EnterpriseEMPUserDataModel.UM_Role;

                UserId = EnterpriseEMPUserDataModel.UserID;
                ViewBag.UmId = EnterpriseEMPUserDataModel.UserID;
            }
            else if (AdminUserModel != null)
            {
                userName = AdminUserModel.UserName;
                profilePic = AdminUserModel.UM_ProfilePic;
                prefix = AdminUserModel.UM_Prefix;
                subrole = AdminUserModel.UM_SubRole;
                role = AdminUserModel.UM_Role;
                UserId = AdminUserModel.UserID;
                ViewBag.UmId = AdminUserModel.UserID;
            }
            else
            {
                userName = UserModel.UserName;
                profilePic = UserModel.UM_ProfilePic;
                prefix = UserModel.UM_Prefix;
                subrole = UserModel.UM_SubRole;
                role = UserModel.UM_Role;
                UserId = UserModel.UserID;
            }




            ObjMenuModel.GroupMenuModel = new List<GroupMenu>();
            ObjMenuModel.GroupMenuModel = dl.GetGroupMenu(Convert.ToInt32(UserId), role);
            ObjMenuModel.MainMenuModel = new List<MainMenu>();
            ObjMenuModel.MainMenuModel = dl.GetMainMenu(Convert.ToInt32(UserId), role);
            ObjMenuModel.SubMenuModel = new List<SubMenu>();
            ObjMenuModel.SubMenuModel = dl.GetSubMenu(Convert.ToInt32(UserId), role);

            return View(ObjMenuModel);
        }


        public ActionResult MenuForStakeHolder()
        {
            MenuModel ObjMenuModel = new MenuModel();
            string userName = "";
            string profilePic = "";
            string prefix = "";
            string subrole = "";
            string role = "";
            int? UserId = 0;
            if (EnterpriseUserModel != null)
            {
                userName = EnterpriseUserModel.UserName;
                profilePic = EnterpriseUserModel.UM_ProfilePic;
                prefix = EnterpriseUserModel.UM_Prefix;
                subrole = EnterpriseUserModel.UM_SubRole;
                role = EnterpriseUserModel.UM_Role;
                UserId = EnterpriseUserModel.UserID;
            }
            else if (SMMEUserModel != null)
            {
                userName = SMMEUserModel.UserName;
                profilePic = SMMEUserModel.UM_ProfilePic;
                prefix = SMMEUserModel.UM_Prefix;
                subrole = SMMEUserModel.UM_SubRole;
                role = SMMEUserModel.UM_Role;
                UserId = SMMEUserModel.UserID;
                ViewBag.UmId = SMMEUserModel.UserID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                userName = EnterpriseEMPUserDataModel.UserName;
                profilePic = EnterpriseEMPUserDataModel.UM_ProfilePic;
                prefix = EnterpriseEMPUserDataModel.UM_Prefix;
                subrole = EnterpriseEMPUserDataModel.UM_SubRole;
                role = EnterpriseEMPUserDataModel.UM_Role;

                UserId = EnterpriseEMPUserDataModel.UserID;
                ViewBag.UmId = EnterpriseEMPUserDataModel.UserID;
            }
            else if (AdminUserModel != null)
            {
                userName = AdminUserModel.UserName;
                profilePic = AdminUserModel.UM_ProfilePic;
                prefix = AdminUserModel.UM_Prefix;
                subrole = AdminUserModel.UM_SubRole;
                role = AdminUserModel.UM_Role;
                UserId = AdminUserModel.UserID;
                ViewBag.UmId = AdminUserModel.UserID;
            }
            else
            {
                userName = UserModel.UserName;
                profilePic = UserModel.UM_ProfilePic;
                prefix = UserModel.UM_Prefix;
                subrole = UserModel.UM_SubRole;
                role = UserModel.UM_Role;
                UserId = UserModel.UserID;
            }




            ObjMenuModel.GroupMenuModel = new List<GroupMenu>();
            ObjMenuModel.GroupMenuModel = dl.GetGroupMenu(Convert.ToInt32(UserId), role);
            ObjMenuModel.MainMenuModel = new List<MainMenu>();
            ObjMenuModel.MainMenuModel = dl.GetMainMenuSt();
            ObjMenuModel.SubMenuModel = new List<SubMenu>();
            ObjMenuModel.SubMenuModel = dl.GetSubMenuSt();

            return View(ObjMenuModel);
        }

        public ActionResult UserNameLayout()
        {
            return View(UserModel);
        }

        public ActionResult Component()
        {
            return View();
        }

        public ActionResult DatatabeSample()
        {
            return View();
        }

        public ActionResult MasterList()
        {
            return View();
        }
        public ActionResult SectorSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult DesignationSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult EnterpriseTypeSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult IncomeTypeSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ItemSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult LegalEntitySetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ProvinceSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult RoleSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult AssessmentCategorySetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if(EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
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
            ViewBag.EntrId = 0;
            return View();
        }
        public ActionResult EnterpriseUserForAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAllEnterpriseUserForAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult CustomerTypeSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult JobCategoriesSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult BudgetTypeSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult FundTypeSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult UserPermissionAllEnterpriseUserForAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult UserPermission(int UserId,int mainid)
        {
            //int? mainid = 0;
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            //if (EnterpriseUserModel != null)
            //{
            //    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            //    mainid = EnterpriseUserModel.UM_MainID;
            //}
            //else
            //{
            //    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            //    mainid = EnterpriseEMPUserDataModel.UM_MainID;
            //}
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
            usr.mainmenuLst = dl.GetMainMenuForUser(Convert.ToInt32(mainid), UserId, "A");
            usr.submenuList = dl.GetSubMenuForUser(Convert.ToInt32(mainid), UserId, "A");

            return View(usr);
        }

        public ActionResult ViewAllUser()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAllUserPermission()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult AddAdminUser()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult EnterpriseProfieView_SMME(int? Id)
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
           
            DataSet ds = new DataSet();
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "Select";
            global.param1 = "ENR_Id";
            global.param1Value = Id;
            ViewBag.EntrId = Id;
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(ds.Tables[0]);
            Entreg.EnterPriseWiseSMMEList = ConvertDataTable<EnterpriiseWiseSMME>(ds.Tables[1]);
            var Srecord = Entreg;
            return View(Srecord);
        }
        public ActionResult EnterpriseProfieView_Branches(int? Id)
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
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
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
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
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
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

        public ActionResult UserPermissionForEnterpriseUser(int UserId, int mainid)
        {
          
            ViewBag.EntrId = mainid;

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
        
        public ActionResult CountrySetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }


        public ActionResult ChatForAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
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

        public ActionResult ProjectWiseStakeholderForAdmin()
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

        public ActionResult ProjectListAsStakeHolderForAdmin()
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

        public ActionResult ManagePermissionForStakeholder()
        {
            if (UserModel == null && EnterpriseUserModel == null && AdminUserModel == null && EnterpriseEMPUserDataModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult AllReports()
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

        public ActionResult EnterpriseWiseReport()
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


        public ActionResult SMMEWiseReport()
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


        public ActionResult ProjectWiseReport()
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


        public ActionResult AssessmentKPISetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
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
            ViewBag.EntrId = 0;
            return View();
        }

        //public ActionResult FinancialYearSetUp()
        //{
        //    if ((UserModel == null) && (AdminUserModel == null))
        //    {
        //        return RedirectToAction("AdminLogin", "Account");
        //    }
        //    return View();
        //}

        public ActionResult Loader()
        {
            return View();
        }
        public ActionResult KPICategorySetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult KPICategoryGroupSetUp()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult UserProfileDetails()
        {
            if (UserModel == null && AdminUserModel == null && EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null && SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View(); 
        }
        public ActionResult UserWiseSMME()
        {
            if (UserModel == null && AdminUserModel == null && EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null && SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult UserWiseProject()
        {
            if (UserModel == null && AdminUserModel == null && EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null && SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        
        public ActionResult UserWiseArea()
        {
            if (UserModel == null && AdminUserModel == null && EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null && SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

    }

}