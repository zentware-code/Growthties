using BODDal;
using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Reflection;
//using BODDal.Model;
namespace BODAPP.Controllers
{
    public class ProjectController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static GlobalPages pageName { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public static UserModel SMMEUserEmpModel { get; set; }
        public GlobalData global = new GlobalData();
        public static DataTable dt = new DataTable();
        DAL dl = new DAL();

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
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
        }


        public ProjectController()
        {
            GetSession();
        }

        public ActionResult ProjectDetails()
        {
           
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    ViewBag.EnrEmailId = EnterpriseUserModel.UM_EmailId;
                    ViewBag.UserName = EnterpriseUserModel.UserName;
                    ViewBag.CompanyName = EnterpriseUserModel.CompanyName;
                    ViewBag.UesrRole = EnterpriseUserModel.UM_Role;
                    return View();
                }
                else if(EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.UserType = "EnrUser";
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    ViewBag.EnrEmailId = EnterpriseEMPUserDataModel.UM_EmailId;
                    ViewBag.UserName = EnterpriseEMPUserDataModel.UserName;
                    ViewBag.CompanyName = EnterpriseEMPUserDataModel.CompanyName;
                    ViewBag.UesrRole = EnterpriseEMPUserDataModel.UM_Role;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            else
            {
                if (UserModel != null)
                {
                    ViewBag.UesrRole = UserModel.UM_Role;
                    return View();
                }
                else if(AdminUserModel != null)
                {
                    ViewBag.UserType = "AdminUser";
                    ViewBag.UesrRole = AdminUserModel.UM_Role;
                    return View();
                }
            }
            return View();
        }

        public ActionResult ProjectListForAdmin()
        {
            if (UserModel != null)
            {
                ViewBag.UserId = UserModel.UserID;
            }
            else if (AdminUserModel != null)
            {
                ViewBag.UserId = AdminUserModel.UserID;
                ViewBag.UserType = "AdminUser";
            }

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

        //public ActionResult ProjectListForAdmin()
        //{
        //    if ((UserModel == null) && (AdminUserModel == null))
        //    {
        //        return RedirectToAction("AdminLogin", "Account");
        //    }
        //    return View();
        //}
        public ActionResult ProjectListForEnterprise()
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
                ViewBag.UserType = "EnrUser";
                ViewBag.UserId = EnterpriseEMPUserDataModel.UserID;
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }
        public ActionResult AssignProjectToEnterprise()
        {
            if (UserModel == null && AdminUserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult CreateTask()
        {
            if (UserModel == null && AdminUserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    ViewBag.EnrEmailId = EnterpriseUserModel.UM_EmailId;
                    ViewBag.UserName = EnterpriseUserModel.UserName;
                    ViewBag.CompanyName = EnterpriseUserModel.CompanyName;
                    ViewBag.UesrRole = EnterpriseUserModel.UM_Role;

                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.UserType = "EnrUser";
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    ViewBag.EnrEmailId = EnterpriseEMPUserDataModel.UM_EmailId;
                    ViewBag.UserName = EnterpriseEMPUserDataModel.UserName;
                    ViewBag.CompanyName = EnterpriseEMPUserDataModel.CompanyName;
                    ViewBag.UesrRole = EnterpriseEMPUserDataModel.UM_Role;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult TaskList()
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
                    ViewBag.UserType = "EnrUser";
                    ViewBag.UserId = EnterpriseEMPUserDataModel.UserID;
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ProjectListToAssignSMME()
        {
            if (UserModel == null && AdminUserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ProjectListToAssignSMMEFromEnterp()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                ViewBag.UesrRole = EnterpriseUserModel.UM_Role;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                ViewBag.UesrRole = EnterpriseEMPUserDataModel.UM_Role;
            }
            return View();
        }
        public ActionResult AssignProjectListForSMME()
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            if(SMMEUserModel != null)
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                return View();
            }
            else
            {
                ViewBag.UserType = "SMMEUser";
                ViewBag.UserId = SMMEUserEmpModel.UserID;
                ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
                return View();
            }
        }
        public ActionResult AllEnterpriseWiseProject()
        {
            if (UserModel == null && AdminUserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult CreateActivity()
        {
            if (UserModel == null && AdminUserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    ViewBag.EnrEmailId = EnterpriseUserModel.UM_EmailId;
                    ViewBag.UserName = EnterpriseUserModel.UserName;
                    ViewBag.CompanyName = EnterpriseUserModel.CompanyName;
                    ViewBag.UesrRole = EnterpriseUserModel.UM_Role;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.UserType = "EnrUser";
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    ViewBag.EnrEmailId = EnterpriseEMPUserDataModel.UM_EmailId;
                    ViewBag.UserName = EnterpriseEMPUserDataModel.UserName;
                    ViewBag.CompanyName = EnterpriseEMPUserDataModel.CompanyName;
                    ViewBag.UesrRole = EnterpriseEMPUserDataModel.UM_Role;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult CreateActivityList()
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
                    ViewBag.UserType = "EnrUser";
                    ViewBag.UserId = EnterpriseEMPUserDataModel.UserID;
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult ActivityListForSMME()
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            if (SMMEUserModel != null)
            {
                ViewBag.SMMEId = SMMEUserModel.UM_MainID;
                return View();
            }
            else
            {
                ViewBag.UserType = "SMMEUser";
                ViewBag.UserId = SMMEUserEmpModel.UserID;
                ViewBag.SMMEId = SMMEUserEmpModel.UM_MainID;
                return View();
            }
        }

        public ActionResult TaskListForSMME()
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            if (SMMEUserModel != null)
            {
                ViewBag.SMMEId = SMMEUserModel.UM_MainID;
                return View();
            }
            else
            {
                ViewBag.SMMEId = SMMEUserEmpModel.UM_MainID;
                return View();
            }
        }
        public ActionResult ProjectDetailsNew(int? Id, string Role)
        {
            ViewBag.Id = Id;
            ViewBag.Hide = "";
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
            else if (Role == "smme")
            {
                ViewBag.Hide = "hidden";
                if (SMMEUserModel == null && SMMEUserEmpModel == null)
                {
                    return RedirectToAction("SMMELogin", "Account");
                }
            }
            if (UserModel != null)
            {
                ViewBag.UserId = UserModel.UserID;
            }
            else if (AdminUserModel != null)
            {
                ViewBag.UserId = AdminUserModel.UserID;
                ViewBag.ParentId = AdminUserModel.UM_ParentId;
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
            if (SMMEUserModel != null)
            {
                ViewBag.UserType = SMMEUserModel.UM_SubRole;
                ViewBag.UserRole = SMMEUserModel.UM_Role;
                ViewBag.SMMEId = SMMEUserModel.UM_MainID;
                return View();
            }
            if (SMMEUserEmpModel != null)
            {
                ViewBag.UserType = SMMEUserEmpModel.UM_SubRole;
                ViewBag.UserRole = SMMEUserEmpModel.UM_Role;
                ViewBag.SMMEId = SMMEUserEmpModel.UM_MainID;
                return View();
            }
            return View();
        }


        ////////public ActionResult ProjectDetailsNew(int? Id)
        ////////{
        ////////    ViewBag.Id = Id;
        ////////    if (EnterpriseUserModel != null)
        ////////    {
        ////////        ViewBag.UserMainId = EnterpriseUserModel.UM_MainID;
        ////////    }
        ////////    if (EnterpriseEMPUserDataModel != null)
        ////////    {
        ////////        ViewBag.UserMainId = EnterpriseEMPUserDataModel.UM_MainID;
        ////////    }

        ////////    return View();
        ////////}

        public ActionResult TaskProgressSMME(int? Id)
        {
            if (SMMEUserModel == null && SMMEUserEmpModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            if (SMMEUserModel != null)
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;

                DataSet ds = new DataSet();

                global.TransactionType = "SelectTaskForProgress";
                global.param1 = "TD_Id";
                global.param1Value = Id;
                global.StoreProcedure = "TaskDetails_USP";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                CreateTask task = new CreateTask();
                task = GetItem1<CreateTask>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = task;
                return View(Srecord);
            }
            else
            {
                ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;

                DataSet ds = new DataSet();

                global.TransactionType = "SelectTaskForProgress";
                global.param1 = "TD_Id";
                global.param1Value = Id;
                global.StoreProcedure = "TaskDetails_USP";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                CreateTask task = new CreateTask();
                task = GetItem1<CreateTask>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = task;
                return View(Srecord);
            }



            //if (SMMEUserModel == null)
            //{
            //    return RedirectToAction("SMMELogin", "Account");
            //}
            //else
            //{
            //    ViewBag.SmmeId = SMMEUserModel.UM_MainID;

            //    DataSet ds = new DataSet();
            //    global.param1Value = Id;
            //    global.param1 = "TD_Id";
      
            //    global.StoreProcedure = "TaskDetails_USP";
            //    global.TransactionType = "SelectTaskForProgress";
            //    ds = dl.GetGlobalMasterTransactionSingle1(global);
            //    CreateTask task = new CreateTask();
            //    task = GetItem1<CreateTask>(ds.Tables[0]);
            //    //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
            //    var Srecord = task;
            //    return View(Srecord);
            //}
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
        public ActionResult TaskProgressAdmin(int? Id)
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
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


        //public ActionResult ProjectBudgetDashboard(int? Id)
        //{

        //    ViewBag.Id = Id;
        //    DataTable dt = new DataTable();

        //    Dictionary<string, object> childRow = new Dictionary<string, object>();
        //    global.StoreProcedure = "ProjectDetails_USP";
        //    global.TransactionType = "SelectFY";
        //    string[] arr = new string[] { };
        //    global.Param = arr;
        //    dt = dl.GetGlobalMaster(global);
        //    FinancialYearSetUp fyDt = new FinancialYearSetUp();
        //    //fyDt = GetItem1<FinancialYearSetUp>(dt);
        //    foreach (DataRow row in dt.Rows)
        //    {

        //        foreach (DataColumn col in dt.Columns)
        //        {
        //            childRow.Add(col.ColumnName, row[col]);
        //        }

        //    }
        //    //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
        //    ViewBag.FyId = childRow["FM_Id"];

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
            global.Param = new string[] { "ENR_Id"};
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

        //public ActionResult ProjectFundExpenditure(int? Id)
        //{
        //    ViewBag.Id = Id;
        //    ViewBag.Id = Id;
        //    DataTable dt = new DataTable();

        //    Dictionary<string, object> childRow = new Dictionary<string, object>();
        //    global.StoreProcedure = "ProjectDetails_USP";
        //    global.TransactionType = "SelectFY";
        //    string[] arr = new string[] { };
        //    global.Param = arr;
        //    dt = dl.GetGlobalMaster(global);
        //    FinancialYearSetUp fyDt = new FinancialYearSetUp();
        //    //fyDt = GetItem1<FinancialYearSetUp>(dt);
        //    foreach (DataRow row in dt.Rows)
        //    {

        //        foreach (DataColumn col in dt.Columns)
        //        {
        //            childRow.Add(col.ColumnName, row[col]);
        //        }

        //    }
        //    //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
        //    ViewBag.FyId = childRow["FM_Id"];
        //    return View();
        //}

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

        public ActionResult ProjectWiseDoc(int? Id)
        {
            ViewBag.Id = Id;
            return View();
        }
        public ActionResult TaskBoard()
        {
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
                if (SMMEUserModel != null)
                {
                    ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                    return View();
                }
                if (SMMEUserEmpModel != null)
                {
                    ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
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
                if (SMMEUserModel != null)
                {
                    ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                    return View();
                }
                if (SMMEUserEmpModel != null)
                {
                    ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult AssignedUserForSMME()
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
                if (SMMEUserModel != null)
                {
                    ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                    ViewBag.UserSubRole = SMMEUserModel.UM_SubRole;
                    ViewBag.UserType = SMMEUserModel.UM_Role;
                    return View();
                }
                if (SMMEUserEmpModel != null)
                {
                    ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
                    ViewBag.UserSubRole = SMMEUserEmpModel.UM_SubRole;
                    ViewBag.UserType = SMMEUserEmpModel.UM_Role;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

    }
}