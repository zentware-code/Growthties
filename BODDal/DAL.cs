using BODDal.Convertor;
using BODDal.Models.Interface;
using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Drawing;

namespace BODDal
{
    public class DAL
    {
        private static string GetConnectionString() => ConfigurationManager.ConnectionStrings["ConStr"].ConnectionString;
        public UserModel GetUserLogin(UserModel user)
        {

            UserModel UserObj = new UserModel();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@UserLogin", user.UserLoginID));
            arrParams.Add(new SqlParameter("@PassWord", user.Password));
            arrParams.Add(new SqlParameter("@Role", user.Role));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserLogin_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    UserObj.UserID = Convert.ToInt32(rdr["UM_Id"]);
                    UserObj.UserName = Convert.ToString(rdr["UM_Name"]);
                    UserObj.UM_MainID = Convert.ToInt32(rdr["UM_MainID"]);
                    UserObj.CompanyName = Convert.ToString(rdr["CM_Name"]);
                    UserObj.UM_Role = Convert.ToString(rdr["UM_Role"]);
                    UserObj.UM_SubRole = Convert.ToString(rdr["UM_SubRole"]);
                    UserObj.UM_Active = Convert.ToInt32(rdr["UM_Active"]);
                    UserObj.UM_ContactNo = Convert.ToString(rdr["UM_ContactNo"]);
                    UserObj.UM_EmailId = Convert.ToString(rdr["UM_EmailId"]);
                    UserObj.UM_Password = Convert.ToString(rdr["UM_Password"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);
                    UserObj.UM_ProfilePic = Convert.ToString(rdr["UM_ProfilePic"]);
                    UserObj.UM_Prefix = Convert.ToString(rdr["UM_Prefix"]);
                    UserObj.UM_Status = Convert.ToInt32(rdr["UM_Status"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CompanyPic = Convert.ToString(rdr["UM_CompanyPic"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);

                    UserObj.ThemeColor = Convert.ToString(rdr["UM_ThemeColor"]);
                    UserObj.ThemeStyle = Convert.ToString(rdr["UM_ThemeStyle"]);
                    UserObj.TheamLink = Convert.ToString(rdr["UM_TheamLink"]);
                    UserObj.CoreLink = Convert.ToString(rdr["UM_CoreLink"]);
                    UserObj.CustomCSSLink = Convert.ToString(rdr["UM_CustomCSSLink"]);
                    UserObj.UM_EmailVery = Convert.ToString(rdr["UM_EmailVery"]);
                    UserObj.ChildMenuJsLink = Convert.ToString(rdr["ChildMenuJsLink"]);

                }
                rdr.Close();
            }
            rdr.Dispose();
            return UserObj;

        }
        public UserModel GetUserEmpLogin(UserModel user)
        {

            UserModel UserObj = new UserModel();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@UserLogin", user.UserLoginID));
            arrParams.Add(new SqlParameter("@PassWord", user.Password.Trim()));
            arrParams.Add(new SqlParameter("@Role", user.Role));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserEmpLogin_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    UserObj.UserID = Convert.ToInt32(rdr["UM_Id"]);
                    UserObj.UserName = Convert.ToString(rdr["UM_Name"]);
                    UserObj.UM_MainID = Convert.ToInt32(rdr["UM_MainID"]);
                    UserObj.CompanyName = Convert.ToString(rdr["CM_Name"]);
                    UserObj.UM_Role = Convert.ToString(rdr["UM_Role"]);
                    UserObj.UM_SubRole = Convert.ToString(rdr["UM_SubRole"]);
                    UserObj.UM_Active = Convert.ToInt32(rdr["UM_Active"]);
                    UserObj.UM_ContactNo = Convert.ToString(rdr["UM_ContactNo"]);
                    UserObj.UM_EmailId = Convert.ToString(rdr["UM_EmailId"]);
                    UserObj.UM_Password = Convert.ToString(rdr["UM_Password"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);
                    UserObj.UM_ProfilePic = Convert.ToString(rdr["UM_ProfilePic"]);
                    UserObj.UM_Prefix = Convert.ToString(rdr["UM_Prefix"]);
                    UserObj.UM_Status = Convert.ToInt32(rdr["UM_Status"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CompanyPic = Convert.ToString(rdr["UM_CompanyPic"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);
                    UserObj.UM_EmailVery = Convert.ToString(rdr["UM_EmailVery"]);
                    UserObj.ThemeColor = Convert.ToString(rdr["UM_ThemeColor"]);
                    UserObj.ThemeStyle = Convert.ToString(rdr["UM_ThemeStyle"]);
                    UserObj.TheamLink = Convert.ToString(rdr["UM_TheamLink"]);
                    UserObj.CoreLink = Convert.ToString(rdr["UM_CoreLink"]);
                    UserObj.CustomCSSLink = Convert.ToString(rdr["UM_CustomCSSLink"]);
                    UserObj.ChildMenuJsLink = Convert.ToString(rdr["ChildMenuJsLink"]);

                }
                rdr.Close();
            }
            rdr.Dispose();
            return UserObj;

        }
        public UserWiseTheme GetUserWiseTheme(int? userid)
        {

            UserWiseTheme usertheme = new UserWiseTheme();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@UTM_UserId", userid));
            arrParams.Add(new SqlParameter("@TransactionType", "Select"));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserWiseTheme_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    usertheme.UTM_Id = Convert.ToInt32(rdr["UTM_Id"]);
                    usertheme.UTM_UserId = Convert.ToInt32(rdr["UTM_UserId"]);
                    usertheme.UTM_ThemeClass = Convert.ToString(rdr["UTM_ThemeClass"]);
                    usertheme.UTM_CoreLink = Convert.ToString(rdr["UTM_CoreLink"]);
                    usertheme.UTM_DefaultLink = Convert.ToString(rdr["UTM_DefaultLink"]);
                    usertheme.UTM_MenuNavigation = Convert.ToString(rdr["UTM_MenuNavigation"]);
                    usertheme.UTM_NavbarType = Convert.ToString(rdr["UTM_NavbarType"]);
                }
                rdr.Close();
            }
            rdr.Dispose();
            return usertheme;

        }
        #region GetGlobalMasterList

        public static IList<T> GetGlobalMasterList<T>(GlobalData global) where T : IModelBase, new()
        {
            IList<T> entityList;
            entityList = Convertor.HelperFunctions.ToList<T>(GetGlobalMasterList(global));
            return entityList;
        }
        public static DataTable GetGlobalMasterList(GlobalData global)
        {
            DataTable dt = new DataTable();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", global.TransactionType));
            for (int i = 0; i < global.Param.Length; i++)
            {
                var sqlparam = new SqlParameter();
                sqlparam.ParameterName = global.Param[i];
                if (global.paramValue != null && global.paramValue.Length > i)
                {
                    sqlparam.Value = global.paramValue[i];
                }
                arrParams.Add(sqlparam);
            }
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            dt = SqlHelper.ExecuteDataTable(GetConnectionString(), CommandType.StoredProcedure, global.StoreProcedure, arrParams.ToArray());

            return dt;
        }
        public DataTable GetGlobalMasterTransaction(GlobalData global)
        {
            DataTable dt = new DataTable();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", global.TransactionType));
            if (global.param1 != null)
            {
                arrParams.Add(new SqlParameter("@" + global.param1, global.param1Value));
            }
            if (global.param2 != null)
            {
                if (global.param2Value != null)
                {

                    arrParams.Add(new SqlParameter("@" + global.param2, global.param2Value));
                }
                else if (global.paramString2 != null)
                {
                    arrParams.Add(new SqlParameter("@" + global.param2, global.paramString2));
                }
            }
            if (global.param3 != null && global.param3 != "OptionId")
            {
                arrParams.Add(new SqlParameter("@" + global.param3, global.param3Value));
            }
            if (global.param4 != null)
            {
                if (global.param4Value != null)
                {
                    arrParams.Add(new SqlParameter("@" + global.param4, global.param4Value));
                }
                else if (global.paramString4 != null)
                {
                    arrParams.Add(new SqlParameter("@" + global.param4, global.paramString4));
                }
            }
            if (global.param5 != null)
            {
                if (global.param5Value != null)
                {

                    arrParams.Add(new SqlParameter("@" + global.param5, global.param5Value));
                }
                else if (global.paramString5 != null)
                {
                    arrParams.Add(new SqlParameter("@" + global.param5, global.paramString5));
                }
            }
            arrParams.Add(new SqlParameter("UserId", global.UserID));
            if (global.ParamFromDate != null)
            {
                arrParams.Add(new SqlParameter("@" + global.ParamFromDate, global.ParamFromDateValue == "" ? null : global.ParamFromDateValue));
                arrParams.Add(new SqlParameter("@" + global.ParamToDate, global.ParamToDateValue == "" ? null : global.ParamToDateValue));
            }

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            dt = SqlHelper.ExecuteDataTable(GetConnectionString(), CommandType.StoredProcedure, global.StoreProcedure, arrParams.ToArray());

            return dt;
        }

        public DataSet GetGlobalMasterTransactionSingle(GlobalData global)
        {
            DataSet ds = new DataSet();
            List<SqlParameter> arrParams = new List<SqlParameter>();
            if (global.TransactionType != null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", global.TransactionType));
            }
            if (global.param1Value != null)
            {

                arrParams.Add(new SqlParameter("@" + global.param1, global.param1Value));
            }
            else if (global.paramString != null)
            {
                arrParams.Add(new SqlParameter("@" + global.param1, global.paramString));
            }

            if (global.param2 != null)
            {
                if (global.param2Value != null)
                {

                    arrParams.Add(new SqlParameter("@" + global.param2, global.param2Value));
                }
                else if (global.paramString2 != null)
                {
                    arrParams.Add(new SqlParameter("@" + global.param2, global.paramString2));
                }
            }
            if (global.param3 != null)
            {
                if (global.param3Value != null)
                {

                    arrParams.Add(new SqlParameter("@" + global.param3, global.param3Value));
                }
                else
                {
                    arrParams.Add(new SqlParameter("@" + global.param3, global.paramString3));
                }
            }
            if (global.CompanyID != null && global.CompanyID != 0)
            {
                arrParams.Add(new SqlParameter("@CompanyID", global.CompanyID));
            }

            if (global.FYId != null && global.FYId != 0)
            {
                arrParams.Add(new SqlParameter("@FYId", global.FYId));
            }
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            ds = SqlHelper.ExecuteDataset(GetConnectionString(), CommandType.StoredProcedure, global.StoreProcedure, arrParams.ToArray());

            return ds;
        }

        public DataSet GetGlobalMasterTransactionSingle1(GlobalData global)
        {
            DataSet ds = new DataSet();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", global.TransactionType));
            if (global.param1Value != null)
            {

                arrParams.Add(new SqlParameter("@" + global.param1, global.param1Value));
            }
            else if (global.paramString != null)
            {
                arrParams.Add(new SqlParameter("@" + global.param1, global.paramString));
            }
            if (global.param2 != null)
            {
                if (global.param2Value != null)
                {

                    arrParams.Add(new SqlParameter("@" + global.param2, global.param2Value));
                }
                else if (global.paramString2 != null)
                {
                    arrParams.Add(new SqlParameter("@" + global.param2, global.paramString2));
                }
            }
            if (global.param3 != null)
            {
                if (global.param3Value != null)
                {

                    arrParams.Add(new SqlParameter("@" + global.param3, global.param3Value));
                }
                else
                {
                    arrParams.Add(new SqlParameter("@" + global.param3, global.paramString3));
                }
            }

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            ds = SqlHelper.ExecuteDataset(GetConnectionString(), CommandType.StoredProcedure, global.StoreProcedure, arrParams.ToArray());

            return ds;
        }

        #endregion
        #region GetGlobalMaster
        public DataTable GetGlobalMaster(GlobalData global)
        {
            DataTable dt = new DataTable();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", global.TransactionType));
            if (global.Param.Length > 0)
            {
                for (int i = 0; i < global.Param.Length; i++)
                {
                    var sqlparam = new SqlParameter();
                    sqlparam.ParameterName = global.Param[i];
                    if (global.paramValue != null && global.paramValue.Length > i)
                    {
                        sqlparam.Value = global.paramValue[i];
                    }
                    arrParams.Add(sqlparam);
                }
            }
            arrParams.Add(new SqlParameter("@UserId", global.UserID));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            dt = SqlHelper.ExecuteDataTable(GetConnectionString(), CommandType.StoredProcedure, global.StoreProcedure, arrParams.ToArray());

            return dt;
        }
        #endregion
        public List<GroupMenu> GetGroupMenu(int UserId, string role)
        {
            List<GroupMenu> ObjGrMenu = new List<GroupMenu>();
            GroupMenu GrpObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "GroupMenu"));
            arrParams.Add(new SqlParameter("@UserId", UserId));
            arrParams.Add(new SqlParameter("@MenuFor", role));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "Menu_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    GrpObj = new GroupMenu();

                    GrpObj.MenuGrId = Convert.ToInt32(rdr["MenuGrId"].ToString());
                    GrpObj.MenuGroup = rdr["MenuGroup"].ToString();

                    ObjGrMenu.Add(GrpObj);
                }
                rdr.Close();
            }
            rdr.Dispose();

            return ObjGrMenu;
        }
        #region Menu
        public List<MainMenu> GetMainMenu(int UserId, string role)
        {
            List<MainMenu> ObjMainMenu = new List<MainMenu>();
            MainMenu mainObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "MainMenu"));
            arrParams.Add(new SqlParameter("@UserId", UserId));
            arrParams.Add(new SqlParameter("@MenuFor", role));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "Menu_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    mainObj = new MainMenu();
                    mainObj.ID = Convert.ToInt32(rdr["MenuID"].ToString());
                    mainObj.MainMenuURL = rdr["MenuURL"].ToString();
                    mainObj.MainMenuItem = rdr["MenuName"].ToString();
                    mainObj.MenuGroupId = Convert.ToInt32(rdr["MenuGroupId"].ToString());
                    mainObj.MenuIcon = rdr["Icon"].ToString();
                    mainObj.MenuClass = rdr["MenuClass"].ToString();
                    ObjMainMenu.Add(mainObj);
                }
                rdr.Close();
            }
            rdr.Dispose();

            return ObjMainMenu;
        }
        public List<SubMenu> GetSubMenu(int UserId, string role)
        {
            List<SubMenu> ObjSubMenu = new List<SubMenu>();
            SubMenu submainObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "ChildMenu"));
            arrParams.Add(new SqlParameter("@UserId", UserId));
            arrParams.Add(new SqlParameter("@MenuFor", role));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "Menu_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    submainObj = new SubMenu();

                    submainObj.SubMenuURL = rdr["MenuURL"].ToString();
                    submainObj.SubMenuItem = rdr["MenuName"].ToString();
                    submainObj.SubMenuIcon = rdr["Icon"].ToString();
                    submainObj.MenuGroupId = Convert.ToInt32(rdr["MenuGroupId"]);
                    submainObj.MenuClass = rdr["MenuClass"].ToString();
                    submainObj.MainMenuID = Convert.ToInt32(rdr["ParentMenuID"].ToString());
                    ObjSubMenu.Add(submainObj);
                }
                rdr.Close();
            }
            rdr.Dispose();

            return ObjSubMenu;
        }

        public List<MainMenu> GetMainMenuSt()
        {
            List<MainMenu> ObjMainMenu = new List<MainMenu>();
            MainMenu mainObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "MainMenuSt"));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "Menu_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    mainObj = new MainMenu();
                    mainObj.ID = Convert.ToInt32(rdr["MenuID"].ToString());
                    mainObj.MainMenuURL = rdr["MenuURL"].ToString();
                    mainObj.MainMenuItem = rdr["MenuName"].ToString();
                    mainObj.MenuGroupId = Convert.ToInt32(rdr["MenuGroupId"].ToString());
                    mainObj.MenuIcon = rdr["Icon"].ToString();
                    mainObj.MenuClass = rdr["MenuClass"].ToString();
                    ObjMainMenu.Add(mainObj);
                }
                rdr.Close();
            }
            rdr.Dispose();

            return ObjMainMenu;
        }
        public List<SubMenu> GetSubMenuSt()
        {
            List<SubMenu> ObjSubMenu = new List<SubMenu>();
            SubMenu submainObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "ChildMenuSt"));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "Menu_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    submainObj = new SubMenu();

                    submainObj.SubMenuURL = rdr["MenuURL"].ToString();
                    submainObj.SubMenuItem = rdr["MenuName"].ToString();
                    submainObj.SubMenuIcon = rdr["Icon"].ToString();
                    submainObj.MenuGroupId = Convert.ToInt32(rdr["MenuGroupId"]);
                    submainObj.MenuClass = rdr["MenuClass"].ToString();
                    submainObj.MainMenuID = Convert.ToInt32(rdr["ParentMenuID"].ToString());
                    ObjSubMenu.Add(submainObj);
                }
                rdr.Close();
            }
            rdr.Dispose();

            return ObjSubMenu;
        }

        #endregion
        #region Menu For User Access
        public List<MainMenu> GetMainMenuForUser(int userId, int? UM_Id, string MenuFor)
        {
            List<MainMenu> ObjMainMenu = new List<MainMenu>();
            MainMenu mainObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "MainMenu"));

            arrParams.Add(new SqlParameter("@UserId", userId));
            arrParams.Add(new SqlParameter("@UM_Id", UM_Id));
            arrParams.Add(new SqlParameter("@MenuFor", MenuFor));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    mainObj = new MainMenu();
                    mainObj.MenuId = Convert.ToInt32(rdr["MenuID"].ToString());
                    mainObj.MainMenuURL = rdr["MenuURL"].ToString();
                    mainObj.MainMenuItem = rdr["MenuName"].ToString();
                    mainObj.MenuIcon = rdr["Icon"].ToString();
                    mainObj.Checked = rdr["checked"].ToString();
                    ObjMainMenu.Add(mainObj);
                }
                rdr.Close();
            }
            rdr.Dispose();

            return ObjMainMenu;
        }
        public List<SubMenu> GetSubMenuForUser(int userId, int? UM_Id, string MenuFor)
        {
            List<SubMenu> ObjSubMenu = new List<SubMenu>();
            SubMenu submainObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "ChildMenu"));

            arrParams.Add(new SqlParameter("@UserId", userId));
            arrParams.Add(new SqlParameter("@UM_Id", UM_Id));
            arrParams.Add(new SqlParameter("@MenuFor", MenuFor));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    submainObj = new SubMenu();
                    submainObj.MenuId = Convert.ToInt32(rdr["MenuID"].ToString());
                    submainObj.SubMenuURL = rdr["MenuURL"].ToString();
                    submainObj.SubMenuItem = rdr["MenuName"].ToString();
                    submainObj.SubMenuIcon = rdr["Icon"].ToString();
                    submainObj.MainMenuID = Convert.ToInt32(rdr["ParentMenuID"].ToString());
                    submainObj.Checked = rdr["ISchecked"].ToString();
                    ObjSubMenu.Add(submainObj);
                }
                rdr.Close();
            }
            rdr.Dispose();

            return ObjSubMenu;
        }
        #endregion
        #region GetDDLList
        public List<DDLList> GetDDLList(DDLList ddlList)
        {
            List<DDLList> DDLObjList = new List<DDLList>();
            DDLList DDLObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@tableName", ddlList.tableName));
            arrParams.Add(new SqlParameter("@param", ddlList.param));
            arrParams.Add(new SqlParameter("@PId", ddlList.PId));
            arrParams.Add(new SqlParameter("@ColumnName", ddlList.ColumnName));
            arrParams.Add(new SqlParameter("@PId1", ddlList.PId1 == 0 ? null : ddlList.PId1));
            arrParams.Add(new SqlParameter("@ColumnName1", ddlList.ColumnName1 == "" ? null : ddlList.ColumnName1));
            arrParams.Add(new SqlParameter("@Text", ddlList.Text));
            arrParams.Add(new SqlParameter("@Value", ddlList.Value));
            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "DropDown_For_ALL_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    DDLObj = new DDLList();
                    DDLObj.Value = Convert.ToString(rdr["Value"]);
                    DDLObj.Text = Convert.ToString(rdr["Text"]);
                    DDLObjList.Add(DDLObj);
                }
                rdr.Close();
            }
            rdr.Dispose();
            return DDLObjList;
        }
        #endregion
        #region GetDDLJoinList
        public List<DDLJoinList> GetDDLJoinList(DDLJoinList ddlList)
        {
            List<DDLJoinList> DDLObjList = new List<DDLJoinList>();
            DDLJoinList DDLObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@tableName1", ddlList.tableName1));
            arrParams.Add(new SqlParameter("@tableName2", ddlList.tableName2));
            arrParams.Add(new SqlParameter("@Param", ddlList.Param));
            arrParams.Add(new SqlParameter("@PId", ddlList.PId));
            arrParams.Add(new SqlParameter("@Param1", ddlList.Param1));
            arrParams.Add(new SqlParameter("@PId1", ddlList.PId1));
            arrParams.Add(new SqlParameter("@ColumnName", ddlList.ColumnName));
            arrParams.Add(new SqlParameter("@ColumnName1", ddlList.ColumnName1));
            arrParams.Add(new SqlParameter("@Text", ddlList.Text));
            arrParams.Add(new SqlParameter("@Value", ddlList.Value));
            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "DropDown_For_JOIN_SP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    DDLObj = new DDLJoinList();
                    DDLObj.Value = Convert.ToString(rdr["Value"]);
                    DDLObj.Text = Convert.ToString(rdr["Text"]);
                    DDLObjList.Add(DDLObj);
                }
                rdr.Close();
            }
            rdr.Dispose();
            return DDLObjList;
        }
        #endregion
        #region InsertUpdateAll
        public static long InsertUpdate<T>(T entity) where T : IModelBase
        {
            try
            {
                var sqlparams = HelperFunctions.GenerateSqlParams<T>(entity,
                    entity.Id == 0 ? HelperFunctions.SqlOptType.Insert : HelperFunctions.SqlOptType.Update);

                var uspName = entity.GetType().Name + "_USP";

                SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, uspName, sqlparams.ToArray());
                long val = Convert.ToInt64(sqlparams[sqlparams.Count - 1].Value);
                return val;

            }
            catch (Exception ex)
            {

                throw;
            }
        }
        #endregion

        #region GlobalDelete
        public long GlobalDelete(GlobalDelete del)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@param", del.param));
            arrParams.Add(new SqlParameter("@tableName", del.tableName));
            arrParams.Add(new SqlParameter("@ColumnName", del.ColumnName));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "Delete_For_ALL", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        #endregion
        #region GlobalDeleteTransaction
        public long GlobalDeleteTransaction(GlobalDelTrans del)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@DelId", del.DelId));
            arrParams.Add(new SqlParameter("@TransactionType", del.TransactionType));
            arrParams.Add(new SqlParameter("@CompanyId", del.CompanyId));
            arrParams.Add(new SqlParameter("@UserId", del.UserId));
            arrParams.Add(new SqlParameter("@FyId", del.FyId));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "Delete_For_ALLTrans", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        #endregion
        public List<DDLList> GetUserWiseCompanyist(UserModel UserModel)
        {
            List<DDLList> DDLObjList = new List<DDLList>();
            DDLList DDLObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@UserID", UserModel.UserID));
            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserWiseCompanyList_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    DDLObj = new DDLList();
                    DDLObj.Value = Convert.ToString(rdr["Value"]);
                    DDLObj.Text = Convert.ToString(rdr["Text"]);
                    DDLObjList.Add(DDLObj);
                }
                rdr.Close();
            }
            rdr.Dispose();
            return DDLObjList;
        }
        public DDLList GetCompanyWiseCompanyist(int CompanyID)
        {

            DDLList DDLObj = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@CompanyID", CompanyID));
            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "CompanyWiseCompanyList_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    DDLObj = new DDLList();
                    DDLObj.Value = Convert.ToString(rdr["Value"]);
                    DDLObj.Text = Convert.ToString(rdr["Text"]);

                }
                rdr.Close();
            }
            rdr.Dispose();
            return DDLObj;
        }

        public static string GenerateRandomText()
        {
            const string Chars = "0123456789";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(Chars, 4)
                    .Select(s => s[random.Next(s.Length)])
                    .ToArray());
            return result;
        }

        public DataSet GetUserMaster(UserModel user)
        {
            DataSet ds = new DataSet();
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@UM_Id", user.paramValue));
            arrParams.Add(new SqlParameter("@CompanyID", 1));
            arrParams.Add(new SqlParameter("@TransactionType", user.TransactionType));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            ds = SqlHelper.ExecuteDataset(GetConnectionString(), CommandType.StoredProcedure, user.StoreProcedure, arrParams.ToArray());

            return ds;
        }
        public long UpdateUserInfo(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            if (User.UM_Id > 0)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_Login", User.UserLoginID));
            arrParams.Add(new SqlParameter("@UM_Password", User.Password));
            arrParams.Add(new SqlParameter("@UM_Name", User.UserName));
            arrParams.Add(new SqlParameter("@UM_CM_Id", User.CompanyID));
            arrParams.Add(new SqlParameter("@UM_MainId", 0));
            arrParams.Add(new SqlParameter("@UM_address", User.UM_Address));
            arrParams.Add(new SqlParameter("@UM_ContactNo", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UM_EmailId", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_EM_Id", User.UM_EM_Id));
            arrParams.Add(new SqlParameter("@UM_DM_Id", User.UM_DM_Id));
            arrParams.Add(new SqlParameter("@UserId", User.UserID));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long UserPhotoUpdate(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdatePhoto"));
            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_ProfilePic", User.UM_ProfilePic));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long ActiveInactiveUser(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            arrParams.Add(new SqlParameter("@TransactionType", "UserActive"));
            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_Active", User.UM_Active));
            arrParams.Add(new SqlParameter("@UserId", User.UserID));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertUpdateEnterpriseRegn(EnterpriseRegistration entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.ENR_Id == 0 || entity.ENR_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));

                arrParams.Add(new SqlParameter("@ENR_CompanyLogo", entity.ENR_CompanyLogo));
            }
            else
            {
                if (entity.Mode == "contact")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateContact"));
                    arrParams.Add(new SqlParameter("@ENR_Logo", entity.ENR_Logo));
                }
                if (entity.Mode == "company")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateCompany"));
                }
                if (entity.Mode == "legal_entity")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateLegalEntity"));
                }
                if (entity.Mode == "financial")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateFinancial"));
                }

            }
            arrParams.Add(new SqlParameter("@ENR_Id", entity.ENR_Id));
            arrParams.Add(new SqlParameter("@ENR_CompanyName", entity.ENR_CompanyName));
            arrParams.Add(new SqlParameter("@ENR_RegNumber", entity.ENR_RegNumber));
            arrParams.Add(new SqlParameter("@ENR_SectorId", entity.ENR_SectorId));
            arrParams.Add(new SqlParameter("@ENR_EnterpriseTypeId", entity.ENR_EnterpriseTypeId));
            arrParams.Add(new SqlParameter("@ENR_ProvinceId", entity.ENR_ProvinceId));
            arrParams.Add(new SqlParameter("@ENR_CountryId", entity.ENR_CountryId));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            arrParams.Add(new SqlParameter("@ENR_PrimaryContactFirstName", entity.ENR_PrimaryContactFirstName));
            arrParams.Add(new SqlParameter("@ENR_PrimaryContactLastName", entity.ENR_PrimaryContactLastName));
            arrParams.Add(new SqlParameter("@ENR_SecondaryContactFirstName", entity.ENR_SecondaryContactFirstName));
            arrParams.Add(new SqlParameter("@ENR_SecondaryContactLastName", entity.ENR_SecondaryContactLastName));
            arrParams.Add(new SqlParameter("@ENR_BillingFirstName", entity.ENR_BillingFirstName));
            arrParams.Add(new SqlParameter("@ENR_BillingLastName", entity.ENR_BillingLastName));
            arrParams.Add(new SqlParameter("@ENR_BillingEmail", entity.ENR_BillingEmail));
            arrParams.Add(new SqlParameter("@ENR_BillingSuburb", entity.ENR_BillingSuburb));
            arrParams.Add(new SqlParameter("@ENR_BillingCity", entity.ENR_BillingCity));
            arrParams.Add(new SqlParameter("@ENR_BillingPostalCode", entity.ENR_BillingPostalCode));
            arrParams.Add(new SqlParameter("@ENR_BillingProvinceId", entity.ENR_BillingProvinceId));
            arrParams.Add(new SqlParameter("@ENR_BillingCountryId", entity.ENR_BillingCountryId));

            arrParams.Add(new SqlParameter("@ENR_BusinessAddress", entity.ENR_BusinessAddress));

            arrParams.Add(new SqlParameter("@ENR_LegalEntityTypeId", entity.ENR_LegalEntityTypeId));
            arrParams.Add(new SqlParameter("@ENR_TaxNumber", entity.ENR_TaxNumber));
            arrParams.Add(new SqlParameter("@ENR_VatNumber", entity.ENR_VatNumber));
            arrParams.Add(new SqlParameter("@ENR_IncorporationDate", entity.ENR_IncorporationDate));
            arrParams.Add(new SqlParameter("@ENR_RegNum2", entity.ENR_RegNum2));
            arrParams.Add(new SqlParameter("@ENR_PrimaryContactName", entity.ENR_PrimaryContactName));
            arrParams.Add(new SqlParameter("@ENR_PrimaryContactEmail", entity.ENR_PrimaryContactEmail));
            arrParams.Add(new SqlParameter("@ENR_Password", entity.ENR_Password));
            arrParams.Add(new SqlParameter("@ENR_SecondaryContactName", entity.ENR_SecondaryContactName));
            arrParams.Add(new SqlParameter("@ENR_SecondaryContactEmail", entity.ENR_SecondaryContactEmail));
            arrParams.Add(new SqlParameter("@ENR_PrimaryContactNo", entity.ENR_PrimaryContactNo));
            arrParams.Add(new SqlParameter("@ENR_SecondaryContactNo", entity.ENR_SecondaryContactNo));
            arrParams.Add(new SqlParameter("@ENR_BillingContactNumber", entity.ENR_BillingContactNumber));
            arrParams.Add(new SqlParameter("@ENR_BillingAddress", entity.ENR_BillingAddress));
            arrParams.Add(new SqlParameter("@ENR_BussinessDescripton", entity.ENR_BussinessDescripton));
            arrParams.Add(new SqlParameter("@ENR_City", entity.ENR_City));
            arrParams.Add(new SqlParameter("@ENR_Subarb", entity.ENR_Subarb));
            arrParams.Add(new SqlParameter("@ENR_Address2", entity.ENR_Address2));
            arrParams.Add(new SqlParameter("@ENR_PostalCode", entity.ENR_PostalCode));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "EnterpriseRegistration_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertUpdateSMMERegistration(SMMERegistration entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.SMME_Id == 0 || entity.SMME_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
                arrParams.Add(new SqlParameter("@SMME_CompanyLogo", entity.SMME_CompanyLogo));
            }
            else
            {
                if (entity.Mode == "contact")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateContact"));
                }
                if (entity.Mode == "company")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateCompany"));
                }
                if (entity.Mode == "legal_entity")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateLegalEntity"));
                }
                if (entity.Mode == "financial")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateFinancial"));
                }

            }
            arrParams.Add(new SqlParameter("@SMME_Id", entity.SMME_Id));
            arrParams.Add(new SqlParameter("@SMME_EnterpriseId", entity.SMME_EnterpriseId));
            arrParams.Add(new SqlParameter("@SMME_CreatedBy", entity.SMME_CreatedBy));

            arrParams.Add(new SqlParameter("@IsStakeHolderEntry", entity.IsStakeHolderEntry));//ne Added 05_05_2025
            arrParams.Add(new SqlParameter("@SWS_StakeholderId", entity.SWS_StakeholderId));//ne Added 05_05_2025

            arrParams.Add(new SqlParameter("@SMME_CompanyName", entity.SMME_CompanyName));
            arrParams.Add(new SqlParameter("@SMME_RegNumber", entity.SMME_RegNumber));
            arrParams.Add(new SqlParameter("@SMME_SectorId", entity.SMME_SectorId));
            arrParams.Add(new SqlParameter("@SMME_Subarb", entity.SMME_Subarb));
            arrParams.Add(new SqlParameter("@SMME_SMMETypeId", entity.SMME_SMMETypeId));
            arrParams.Add(new SqlParameter("@SMME_PostalCode", entity.SMME_PostalCode));
            arrParams.Add(new SqlParameter("@SMME_ProvinceId", entity.SMME_ProvinceId));
            arrParams.Add(new SqlParameter("@SMME_CountryId", entity.SMME_CountryId));

            arrParams.Add(new SqlParameter("@SMME_PrimaryContactFirstName", entity.SMME_PrimaryContactFirstName));
            arrParams.Add(new SqlParameter("@SMME_PrimaryContactLastName", entity.SMME_PrimaryContactLastName));
            arrParams.Add(new SqlParameter("@SMME_SecondaryContactFirstName", entity.SMME_SecondaryContactFirstName));
            arrParams.Add(new SqlParameter("@SMME_SecondaryContactLastName", entity.SMME_SecondaryContactLastName));
            arrParams.Add(new SqlParameter("@SMME_BillingFirstName", entity.SMME_BillingFirstName));
            arrParams.Add(new SqlParameter("@SMME_BillingLastName", entity.SMME_BillingLastName));
            arrParams.Add(new SqlParameter("@SMME_BillingEmail", entity.SMME_BillingEmail));
            arrParams.Add(new SqlParameter("@SMME_BillingSuburb", entity.SMME_BillingSuburb));
            arrParams.Add(new SqlParameter("@SMME_BillingCity", entity.SMME_BillingCity));
            arrParams.Add(new SqlParameter("@SMME_BillingPostalCode", entity.SMME_BillingPostalCode));
            arrParams.Add(new SqlParameter("@SMME_BillingProvinceId", entity.SMME_BillingProvinceId));
            arrParams.Add(new SqlParameter("@SMME_BillingCountryId", entity.SMME_BillingCountryId));

            arrParams.Add(new SqlParameter("@SMME_EntityType", entity.SMME_EntityType));

            arrParams.Add(new SqlParameter("@SMME_PrimaryIdType", entity.SMME_PrimaryIdType));
            arrParams.Add(new SqlParameter("@SMME_PrimaryIdNumber", entity.SMME_PrimaryIdNumber));
            arrParams.Add(new SqlParameter("@SMME_SecondaryIdType", entity.SMME_SecondaryIdType));
            arrParams.Add(new SqlParameter("@SMME_SecondaryIdNumber", entity.SMME_SecondaryIdNumber));

            arrParams.Add(new SqlParameter("@SMME_DateOfBirth", entity.SMME_DateOfBirth));
            arrParams.Add(new SqlParameter("@SMME_Gender", entity.SMME_Gender));
            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            arrParams.Add(new SqlParameter("@SMME_BusinessAddress", entity.SMME_BusinessAddress));
            arrParams.Add(new SqlParameter("@SMME_Logo", entity.SMME_Logo));
            arrParams.Add(new SqlParameter("@SMME_LegalEntityTypeId", entity.SMME_LegalEntityTypeId));
            arrParams.Add(new SqlParameter("@SMME_TaxNumber", entity.SMME_TaxNumber));
            arrParams.Add(new SqlParameter("@SMME_VatNumber", entity.SMME_VatNumber));
            arrParams.Add(new SqlParameter("@SMME_IncorporationDate", entity.SMME_IncorporationDate));
            arrParams.Add(new SqlParameter("@SMME_RegNum2", entity.SMME_RegNum2));
            arrParams.Add(new SqlParameter("@SMME_PrimaryContactEmail", entity.SMME_PrimaryContactEmail));
            arrParams.Add(new SqlParameter("@SMME_Password", entity.SMME_Password));
            arrParams.Add(new SqlParameter("@SMME_SecondaryContactEmail", entity.SMME_SecondaryContactEmail));
            arrParams.Add(new SqlParameter("@SMME_PrimaryContactNo", entity.SMME_PrimaryContactNo));
            arrParams.Add(new SqlParameter("@SMME_SecondaryContactNo", entity.SMME_SecondaryContactNo));
            arrParams.Add(new SqlParameter("@SMME_BillingContactNumber", entity.SMME_BillingContactNumber));
            arrParams.Add(new SqlParameter("@SMME_BillingAddress", entity.SMME_BillingAddress));
            arrParams.Add(new SqlParameter("@SMME_Address2", entity.SMME_Address2));
            arrParams.Add(new SqlParameter("@SMME_BlckWomen", entity.SMME_BlckWomen));
            arrParams.Add(new SqlParameter("@SMME_City", entity.SMME_City));
            arrParams.Add(new SqlParameter("@SMME_BEElevel", entity.SMME_BEElevel));
            arrParams.Add(new SqlParameter("@SMME_ProtfolioGrowth", entity.SMME_ProtfolioGrowth));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "SMMERegistration_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long EnterprisePhotoUpdate(EnterpriseRegistration entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.Type == "CompanyLogo")
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdatePhotoENRCompanyLogo"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdatePhoto"));
            }

            arrParams.Add(new SqlParameter("@ENR_Id", entity.ENR_Id));
            arrParams.Add(new SqlParameter("@ENR_Logo", entity.ENR_Logo));
            arrParams.Add(new SqlParameter("@ENR_CompanyLogo", entity.ENR_CompanyLogo));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "EnterpriseRegistration_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long SMMEPhotoUpdate(SMMERegistration entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.Type == "CompanyLogo")
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdatePhotoSMMECompanyLogo"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdatePhoto"));
            }

            arrParams.Add(new SqlParameter("@SMME_Id", entity.SMME_Id));
            arrParams.Add(new SqlParameter("@SMME_Logo", entity.SMME_Logo));
            arrParams.Add(new SqlParameter("@SMME_CompanyLogo", entity.SMME_CompanyLogo));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "SMMERegistration_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long UserChangesPassword(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdatePassword"));
            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_Password", User.Password));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateQuestionSetup(QuestionSetUp entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable questionlist = new DataTable();
            questionlist.Columns.Add("QND_QuestionName", typeof(string));
            if (entity.QuestionDetailsList != null)
            {
                foreach (string ent in entity.QuestionDetailsList)
                {
                    DataRow dr = questionlist.NewRow();
                    dr["QND_QuestionName"] = ent;
                    questionlist.Rows.Add(dr);
                }
            }
            if (entity.QN_Id == 0 || entity.QN_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));

            }
            arrParams.Add(new SqlParameter("@QN_Id", entity.QN_Id));
            arrParams.Add(new SqlParameter("@QN_Question", entity.QN_Question.Trim()));
            arrParams.Add(new SqlParameter("@QN_QuestionType", entity.QN_QuestionType));
            arrParams.Add(new SqlParameter("@QN_EnterpriseId", entity.QN_EnterpriseId));
            arrParams.Add(new SqlParameter("@QuestionDetailsList", questionlist));
            arrParams.Add(new SqlParameter("@QN_IsUpload", entity.QN_IsUpload));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "QuestionSetUp_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertBuildQuestion(BuildAssessmentSetUp entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            DataTable dtQues = new DataTable();

            dtQues.Columns.Add("BAD_SegSlNo", typeof(Int32));
            dtQues.Columns.Add("BAD_SegmentId", typeof(Int32));
            dtQues.Columns.Add("BAD_Slno", typeof(Int32));
            dtQues.Columns.Add("BAD_QuestionId", typeof(Int32));

            foreach (var MD in entity.BuildAssesmentDetailsList)
            {
                DataRow dr = dtQues.NewRow();
                dr["BAD_SegSlNo"] = MD.BAD_SegSlNo;
                dr["BAD_SegmentId"] = MD.BAD_SegmentId;
                dr["BAD_Slno"] = MD.BAD_Slno;
                dr["BAD_QuestionId"] = MD.BAD_QuestionId;

                dtQues.Rows.Add(dr);
            }

            if (entity.BA_Id == 0 || entity.BA_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));

            }
            arrParams.Add(new SqlParameter("@BA_Id", entity.BA_Id));
            arrParams.Add(new SqlParameter("@BA_QuestionTypeId", entity.BA_QuestionTypeId));
            arrParams.Add(new SqlParameter("@BA_EnterpriseId", entity.BA_EnterpriseId));
            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));
            arrParams.Add(new SqlParameter("@UserId", entity.BA_CreatedBy));
            arrParams.Add(new SqlParameter("@BuildAssesmentDetailsList", dtQues));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BuildAssessmentSetUp_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertDeleteEnterpriseWiseSMME(EnterpriiseWiseSMME entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", entity.Transactiontype));

            arrParams.Add(new SqlParameter("@EWS_EnterpriseId", entity.EWS_EnterpriseId));
            arrParams.Add(new SqlParameter("@EWS_SMME_Id", entity.EWS_SMME_Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "EnterpriseWiseSMME_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertEnterpriseUserAdmin(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            if (User.UM_Id > 0)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_FirstName", User.UM_FirstName));
            arrParams.Add(new SqlParameter("@UM_LastName", User.UM_LastName));
            arrParams.Add(new SqlParameter("@UM_MainId", User.ENR_Id));
            arrParams.Add(new SqlParameter("@UM_Role", User.UM_Role));
            arrParams.Add(new SqlParameter("@UM_SubRole", User.UM_SubRole));
            arrParams.Add(new SqlParameter("@UM_SubRoleId", User.UM_SubRoleId));
            arrParams.Add(new SqlParameter("@UM_ContactNo", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UM_EmailId", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Login", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Password", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UserId", User.UserID));
            arrParams.Add(new SqlParameter("@UM_ProfilePic", User.UM_ProfilePic));
            arrParams.Add(new SqlParameter("@UM_Gender", User.UM_Gender));
            arrParams.Add(new SqlParameter("@UM_Age", User.UM_Age));
            arrParams.Add(new SqlParameter("@UM_BranchId", User.UM_BranchId));
            arrParams.Add(new SqlParameter("@CreatedBy", User.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", User.UpdatedBy));

            arrParams.Add(new SqlParameter("@UM_PrimaryIdType", User.UM_PrimaryIdType));
            arrParams.Add(new SqlParameter("@UM_PrimaryIdNumber", User.UM_PrimaryIdNumber));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertProjectDetails(ProjectDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            DataTable branch = new DataTable();
            branch.Columns.Add("BWP_BD_Id", typeof(int));

            if (entity.BranchList != null)
            {
                foreach (string cmp in entity.BranchList)
                {
                    DataRow dr = branch.NewRow();
                    dr["BWP_BD_Id"] = Convert.ToInt32(cmp);
                    branch.Rows.Add(dr);
                }
            }

            if (entity.PD_Id == 0 || entity.PD_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            else if (entity.PD_Id >= 0 && entity.TransactionType == "UpdateBudget")
            {
                arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            }
            else if (entity.PD_Id >= 0 && entity.TransactionType == "InsertStakeHolder")
            {
                arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));

            }
            arrParams.Add(new SqlParameter("@PD_Id", entity.PD_Id));
            arrParams.Add(new SqlParameter("@PD_ProjectName", entity.PD_ProjectName));
            arrParams.Add(new SqlParameter("@PD_DurationFromDate", entity.PD_DurationFromDate));
            arrParams.Add(new SqlParameter("@PD_DurationToDate", entity.PD_DurationToDate));
            arrParams.Add(new SqlParameter("@PD_Description", entity.PD_Description));
            arrParams.Add(new SqlParameter("@PD_SectorId", entity.PD_SectorId));
            arrParams.Add(new SqlParameter("@PD_EnterpriseId", entity.PD_EnterpriseId));
            arrParams.Add(new SqlParameter("@PD_BusinessTypeId", entity.PD_BusinessTypeId));
            arrParams.Add(new SqlParameter("@PD_StakeholderId", entity.PD_StakeholderId));
            arrParams.Add(new SqlParameter("@PD_BranchId", entity.PD_BranchId));

            arrParams.Add(new SqlParameter("@PWS_ProjectId", entity.PWS_ProjectId));
            arrParams.Add(new SqlParameter("@PWS_StakeholderId", entity.PWS_StakeholderId));

            arrParams.Add(new SqlParameter("@PD_Budget", entity.PD_Budget));
            arrParams.Add(new SqlParameter("@PD_BudgetType", entity.PD_BudgetType));
            arrParams.Add(new SqlParameter("@UserId", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UWP_UserType", entity.UWP_UserType));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            arrParams.Add(new SqlParameter("@BranchWiseProject", branch));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertEnterpriseUserFromEnterprise(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            if (User.UM_Id > 0)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdateEnterpriseUser"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "InsertEnterpriseUser"));
            }
            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_FirstName", User.UM_FirstName));
            arrParams.Add(new SqlParameter("@UM_LastName", User.UM_LastName));
            arrParams.Add(new SqlParameter("@UM_MainID", User.ENR_Id));
            arrParams.Add(new SqlParameter("@UM_Role", User.UM_Role));
            arrParams.Add(new SqlParameter("@UM_SubRole", User.UM_SubRole));
            arrParams.Add(new SqlParameter("@UM_SubRoleId", User.UM_SubRoleId));
            arrParams.Add(new SqlParameter("@UM_ContactNo", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UM_EmailId", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Login", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Password", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UserId", User.UserID));
            arrParams.Add(new SqlParameter("@UM_ProfilePic", User.UM_ProfilePic));
            arrParams.Add(new SqlParameter("@UM_Gender", User.UM_Gender));
            arrParams.Add(new SqlParameter("@UM_Age", User.UM_Age));
            arrParams.Add(new SqlParameter("@UM_BranchId", User.UM_BranchId));

            arrParams.Add(new SqlParameter("@UM_PrimaryIdType", User.UM_PrimaryIdType));
            arrParams.Add(new SqlParameter("@UM_PrimaryIdNumber", User.UM_PrimaryIdNumber));

            arrParams.Add(new SqlParameter("@CreatedBy", User.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", User.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long UpdateAssignProject(ProjectDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdateEnterprise"));
            arrParams.Add(new SqlParameter("@PD_EnterpriseId", entity.PD_EnterpriseId));
            arrParams.Add(new SqlParameter("@PD_Id", entity.PD_Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertCreateTask(CreateTask entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.TD_Id == 0 || entity.TD_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));

            }
            arrParams.Add(new SqlParameter("@TD_Id", entity.TD_Id));
            arrParams.Add(new SqlParameter("@TD_TaskName", entity.TD_TaskName));
            arrParams.Add(new SqlParameter("@TD_DurationFromDate", entity.TD_DurationFromDate));
            arrParams.Add(new SqlParameter("@TD_DurationToDate", entity.TD_DurationToDate));
            arrParams.Add(new SqlParameter("@TD_Description", entity.TD_Description));
            arrParams.Add(new SqlParameter("@TD_ProjectId", entity.TD_ProjectId));
            arrParams.Add(new SqlParameter("@TD_ActivityId", entity.TD_ActivityId));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "TaskDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long AssignAssessmentToSMME(AssignAssessmentToSMME entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            switch (entity.TransectionType)
            {
                case "reAssignAssessment": { arrParams.Add(new SqlParameter("@TransactionType", "reAssignAssessment")); } break;
                case "UpdateAssign": { arrParams.Add(new SqlParameter("@TransactionType", "UpdateAssign")); } break;
                default: { arrParams.Add(new SqlParameter("@TransactionType", "Insert")); } break;
            }
            arrParams.Add(new SqlParameter("@AAS_SMME_Id", entity.AAS_SMME_Id));
            arrParams.Add(new SqlParameter("@AAS_BA_Id", entity.AAS_BA_Id));
            arrParams.Add(new SqlParameter("@AAS_Assessment_Id", entity.AAS_Assessment_Id));
            arrParams.Add(new SqlParameter("@EnterpriseId", entity.AAS_EnterpriseId));
            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "AssignAssessmentToSMME_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long AssignProjectToSMME(AssignProjectToSmme entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@PSM_EnterpriseId", entity.PSM_EnterpriseId));
            arrParams.Add(new SqlParameter("@PSM_SmmeId", entity.PSM_SmmeId));
            arrParams.Add(new SqlParameter("@PSM_ProjectId", entity.PSM_ProjectId));
            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectWiseSMME_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertCreateActivity(CreateActivity entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.CA_Id == 0 || entity.CA_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            else
            {
                if (entity.CA_Id > 0 && entity.TransactionType == "IsCompleted")
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "UpdateActivityStatus"));
                }
                else
                {
                    arrParams.Add(new SqlParameter("@TransactionType", "Update"));
                }
            }
            arrParams.Add(new SqlParameter("@CA_Id", entity.CA_Id));
            arrParams.Add(new SqlParameter("@CA_ProjectId", entity.CA_ProjectId));

            arrParams.Add(new SqlParameter("@CA_ActivityName", entity.CA_ActivityName));
            arrParams.Add(new SqlParameter("@CA_DurationFromDate", entity.CA_DurationFromDate));
            arrParams.Add(new SqlParameter("@CA_DurationToDate", entity.CA_DurationToDate));
            arrParams.Add(new SqlParameter("@CA_Description", entity.CA_Description));
            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "CreateActivity_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateAssessmentQuesDetails(AssessmentQuesDetails assQues)
        {

            DataTable dtQues = new DataTable();

            dtQues.Columns.Add("ASA_QuestionId", typeof(Int32));
            dtQues.Columns.Add("ASA_Answer", typeof(string));
            dtQues.Columns.Add("ASA_SegmentId", typeof(Int32));
            dtQues.Columns.Add("ASA_File", typeof(string));

            foreach (var MD in assQues.AssessmentAnswerList)
            {
                DataRow dr = dtQues.NewRow();
                dr["ASA_QuestionId"] = MD.ASA_QuestionId == null ? 0 : MD.ASA_QuestionId;
                dr["ASA_Answer"] = MD.ASA_Answer;
                dr["ASA_SegmentId"] = MD.ASA_SegmentId == null ? 0 : MD.ASA_SegmentId;
                dr["ASA_File"] = MD.ASA_File;
                dtQues.Rows.Add(dr);
            }

            List<SqlParameter> arrParams = new List<SqlParameter>();

            if (assQues.ASM_Id == 0 || assQues.ASM_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));
            }

            arrParams.Add(new SqlParameter("@ASM_Id", assQues.ASM_Id));
            arrParams.Add(new SqlParameter("@ASM_SMME_Id", assQues.ASM_SMME_Id));
            arrParams.Add(new SqlParameter("@ASM_BA_Id", assQues.ASM_BA_Id));
            arrParams.Add(new SqlParameter("@ASM_AssessmentTypeId", assQues.ASM_AssessmentTypeId));
            arrParams.Add(new SqlParameter("@AssessmentAnswerList", dtQues));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "AssessmentQuesDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertCustomerDetails(CustomerDetails cust)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            if (cust.CD_Id > 0)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            arrParams.Add(new SqlParameter("@CD_Id", cust.CD_Id));
            arrParams.Add(new SqlParameter("@CD_FirstName", cust.CD_FirstName.Trim()));
            arrParams.Add(new SqlParameter("@CD_LastName", cust.CD_LastName.Trim()));
            arrParams.Add(new SqlParameter("@CD_ProfilePic", cust.CD_ProfilePic));
            arrParams.Add(new SqlParameter("@CD_AddressLine1", cust.CD_AddressLine1));
            arrParams.Add(new SqlParameter("@CD_AddressLine2", cust.CD_AddressLine2));
            arrParams.Add(new SqlParameter("@CD_Suburb", cust.CD_Suburb));
            arrParams.Add(new SqlParameter("@CD_City", cust.CD_City));
            arrParams.Add(new SqlParameter("@CD_ProvinceId", cust.CD_ProvinceId));
            arrParams.Add(new SqlParameter("@CD_CountryId", cust.CD_CountryId));

            arrParams.Add(new SqlParameter("@CD_PostalCode", cust.CD_PostalCode));
            arrParams.Add(new SqlParameter("@CD_ContactNumber", cust.CD_ContactNumber));
            arrParams.Add(new SqlParameter("@CD_Email", cust.CD_Email));
            arrParams.Add(new SqlParameter("@CD_Type", cust.CD_Type));
            arrParams.Add(new SqlParameter("@CD_Location", cust.CD_Location));
            arrParams.Add(new SqlParameter("@CD_SectorId", cust.CD_SectorId));
            arrParams.Add(new SqlParameter("@CD_BusinessTypeId", cust.CD_BusinessTypeId));

            arrParams.Add(new SqlParameter("@CD_RegistrationNo", cust.CD_RegistrationNo));
            arrParams.Add(new SqlParameter("@CD_Tax", cust.CD_Tax));
            arrParams.Add(new SqlParameter("@CD_Vat", cust.CD_Vat));

            arrParams.Add(new SqlParameter("@CreatedBy", cust.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", cust.UpdatedBy));

            arrParams.Add(new SqlParameter("@CD_EnterpriseId", cust.CD_EnterpriseId));

            arrParams.Add(new SqlParameter("@CD_SmmeId", cust.CD_SmmeId));
            arrParams.Add(new SqlParameter("@UserId", cust.UserId));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "CustomerDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertDeleteEnterpriseWiseCust(CustomerDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", entity.Transactiontype));
            arrParams.Add(new SqlParameter("@CD_EnterpriseId", entity.CD_EnterpriseId));
            arrParams.Add(new SqlParameter("@CD_Id", entity.CD_Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "CustomerDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertDeleteSMMEWiseCust(CustomerDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", entity.Transactiontype));
            arrParams.Add(new SqlParameter("@CD_SmmeId", entity.CD_SmmeId));
            arrParams.Add(new SqlParameter("@CD_Id", entity.CD_Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "CustomerDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertJobDetails(JobDetails entity)
        {

            DataTable dtjob = new DataTable();
            DataTable dtMaintJob = new DataTable();

            dtjob.Columns.Add("MJD_Title", typeof(string));
            dtjob.Columns.Add("MJD_StartDate", typeof(string));
            dtjob.Columns.Add("MJD_EndDate", typeof(string));

            foreach (var MD in entity.MultipleJobDetailsList)
            {
                if (MD.MJD_Title != null)
                {
                    DataRow dr = dtjob.NewRow();
                    dr["MJD_Title"] = MD.MJD_Title;
                    dr["MJD_StartDate"] = MD.MJD_StartDate;
                    dr["MJD_EndDate"] = MD.MJD_EndDate;

                    dtjob.Rows.Add(dr);
                }
            }

            dtMaintJob.Columns.Add("MNJD_Frequency", typeof(string));
            dtMaintJob.Columns.Add("MNJD_VisitCount", typeof(int));
            dtMaintJob.Columns.Add("MNJD_Date", typeof(string));

            foreach (var Mint in entity.MaintenanceJobDetailsList)
            {
                if (Mint.MNJD_Frequency != null)
                {
                    DataRow dr2 = dtMaintJob.NewRow();
                    dr2["MNJD_Frequency"] = Mint.MNJD_Frequency;
                    dr2["MNJD_VisitCount"] = Mint.MNJD_VisitCount;
                    dr2["MNJD_Date"] = Mint.MNJD_Date;

                    dtMaintJob.Rows.Add(dr2);
                }
            }
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.JD_Id == 0 || entity.JD_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));

            }
            arrParams.Add(new SqlParameter("@JD_Id", entity.JD_Id));
            arrParams.Add(new SqlParameter("@JD_JobName", entity.JD_JobName));
            arrParams.Add(new SqlParameter("@JD_JobStartDate", entity.JD_JobStartDate));
            arrParams.Add(new SqlParameter("@JD_JobEndDate", entity.JD_JobEndDate));
            arrParams.Add(new SqlParameter("@JD_Description", entity.JD_Description));
            arrParams.Add(new SqlParameter("@JD_CustomerId", entity.JD_CustomerId));
            arrParams.Add(new SqlParameter("@JD_EnterpriseId", entity.JD_EnterpriseId));
            arrParams.Add(new SqlParameter("@JD_SmmeId", entity.JD_SmmeId));
            arrParams.Add(new SqlParameter("@JD_SectorId", entity.JD_SectorId));
            arrParams.Add(new SqlParameter("@JD_BusinessTypeId", entity.JD_BusinessTypeId));
            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            arrParams.Add(new SqlParameter("@MultipleJobDetailsList", dtjob));
            arrParams.Add(new SqlParameter("@MaintenanceJobDetailsList", dtMaintJob));

            arrParams.Add(new SqlParameter("@JD_JobCateoryId", entity.JD_JobCateoryId));
            arrParams.Add(new SqlParameter("@JD_VistType ", entity.JD_VistType));
            arrParams.Add(new SqlParameter("@JD_BudgeType ", entity.JD_BudgeType));
            arrParams.Add(new SqlParameter("@JD_Budget ", entity.JD_Budget));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long AssignJobToEnterpriseUser(AssignJobToUser entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@AJU_JobId", entity.AJU_JobId));
            arrParams.Add(new SqlParameter("@TJ_TeamId", entity.TJ_TeamId));
            arrParams.Add(new SqlParameter("@Status", entity.Status));
            arrParams.Add(new SqlParameter("@AJU_UserId", entity.AJU_UserId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long AssignJobToSMMEUser(AssignJobToUser entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@AJU_JobId", entity.AJU_JobId));
            arrParams.Add(new SqlParameter("@TJ_TeamId", entity.TJ_TeamId));
            arrParams.Add(new SqlParameter("@Status", entity.Status));
            arrParams.Add(new SqlParameter("@AJU_UserId", entity.AJU_UserId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertRecordForProgress(JobProgress entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            arrParams.Add(new SqlParameter("@JP_JobId", entity.JP_JobId));
            arrParams.Add(new SqlParameter("@JP_JobChildId", entity.JP_JobChildId));
            arrParams.Add(new SqlParameter("@UserId", entity.UserId));
            arrParams.Add(new SqlParameter("@JP_UserType", entity.JP_UserType));
            arrParams.Add(new SqlParameter("@JP_JobStatus", entity.JP_JobStatus));
            arrParams.Add(new SqlParameter("@JP_JobStatusCode", entity.JP_JobStatusCode));
            arrParams.Add(new SqlParameter("@JP_JobType", entity.JP_JobType));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobProgress_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long AssignJobToEnterprise(JobDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@AJU_JobId", entity.JD_Id));
            arrParams.Add(new SqlParameter("@JD_EnterpriseId", entity.JD_EnterpriseId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertTeamBuildingForSMME(BuildTeam entity)
        {

            DataTable Userlist = new DataTable();
            Userlist.Columns.Add("BTU_UserId", typeof(string));
            if (entity.BuildTeamUserList != null)
            {
                foreach (string ent in entity.BuildTeamUserList)
                {
                    DataRow dr = Userlist.NewRow();
                    dr["BTU_UserId"] = ent;
                    Userlist.Rows.Add(dr);
                }
            }

            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.BT_Id == 0 || entity.BT_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            else if (entity.BT_Id > 0 && entity.TransactionType == "UpdateTeamLeader")

            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdateTeamLeader"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));

            }
            arrParams.Add(new SqlParameter("@BT_Id", entity.BT_Id));
            arrParams.Add(new SqlParameter("@BT_TeamName", entity.BT_TeamName));
            arrParams.Add(new SqlParameter("@BT_Description", entity.BT_Description));
            arrParams.Add(new SqlParameter("@BT_SMMEId", entity.BT_SMMEId));
            arrParams.Add(new SqlParameter("@BT_TeamLeader", entity.BT_TeamLeader));
            arrParams.Add(new SqlParameter("@BuildTeamUserList", Userlist));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BuildTeam_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long UpdateUploadStatus(JobProgress entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdateUploadStatus"));
            arrParams.Add(new SqlParameter("@JPC_Id", entity.JPC_Id));
            arrParams.Add(new SqlParameter("@JP_JobId", entity.JP_JobId));
            arrParams.Add(new SqlParameter("@JP_JobChildId", entity.JP_JobChildId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobProgress_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertRecordForProgressComment(JobProgress entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "InsertComment"));
            arrParams.Add(new SqlParameter("@JP_JobId", entity.JP_JobId));
            arrParams.Add(new SqlParameter("@JP_JobChildId", entity.JP_JobChildId));
            arrParams.Add(new SqlParameter("@UserId", entity.UserId));
            arrParams.Add(new SqlParameter("@JPC_Comment", entity.JP_Comments));
            arrParams.Add(new SqlParameter("@JP_JobStatus", entity.JP_JobStatus));
            arrParams.Add(new SqlParameter("@JP_JobStatusCode", entity.JP_JobStatusCode));
            arrParams.Add(new SqlParameter("@JP_Upload", entity.JP_Upload));
            arrParams.Add(new SqlParameter("@JP_JobType", entity.JP_JobType));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobProgress_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertBranchDetails(BranchDetails brnch)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            if (brnch.BD_Id > 0)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }
            arrParams.Add(new SqlParameter("@BD_Id", brnch.BD_Id));
            arrParams.Add(new SqlParameter("@BD_Name", brnch.BD_Name));
            arrParams.Add(new SqlParameter("@BD_AddressLine1", brnch.BD_AddressLine1));
            arrParams.Add(new SqlParameter("@BD_AddressLine2", brnch.BD_AddressLine2));
            arrParams.Add(new SqlParameter("@BD_Suburb", brnch.BD_Suburb));
            arrParams.Add(new SqlParameter("@BD_City", brnch.BD_City));
            arrParams.Add(new SqlParameter("@BD_ProvinceId", brnch.BD_ProvinceId));
            arrParams.Add(new SqlParameter("@BD_PostalCode", brnch.BD_PostalCode));
            arrParams.Add(new SqlParameter("@BD_ContactNumber", brnch.BD_ContactNumber));
            arrParams.Add(new SqlParameter("@BD_Email", brnch.BD_Email));
            arrParams.Add(new SqlParameter("@CreatedBy", brnch.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", brnch.UpdatedBy));

            arrParams.Add(new SqlParameter("@BD_Location", brnch.BD_Location));

            arrParams.Add(new SqlParameter("@BD_EnterpriseId", brnch.BD_EnterpriseId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BranchDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long AssignSMMEToBranch(BranchDetails brnch)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", brnch.Transactiontype));
            arrParams.Add(new SqlParameter("@BD_Id", brnch.BD_Id));
            arrParams.Add(new SqlParameter("@BD_SmmeId", brnch.BD_SmmeId));
            arrParams.Add(new SqlParameter("@BD_EnterpriseId", brnch.BD_EnterpriseId));
            arrParams.Add(new SqlParameter("@CreatedBy", brnch.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", brnch.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BranchDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long AssignUserToBranch(BranchDetails brnch)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", brnch.Transactiontype));

            arrParams.Add(new SqlParameter("@BD_Id", brnch.BD_Id));

            arrParams.Add(new SqlParameter("@UserId", brnch.UserId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BranchDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long AssignProjectToBranch(BranchDetails brnch)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", brnch.Transactiontype));

            arrParams.Add(new SqlParameter("@BD_Id", brnch.BD_Id));

            arrParams.Add(new SqlParameter("@BWP_ProjectId", brnch.BWP_ProjectId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BranchDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long AssignTaskToSMMEUser(CreateTask entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@TD_Id", entity.TD_Id));
            arrParams.Add(new SqlParameter("@TeamId", entity.TeamId));
            arrParams.Add(new SqlParameter("@Status", entity.Status));
            arrParams.Add(new SqlParameter("@UserId", entity.UserId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "TaskDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long UpdateWhiteListing(EnterpriseRegistration reg)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdateWhiteListing"));
            arrParams.Add(new SqlParameter("@ENR_Logo", reg.ENR_Logo));
            arrParams.Add(new SqlParameter("@ENR_CompanyLogo", reg.ENR_CompanyLogo));
            arrParams.Add(new SqlParameter("@ENR_BussinessDescripton", reg.ENR_BussinessDescripton));
            arrParams.Add(new SqlParameter("@ENR_Id", reg.ENR_Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "EnterpriseRegistration_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertTeamBuildingForEnterprise(BuildTeam entity)
        {

            DataTable Userlist = new DataTable();
            Userlist.Columns.Add("BTU_UserId", typeof(string));
            if (entity.BuildTeamUserList != null)
            {
                foreach (string ent in entity.BuildTeamUserList)
                {
                    DataRow dr = Userlist.NewRow();
                    dr["BTU_UserId"] = ent;
                    Userlist.Rows.Add(dr);
                }
            }

            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            if (entity.BT_Id == 0 || entity.BT_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "InsertTeamForEnterprise"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdateTeamForEnterprise"));

            }
            arrParams.Add(new SqlParameter("@BT_Id", entity.BT_Id));
            arrParams.Add(new SqlParameter("@BT_TeamName", entity.BT_TeamName));
            arrParams.Add(new SqlParameter("@BT_Description", entity.BT_Description));
            arrParams.Add(new SqlParameter("@BT_SMMEId", entity.BT_SMMEId));
            arrParams.Add(new SqlParameter("@BT_ENR_Id", entity.BT_ENR_Id));
            arrParams.Add(new SqlParameter("@BuildTeamUserList", Userlist));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BuildTeam_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long AssignProjectToSMMEUser(ProjectDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@PD_Id", entity.PD_Id));
            arrParams.Add(new SqlParameter("@UWP_MainId", entity.UWP_MainId));
            arrParams.Add(new SqlParameter("@TeamId", entity.TeamId));
            arrParams.Add(new SqlParameter("@Status", entity.Status));
            arrParams.Add(new SqlParameter("@UserId", entity.UserId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertRecordForTaskProgress(TaskProgress entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            arrParams.Add(new SqlParameter("@TP_TaskId", entity.TP_TaskId));

            arrParams.Add(new SqlParameter("@UserId", entity.UserId));
            arrParams.Add(new SqlParameter("@TP_UserType", entity.TP_UserType));
            arrParams.Add(new SqlParameter("@TP_TaskStatus", entity.TP_TaskStatus));
            arrParams.Add(new SqlParameter("@TP_TaskStatusCode", entity.TP_TaskStatusCode));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "TaskProgress_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertRecordForTaskProgressComment(TaskProgress entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "InsertComment"));
            arrParams.Add(new SqlParameter("@TP_TaskId", entity.TP_TaskId));

            arrParams.Add(new SqlParameter("@UserId", entity.UserId));
            arrParams.Add(new SqlParameter("@TPC_Comment", entity.TP_Comments));
            arrParams.Add(new SqlParameter("@TP_TaskStatus", entity.TP_TaskStatus));
            arrParams.Add(new SqlParameter("@TP_TaskStatusCode", entity.TP_TaskStatusCode));
            arrParams.Add(new SqlParameter("@TP_Upload", entity.TP_Upload));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "TaskProgress_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long UpdateUploadTaskStatus(TaskProgress entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdateUploadStatus"));
            arrParams.Add(new SqlParameter("@TPC_Id", entity.TPC_Id));
            arrParams.Add(new SqlParameter("@TP_TaskId", entity.TP_TaskId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "TaskProgress_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateProjectBudget(ProjectBudgetDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dtProjBudget = new DataTable();

            dtProjBudget.Columns.Add("PBD_FundName", typeof(string));
            dtProjBudget.Columns.Add("PBD_Amount", typeof(decimal));
            foreach (var MD in entity.list)
            {

                DataRow dr = dtProjBudget.NewRow();
                dr["PBD_FundName"] = MD.PBD_FundName;
                dr["PBD_Amount"] = MD.PBD_Amount;
                dtProjBudget.Rows.Add(dr);

            }

            arrParams.Add(new SqlParameter("@TransactionType", "Insert"));

            arrParams.Add(new SqlParameter("@ProjectBudgetDetails", dtProjBudget));
            arrParams.Add(new SqlParameter("@PBD_ProjectId", entity.PBD_ProjectId));
            arrParams.Add(new SqlParameter("@PBD_FinancialYearId", entity.PBD_FinancialYearId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectBudgetDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateProjectBudgetFundDetails(ProjectBudgetFundDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dtProjBudget = new DataTable();

            dtProjBudget.Columns.Add("PBFD_FundType", typeof(int));
            dtProjBudget.Columns.Add("PBFD_Enterprise", typeof(int));
            dtProjBudget.Columns.Add("PBFD_Qty", typeof(int));
            dtProjBudget.Columns.Add("PBFD_Amount", typeof(decimal));
            dtProjBudget.Columns.Add("PBFD_TotalAmount", typeof(decimal));
            foreach (var MD in entity.list)
            {

                DataRow dr = dtProjBudget.NewRow();
                dr["PBFD_FundType"] = MD.PBFD_FundType;
                dr["PBFD_Enterprise"] = MD.PBFD_Enterprise;
                dr["PBFD_Qty"] = MD.PBFD_Qty;
                dr["PBFD_Amount"] = MD.PBFD_Amount;
                dr["PBFD_TotalAmount"] = MD.PBFD_TotalAmount;
                dtProjBudget.Rows.Add(dr);

            }

            arrParams.Add(new SqlParameter("@TransactionType", "Insert"));

            arrParams.Add(new SqlParameter("@ProjectBudgetFundDetails", dtProjBudget));
            arrParams.Add(new SqlParameter("@PBFD_ProjectId", entity.PBFD_ProjectId));
            arrParams.Add(new SqlParameter("@PBFD_FinancialYearId", entity.PBFD_FinancialYearId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectBudgetFundDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateBudgetAllocationForActivity(BudgetAllocation entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dtActivity = new DataTable();
            DataTable dtTask = new DataTable();

            dtActivity.Columns.Add("AWB_ActivityId", typeof(int));
            dtActivity.Columns.Add("AWB_ActivityDate", typeof(string));
            dtActivity.Columns.Add("AWB_ActivityDescription", typeof(string));
            dtActivity.Columns.Add("AWB_Budget", typeof(decimal));
            dtActivity.Columns.Add("AWB_BudgetDistId", typeof(int));
            dtActivity.Columns.Add("AWB_FinancialYearId", typeof(int));

            foreach (var MD in entity.ActivityList)
            {

                DataRow dr = dtActivity.NewRow();
                dr["AWB_ActivityId"] = MD.AWB_ActivityId;
                dr["AWB_ActivityDate"] = MD.AWB_ActivityDate;
                dr["AWB_ActivityDescription"] = MD.AWB_ActivityDescription;
                dr["AWB_Budget"] = MD.AWB_Budget;
                dr["AWB_BudgetDistId"] = MD.AWB_BudgetDistId;
                dr["AWB_FinancialYearId"] = MD.AWB_FinancialYearId;
                dtActivity.Rows.Add(dr);

            }

            arrParams.Add(new SqlParameter("@TransactionType", "Insert"));

            arrParams.Add(new SqlParameter("@ActivityWiseBudget", dtActivity));
            arrParams.Add(new SqlParameter("@ProjectId", entity.ProjectId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BudgetAllocation_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateBudgetAllocationForTask(BudgetAllocation entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dtTask = new DataTable();

            dtTask.Columns.Add("TWB_TaskId", typeof(int));
            dtTask.Columns.Add("TWB_TaskDate", typeof(string));
            dtTask.Columns.Add("TWB_TaskDescription", typeof(string));
            dtTask.Columns.Add("TWB_Budget", typeof(decimal));
            dtTask.Columns.Add("TWB_BudgetDistId", typeof(int));
            dtTask.Columns.Add("TWB_ActivityId", typeof(int));
            dtTask.Columns.Add("TWB_FinancialYearId", typeof(int));

            foreach (var MD in entity.TaskList)
            {

                DataRow dr = dtTask.NewRow();
                dr["TWB_TaskId"] = MD.TWB_TaskId;
                dr["TWB_TaskDate"] = MD.TWB_TaskDate;
                dr["TWB_TaskDescription"] = MD.TWB_TaskDescription;
                dr["TWB_Budget"] = MD.TWB_Budget;
                dr["TWB_BudgetDistId"] = MD.TWB_BudgetDistId;
                dr["TWB_ActivityId"] = MD.TWB_ActivityId;
                dr["TWB_FinancialYearId"] = MD.TWB_FinancialYearId;
                dtTask.Rows.Add(dr);

            }

            arrParams.Add(new SqlParameter("@TransactionType", "InsertTaskBudget"));

            arrParams.Add(new SqlParameter("@TaskWiseBudget", dtTask));
            arrParams.Add(new SqlParameter("@ProjectId", entity.ProjectId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BudgetAllocation_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateBudgetAllocationForSMME(BudgetAllocation entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            DataTable dtSMME = new DataTable();

            dtSMME.Columns.Add("SWB_SMMEId", typeof(int));
            dtSMME.Columns.Add("SWB_SMMEDate", typeof(string));
            dtSMME.Columns.Add("SWB_SMMEDescription", typeof(string));
            dtSMME.Columns.Add("SWB_Budget", typeof(decimal));
            dtSMME.Columns.Add("SWB_BudgetDistId", typeof(int));
            dtSMME.Columns.Add("SWB_ActivityId", typeof(int));
            dtSMME.Columns.Add("SWB_TaskId", typeof(int));
            dtSMME.Columns.Add("SWB_FinancialYearId", typeof(int));

            foreach (var MD in entity.SMMEWiseBudgetList)
            {
                DataRow dr = dtSMME.NewRow();
                dr["SWB_SMMEId"] = MD.SWB_SMMEId;
                dr["SWB_SMMEDate"] = MD.SWB_SMMEDate;
                dr["SWB_SMMEDescription"] = MD.SWB_SMMEDescription;
                dr["SWB_Budget"] = MD.SWB_Budget;
                dr["SWB_BudgetDistId"] = MD.SWB_BudgetDistId;
                dr["SWB_ActivityId"] = MD.SWB_ActivityId;
                dr["SWB_TaskId"] = MD.SWB_TaskId;
                dr["SWB_FinancialYearId"] = MD.SWB_FinancialYearId;
                dtSMME.Rows.Add(dr);

            }

            arrParams.Add(new SqlParameter("@TransactionType", "InsertSMMEBudget"));

            arrParams.Add(new SqlParameter("@SMMEWiseBudget", dtSMME));
            arrParams.Add(new SqlParameter("@ProjectId", entity.ProjectId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BudgetAllocation_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateBudgetAllocationForSMMEExpenditure(BudgetAllocation entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            DataTable dtSMMEExpenditure = new DataTable();

            dtSMMEExpenditure.Columns.Add("EWB_SMMEId", typeof(int));
            dtSMMEExpenditure.Columns.Add("EWB_ExpenditureDate", typeof(string));
            dtSMMEExpenditure.Columns.Add("EWB_ExpenditureDescription", typeof(string));
            dtSMMEExpenditure.Columns.Add("EWB_Budget", typeof(decimal));
            dtSMMEExpenditure.Columns.Add("EWB_ExpenditureBudget", typeof(decimal));
            dtSMMEExpenditure.Columns.Add("EWB_BudgetDistId", typeof(int));
            dtSMMEExpenditure.Columns.Add("EWB_ActivityId", typeof(int));
            dtSMMEExpenditure.Columns.Add("EWB_TaskId", typeof(int));
            dtSMMEExpenditure.Columns.Add("EWB_FinancialYearId", typeof(int));

            foreach (var MD in entity.ExpenditureWiseBudgetList)
            {

                DataRow dr = dtSMMEExpenditure.NewRow();
                dr["EWB_SMMEId"] = MD.EWB_SMMEId;
                dr["EWB_ExpenditureDate"] = MD.EWB_ExpenditureDate;
                dr["EWB_ExpenditureDescription"] = MD.EWB_ExpenditureDescription;
                dr["EWB_Budget"] = MD.EWB_Budget;
                dr["EWB_ExpenditureBudget"] = MD.EWB_ExpenditureBudget;
                dr["EWB_BudgetDistId"] = MD.EWB_BudgetDistId;
                dr["EWB_ActivityId"] = MD.EWB_ActivityId;
                dr["EWB_TaskId"] = MD.EWB_TaskId;
                dr["EWB_FinancialYearId"] = MD.EWB_FinancialYearId;
                dtSMMEExpenditure.Rows.Add(dr);

            }

            arrParams.Add(new SqlParameter("@TransactionType", "InsertSMMEBudgetExpenditure"));

            arrParams.Add(new SqlParameter("@SMMWiseExpenditure", dtSMMEExpenditure));
            arrParams.Add(new SqlParameter("@ProjectId", entity.ProjectId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BudgetAllocation_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateProjectWiseDocument(ProjectWiseDocument entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            arrParams.Add(new SqlParameter("@PWD_DocumentName", entity.PWD_DocumentName));
            arrParams.Add(new SqlParameter("@PWD_DocumentDec", entity.PWD_DocumentDec));
            arrParams.Add(new SqlParameter("@PWD_Document", entity.PWD_Document));
            arrParams.Add(new SqlParameter("@PWD_ProjectId", entity.PWD_ProjectId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectWiseDocument_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertUpdateUser(UserModel entity)
        {
            DataTable List = new DataTable();
            List.Columns.Add("MenuId", typeof(int));
            foreach (var MD in entity.mainmenuList)
            {
                if (MD.MenuId != null)
                {
                    DataRow dr = List.NewRow();
                    dr["MenuId"] = MD.MenuId;
                    List.Rows.Add(dr);
                }
            }
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "InsertMenu"));

            arrParams.Add(new SqlParameter("@UM_Id", entity.UserID));

            arrParams.Add(new SqlParameter("@MenuFor", entity.Role));

            arrParams.Add(new SqlParameter("@MenuPermission", List));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            var val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long EnterpriseUserPhotoUpdate(UserModel entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdatePhoto"));
            arrParams.Add(new SqlParameter("@UM_Id", entity.UM_Id));
            arrParams.Add(new SqlParameter("@UM_ProfilePic", entity.UM_ProfilePic));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long EnterpriseDocUpdateForJob(JobDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdateJobDocument"));
            arrParams.Add(new SqlParameter("@JD_Id", entity.JD_Id));
            arrParams.Add(new SqlParameter("@JD_Document", entity.JD_Document));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobDetails_USP", arrParams.ToArray());

            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long CustomerPhotoUpdate(CustomerDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            DataTable dt = new DataTable();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdatePhoto"));
            arrParams.Add(new SqlParameter("@CD_Id", entity.CD_Id));
            arrParams.Add(new SqlParameter("@CD_ProfilePic", entity.CD_ProfilePic));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "CustomerDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertAdminUserFromAdmin(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            if (User.UM_Id > 0)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdateAdminUser"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "InsertAdminUser"));
            }
            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_FirstName", User.UM_FirstName));
            arrParams.Add(new SqlParameter("@UM_LastName", User.UM_LastName));
            arrParams.Add(new SqlParameter("@UM_MainID", User.ENR_Id));
            arrParams.Add(new SqlParameter("@UM_Role", User.UM_Role));
            arrParams.Add(new SqlParameter("@UM_SubRole", User.UM_SubRole));
            arrParams.Add(new SqlParameter("@UM_SubRoleId", User.UM_SubRoleId));
            arrParams.Add(new SqlParameter("@UM_ContactNo", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UM_EmailId", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Login", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Password", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UserId", User.UserID));
            arrParams.Add(new SqlParameter("@UM_ProfilePic", User.UM_ProfilePic));
            arrParams.Add(new SqlParameter("@UM_Gender", User.UM_Gender));
            arrParams.Add(new SqlParameter("@UM_Age", User.UM_Age));
            arrParams.Add(new SqlParameter("@CreatedBy", User.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", User.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertSMMEUser(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            if (User.UM_Id > 0)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdateSMMEUser"));
            }
            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "InsertSMMEUser"));
            }
            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_FirstName", User.UM_FirstName));
            arrParams.Add(new SqlParameter("@UM_LastName", User.UM_LastName));
            arrParams.Add(new SqlParameter("@UM_MainID", User.UM_MainID));
            arrParams.Add(new SqlParameter("@UM_Role", User.UM_Role));
            arrParams.Add(new SqlParameter("@UM_SubRole", User.UM_SubRole));
            arrParams.Add(new SqlParameter("@UM_SubRoleId", User.UM_SubRoleId));
            arrParams.Add(new SqlParameter("@UM_ContactNo", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UM_EmailId", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Login", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Password", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UserId", User.UserID));
            arrParams.Add(new SqlParameter("@UM_ProfilePic", User.UM_ProfilePic));
            arrParams.Add(new SqlParameter("@UM_Gender", User.UM_Gender));
            arrParams.Add(new SqlParameter("@UM_Age", User.UM_Age));

            arrParams.Add(new SqlParameter("@CreatedBy", User.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", User.UpdatedBy));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public long InsertCostManagement(CostManagement entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            if (entity.CM_Id == 0 || entity.CM_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }

            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));

            }
            arrParams.Add(new SqlParameter("@CM_Id", entity.CM_Id));
            arrParams.Add(new SqlParameter("@CM_Charge", entity.CM_Charge));
            arrParams.Add(new SqlParameter("@CM_Name", entity.CM_Name));
            arrParams.Add(new SqlParameter("@CM_Type", entity.CM_Type));
            arrParams.Add(new SqlParameter("@CM_SMMEId", entity.CM_SMMEId));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "CostManagement_USP", arrParams.ToArray());
            var val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertJobInvoice(JobInvoice entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            DataTable dt = new DataTable();

            dt.Columns.Add("JIT_JI_CostType", typeof(int));
            dt.Columns.Add("JIT_Cost", typeof(decimal));
            dt.Columns.Add("JIT_Qty", typeof(int));
            dt.Columns.Add("JIT_TotalCost", typeof(decimal));
            dt.Columns.Add("JIT_Note", typeof(string));

            foreach (var MD in entity.JobInvoiceTransactionList)
            {

                DataRow dr = dt.NewRow();
                dr["JIT_JI_CostType"] = Convert.ToInt32(MD.JIT_JI_CostType);
                dr["JIT_Cost"] = Convert.ToDecimal(MD.JIT_Cost);
                dr["JIT_Qty"] = MD.JIT_Qty;
                dr["JIT_TotalCost"] = MD.JIT_TotalCost;
                dr["JIT_Note"] = "";
                dt.Rows.Add(dr);

            }
            if (entity.JI_Id == 0 || entity.JI_Id == null)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            }

            else
            {
                arrParams.Add(new SqlParameter("@TransactionType", "Update"));

            }

            arrParams.Add(new SqlParameter("@JI_Id", entity.JI_Id));
            arrParams.Add(new SqlParameter("@JI_SMMEId", entity.JI_SMMEId));
            arrParams.Add(new SqlParameter("@JI_InvoiceDate", entity.JI_InvoiceDate));
            arrParams.Add(new SqlParameter("@JI_JobId", entity.JI_JobId));
            arrParams.Add(new SqlParameter("@JI_CustId", entity.JI_CustId));
            arrParams.Add(new SqlParameter("@UserId", entity.UserId));
            arrParams.Add(new SqlParameter("@JI_Note", entity.JI_Note));
            arrParams.Add(new SqlParameter("@JI_PaymentMode", entity.JI_PaymentMode));
            arrParams.Add(new SqlParameter("@JI_Total", entity.JI_Total));
            arrParams.Add(new SqlParameter("@JI_ChildId", entity.JI_ChildId));
            arrParams.Add(new SqlParameter("@JI_JobType", entity.JI_JobType));
            arrParams.Add(new SqlParameter("@JobInvoiceTransactionList", dt));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "JobInvoice_USP", arrParams.ToArray());
            var val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public UserModel GetUserLoginForWhitelisting(int? Id)
        {

            UserModel UserObj = new UserModel();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "SelectUserForEnterprise"));
            arrParams.Add(new SqlParameter("@UM_MainID", Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    UserObj.UserID = Convert.ToInt32(rdr["UM_Id"]);
                    UserObj.UserName = Convert.ToString(rdr["UM_Name"]);
                    UserObj.UM_MainID = Convert.ToInt32(rdr["UM_MainID"]);
                    UserObj.CompanyName = Convert.ToString(rdr["CM_Name"]);
                    UserObj.UM_Role = Convert.ToString(rdr["UM_Role"]);
                    UserObj.UM_SubRole = Convert.ToString(rdr["UM_SubRole"]);
                    UserObj.UM_Active = Convert.ToInt32(rdr["UM_Active"]);
                    UserObj.UM_ContactNo = Convert.ToString(rdr["UM_ContactNo"]);
                    UserObj.UM_EmailId = Convert.ToString(rdr["UM_EmailId"]);
                    UserObj.UM_Password = Convert.ToString(rdr["UM_Password"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);
                    UserObj.UM_ProfilePic = Convert.ToString(rdr["UM_ProfilePic"]);
                    UserObj.UM_Prefix = Convert.ToString(rdr["UM_Prefix"]);
                    UserObj.UM_Status = Convert.ToInt32(rdr["UM_Status"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CompanyPic = Convert.ToString(rdr["UM_CompanyPic"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);

                    UserObj.ThemeColor = Convert.ToString(rdr["UM_ThemeColor"]);
                    UserObj.ThemeStyle = Convert.ToString(rdr["UM_ThemeStyle"]);
                    UserObj.TheamLink = Convert.ToString(rdr["UM_TheamLink"]);
                    UserObj.CoreLink = Convert.ToString(rdr["UM_CoreLink"]);
                    UserObj.CustomCSSLink = Convert.ToString(rdr["UM_CustomCSSLink"]);

                }
                rdr.Close();
            }
            rdr.Dispose();
            return UserObj;

        }
        public UserModel GetUserLoginForInactiveWhitelisting(int? Id)
        {

            UserModel UserObj = new UserModel();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "SelectUserForInactiveEnterprise"));
            arrParams.Add(new SqlParameter("@UM_MainID", Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    UserObj.UserID = Convert.ToInt32(rdr["UM_Id"]);
                    UserObj.UserName = Convert.ToString(rdr["UM_Name"]);
                    UserObj.UM_MainID = Convert.ToInt32(rdr["UM_MainID"]);
                    UserObj.CompanyName = Convert.ToString(rdr["CM_Name"]);
                    UserObj.UM_Role = Convert.ToString(rdr["UM_Role"]);
                    UserObj.UM_SubRole = Convert.ToString(rdr["UM_SubRole"]);
                    UserObj.UM_Active = Convert.ToInt32(rdr["UM_Active"]);
                    UserObj.UM_ContactNo = Convert.ToString(rdr["UM_ContactNo"]);
                    UserObj.UM_EmailId = Convert.ToString(rdr["UM_EmailId"]);
                    UserObj.UM_Password = Convert.ToString(rdr["UM_Password"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);
                    UserObj.UM_ProfilePic = Convert.ToString(rdr["UM_ProfilePic"]);
                    UserObj.UM_Prefix = Convert.ToString(rdr["UM_Prefix"]);
                    UserObj.UM_Status = Convert.ToInt32(rdr["UM_Status"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CompanyPic = Convert.ToString(rdr["UM_CompanyPic"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);

                    UserObj.ThemeColor = Convert.ToString(rdr["UM_ThemeColor"]);
                    UserObj.ThemeStyle = Convert.ToString(rdr["UM_ThemeStyle"]);
                    UserObj.TheamLink = Convert.ToString(rdr["UM_TheamLink"]);
                    UserObj.CoreLink = Convert.ToString(rdr["UM_CoreLink"]);
                    UserObj.CustomCSSLink = Convert.ToString(rdr["UM_CustomCSSLink"]);

                }
                rdr.Close();
            }
            rdr.Dispose();
            return UserObj;

        }

        public UserModel GetUSMMELoginForAfterReg(int? Id)
        {

            UserModel UserObj = new UserModel();
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "SelectUserForEnterprise"));
            arrParams.Add(new SqlParameter("@UM_MainID", Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    UserObj.UserID = Convert.ToInt32(rdr["UM_Id"]);
                    UserObj.UserName = Convert.ToString(rdr["UM_Name"]);
                    UserObj.UM_MainID = Convert.ToInt32(rdr["UM_MainID"]);
                    UserObj.CompanyName = Convert.ToString(rdr["CM_Name"]);
                    UserObj.UM_Role = Convert.ToString(rdr["UM_Role"]);
                    UserObj.UM_SubRole = Convert.ToString(rdr["UM_SubRole"]);
                    UserObj.UM_Active = Convert.ToInt32(rdr["UM_Active"]);
                    UserObj.UM_ContactNo = Convert.ToString(rdr["UM_ContactNo"]);
                    UserObj.UM_EmailId = Convert.ToString(rdr["UM_EmailId"]);
                    UserObj.UM_Password = Convert.ToString(rdr["UM_Password"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);
                    UserObj.UM_ProfilePic = Convert.ToString(rdr["UM_ProfilePic"]);
                    UserObj.UM_Prefix = Convert.ToString(rdr["UM_Prefix"]);
                    UserObj.UM_Status = Convert.ToInt32(rdr["UM_Status"]);
                    UserObj.UM_Address = Convert.ToString(rdr["UM_Address"]);
                    UserObj.UM_CompanyPic = Convert.ToString(rdr["UM_CompanyPic"]);
                    UserObj.UM_CmnyPrefix = Convert.ToString(rdr["UM_CmnyPrefix"]);

                    UserObj.ThemeColor = Convert.ToString(rdr["UM_ThemeColor"]);
                    UserObj.ThemeStyle = Convert.ToString(rdr["UM_ThemeStyle"]);
                    UserObj.TheamLink = Convert.ToString(rdr["UM_TheamLink"]);
                    UserObj.CoreLink = Convert.ToString(rdr["UM_CoreLink"]);
                    UserObj.CustomCSSLink = Convert.ToString(rdr["UM_CustomCSSLink"]);

                }
                rdr.Close();
            }
            rdr.Dispose();
            return UserObj;

        }
        public Tuple<string, int> InsertBulkSMMEForAdmin(DataTable dt)
        {
            string OutPutmsg;
            int OutPutId;
            SqlConnection conn = new SqlConnection();
            SqlCommand cmd = new SqlCommand();
            conn.ConnectionString = ConfigurationManager.ConnectionStrings["ConStr"].ConnectionString;
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "SMMERegistrationBulk_USP";
            cmd.Parameters.AddWithValue("@TransactionType", "InsertBulkSMME");
            cmd.Parameters.AddWithValue("@SMMERegistrationBulk", dt);

            cmd.Parameters.Add("@OutPutMsg", SqlDbType.VarChar, 500);
            cmd.Parameters["@OutPutMsg"].Direction = ParameterDirection.Output;
            cmd.Parameters.Add("@OutPutId", SqlDbType.Int);
            cmd.Parameters["@OutPutId"].Direction = ParameterDirection.Output;

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            OutPutmsg = Convert.ToString(cmd.Parameters["@OutPutMsg"].Value);
            OutPutId = Convert.ToInt32(cmd.Parameters["@OutPutId"].Value);

            return new Tuple<string, int>(OutPutmsg, OutPutId);
        }
        public Tuple<string, int> InsertBulkSMMEForEnterprise(DataTable dt, int? EnrId)
        {
            string OutPutmsg;
            int OutPutId;
            SqlConnection conn = new SqlConnection();
            SqlCommand cmd = new SqlCommand();
            conn.ConnectionString = ConfigurationManager.ConnectionStrings["ConStr"].ConnectionString;
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "SMMEBulkForEnterPrise_USP";
            cmd.Parameters.AddWithValue("@TransactionType", "InsertBulkSMME");
            cmd.Parameters.AddWithValue("@SMMERegistrationBulk", dt);
            cmd.Parameters.AddWithValue("@EnrId", EnrId);

            cmd.Parameters.Add("@OutPutMsg", SqlDbType.VarChar, 500);
            cmd.Parameters["@OutPutMsg"].Direction = ParameterDirection.Output;
            cmd.Parameters.Add("@OutPutId", SqlDbType.Int);
            cmd.Parameters["@OutPutId"].Direction = ParameterDirection.Output;

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            OutPutmsg = Convert.ToString(cmd.Parameters["@OutPutMsg"].Value);
            OutPutId = Convert.ToInt32(cmd.Parameters["@OutPutId"].Value);

            return new Tuple<string, int>(OutPutmsg, OutPutId);
        }

        public Tuple<string, int> AssessmentAnswerUpload(DataTable parentDt, DataTable childDt)
        {
            string OutPutmsg;
            int OutPutId;

            SqlConnection conn = new SqlConnection();
            SqlCommand cmd = new SqlCommand();
            conn.ConnectionString = ConfigurationManager.ConnectionStrings["ConStr"].ConnectionString;
            cmd.Connection = conn;

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "AssessmentAnswerByExcel_USP";

            cmd.Parameters.AddWithValue("@TransactionType", "InsertFinal");
            cmd.Parameters.AddWithValue("@ParentAssessment", parentDt);
            cmd.Parameters.AddWithValue("@ChildAssessment", childDt);

            cmd.Parameters.Add("@OutPutMsg", SqlDbType.VarChar, 500);
            cmd.Parameters["@OutPutMsg"].Direction = ParameterDirection.Output;

            cmd.Parameters.Add("@OutPutId", SqlDbType.Int);
            cmd.Parameters["@OutPutId"].Direction = ParameterDirection.Output;

            try
            {
                conn.Open();
                int i = cmd.ExecuteNonQuery();

                OutPutmsg = Convert.ToString(cmd.Parameters["@OutPutMsg"].Value);
                OutPutId = Convert.ToInt32(cmd.Parameters["@OutPutId"].Value);
            }
            catch (Exception ex)
            {
                throw;  // Or use a more specific exception handling strategy
            }
            finally
            {
                conn.Close();
            }

            return new Tuple<string, int>(OutPutmsg, OutPutId);
        }

        public long UpdateEnterpriseChatStatus(UserModel entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "UpdateEnterpriseChatStatus"));
            arrParams.Add(new SqlParameter("@US_UserId", entity.US_UserId));
            arrParams.Add(new SqlParameter("@US_Availability", entity.US_Availability));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserChat_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public string GetUserStatus(int userId)
        {
            string userStatus = null;
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "SelectEnterpriseChatStatus"));
            arrParams.Add(new SqlParameter("@US_UserId", userId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserChat_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    userStatus = rdr["US_Availability"].ToString();
                }
            }

            return userStatus;
        }

        public long InsertUpdateEnterpriseChatting(UserModel entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "CreateChat"));
            arrParams.Add(new SqlParameter("@UC_Id", entity.UC_Id));
            arrParams.Add(new SqlParameter("@UC_UCC_Id", entity.UC_UCC_Id));
            arrParams.Add(new SqlParameter("@UC_UserId", entity.UCC_CreatedId));
            arrParams.Add(new SqlParameter("@UCC_ChatReciver", entity.UCC_ChatReciver));
            arrParams.Add(new SqlParameter("@UC_Msg", entity.UC_Msg));
            arrParams.Add(new SqlParameter("@UC_File", entity.UC_File));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserChat_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long AssignProjectToStakeholder(ProjectDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@PWS_Id", entity.PWS_Id));
            arrParams.Add(new SqlParameter("@PWS_ProjectId", entity.PWS_ProjectId));
            arrParams.Add(new SqlParameter("@PWS_EnterpriseId", entity.PWS_EnterpriseId));
            arrParams.Add(new SqlParameter("@PWS_StakeholderId", entity.PWS_StakeholderId));
            arrParams.Add(new SqlParameter("@PWS_StakeholderTypeId", entity.PWS_StakeholderTypeId));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long AssignSMMEToStakeholder(SMMERegistration entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@SWS_Id", entity.SWS_Id));
            arrParams.Add(new SqlParameter("@SWS_SMMEId", entity.SWS_SMMEId));
            arrParams.Add(new SqlParameter("@SWS_EnterpriseId", entity.SWS_EnterpriseId));
            arrParams.Add(new SqlParameter("@SWS_StakeholderId", entity.SWS_StakeholderId));
            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long AssignJobToStakeholder(JobDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@SWJ_Id", entity.SWJ_Id));
            arrParams.Add(new SqlParameter("@SWJ_JobId", entity.SWJ_JobId));
            arrParams.Add(new SqlParameter("@SWJ_EnterpriseId", entity.SWJ_EnterpriseId));
            arrParams.Add(new SqlParameter("@SWJ_StakeholderId", entity.SWJ_StakeholderId));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long AssignAssessmentToStakeholder(BuildAssessmentSetUp entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@SWA_Id", entity.SWA_Id));
            arrParams.Add(new SqlParameter("@SWA_AssessmentId", entity.SWA_AssessmentId));
            arrParams.Add(new SqlParameter("@SWA_EnterpriseId", entity.SWA_EnterpriseId));
            arrParams.Add(new SqlParameter("@SWA_StakeholderId", entity.SWA_StakeholderId));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long ManagePermissionForStakeholder(ProjectDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "PermissionForStakeholder"));

            arrParams.Add(new SqlParameter("@PSP_Id", entity.PSP_Id));
            arrParams.Add(new SqlParameter("@PSP_StakeHolderId", entity.PSP_StakeHolderId));
            arrParams.Add(new SqlParameter("@PSP_ALL", entity.PSP_ALL));
            arrParams.Add(new SqlParameter("@PSP_Task", entity.PSP_Task));
            arrParams.Add(new SqlParameter("@PSP_Activity", entity.PSP_Activity));
            arrParams.Add(new SqlParameter("@PSP_Budget", entity.PSP_Budget));
            arrParams.Add(new SqlParameter("@PSP_Flies", entity.PSP_Flies));
            arrParams.Add(new SqlParameter("@PSP_ProjectId", entity.PSP_ProjectId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
        public AdminReport GetAdminReport(AdminReport rpt)
        {
            AdminReport AdminRpt = new AdminReport
            {
                EnterpriseList = new List<AdminReport.EnterpriseDetails>()
            };
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "SelectAdminDashBoardReport"));

            arrParams.Add(new SqlParameter("@CountryId", rpt.CountryId));
            arrParams.Add(new SqlParameter("@ProvinceId", rpt.ProvinceId));
            arrParams.Add(new SqlParameter("@BusinessTypeId", rpt.BusinessTypeId));
            arrParams.Add(new SqlParameter("@IndustrySectorId", rpt.IndustrySectorId));
            arrParams.Add(new SqlParameter("@LegalEntityTypeId", rpt.LegalEntityTypeId));
            arrParams.Add(new SqlParameter("@ProtfolioGrowthId", rpt.ProtfolioGrowthId));
            arrParams.Add(new SqlParameter("@JobCategoryId", rpt.JobCategoryId));
            arrParams.Add(new SqlParameter("@CustomerTypeId", rpt.CustomerTypeId));
            arrParams.Add(new SqlParameter("@VisitType", rpt.VisitType));
            arrParams.Add(new SqlParameter("@BudgetTypeId", rpt.BudgetTypeId));

            arrParams.Add(new SqlParameter("@FromDate", rpt.FromDate));
            arrParams.Add(new SqlParameter("@ToDate", rpt.ToDate));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "AdminReport_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    AdminRpt.TotalEnterprise = Convert.ToInt32(rdr["TotalEnterprise"]);
                    AdminRpt.TotalPendingEnterprise = Convert.ToInt32(rdr["TotalPendingEnterprise"]);
                    AdminRpt.TotalActiveEnterprise = Convert.ToInt32(rdr["TotalActiveEnterprise"]);
                    AdminRpt.TotalCompletedEnterprise = Convert.ToInt32(rdr["TotalCompletedEnterprise"]);

                    AdminRpt.TotalSMME = Convert.ToInt32(rdr["TotalSMME"]);
                    AdminRpt.TotalPendingSMME = Convert.ToInt32(rdr["TotalPendingSMME"]);
                    AdminRpt.TotalActiveSMME = Convert.ToInt32(rdr["TotalActiveSMME"]);
                    AdminRpt.TotalCompletedSMME = Convert.ToInt32(rdr["TotalCompletedSMME"]);

                    AdminRpt.TotalCustomer = Convert.ToInt32(rdr["TotalCustomer"]);
                    AdminRpt.TotalActiveCustomer = Convert.ToInt32(rdr["TotalActiveCustomer"]);
                    AdminRpt.TotalDeactiveCustomer = Convert.ToInt32(rdr["TotalDeactiveCustomer"]);
                    AdminRpt.TotalPendingCustomer = Convert.ToInt32(rdr["TotalPendingCustomer"]);

                    AdminRpt.TotalActivity = Convert.ToInt32(rdr["TotalActivity"]);
                    AdminRpt.TotalPendingActivity = Convert.ToInt32(rdr["TotalPendingActivity"]);
                    AdminRpt.TotalActiveActivity = Convert.ToInt32(rdr["TotalActiveActivity"]);
                    AdminRpt.TotalCompletedActivity = Convert.ToInt32(rdr["TotalCompletedActivity"]);

                    AdminRpt.TotalProject = Convert.ToInt32(rdr["TotalProject"]);
                    AdminRpt.TotalActiveProject = Convert.ToInt32(rdr["TotalActiveProject"]);
                    AdminRpt.TotalPendingProject = Convert.ToInt32(rdr["TotalPendingProject"]);
                    AdminRpt.TotalCompletedProject = Convert.ToInt32(rdr["TotalCompletedProject"]);

                    AdminRpt.TotalAssesment = Convert.ToInt32(rdr["TotalAssesment"]);
                    AdminRpt.TotalActiveAssesment = Convert.ToInt32(rdr["TotalActiveAssesment"]);
                    AdminRpt.TotalPendingAssesment = Convert.ToInt32(rdr["TotalPendingAssesment"]);
                    AdminRpt.TotalCompletedAssesment = Convert.ToInt32(rdr["TotalCompletedAssesment"]);

                    AdminRpt.TotalJOB = Convert.ToInt32(rdr["TotalJOB"]);
                    AdminRpt.TotalCompletedJOB = Convert.ToInt32(rdr["TotalCompletedJOB"]);
                    AdminRpt.TotalOpenJOB = Convert.ToInt32(rdr["TotalOpenJOB"]);
                    AdminRpt.TotalProgressJOB = Convert.ToInt32(rdr["TotalProgressJOB"]);

                    AdminRpt.TotalTask = Convert.ToInt32(rdr["TotalTask"]);
                    AdminRpt.TotalCompletedTask = Convert.ToInt32(rdr["TotalCompletedTask"]);
                    AdminRpt.TotalOpenTask = Convert.ToInt32(rdr["TotalOpenTask"]);
                    AdminRpt.TotalProgressTask = Convert.ToInt32(rdr["TotalProgressTask"]);

                    AdminRpt.TotalBudget = Convert.ToDouble(rdr["TotalBudget"]);
                    AdminRpt.TotalSMMEWiseBudget = Convert.ToDouble(rdr["TotalSMMEWiseBudget"]);
                    AdminRpt.TotalActivityWiseBudget = Convert.ToDouble(rdr["TotalActivityWiseBudget"]);
                    AdminRpt.TotalTaskWiseBudget = Convert.ToDouble(rdr["TotalTaskWiseBudget"]);
                }
            }

            if (rdr.NextResult())
            {
                while (rdr.Read())
                {
                    AdminReport.EnterpriseDetails details = new AdminReport.EnterpriseDetails
                    {
                        ENR_Id = rdr["ENR_Id"] != DBNull.Value ? Convert.ToInt32(rdr["ENR_Id"]) : 0,
                        ENR_CompanyName = rdr["ENR_CompanyName"]?.ToString() ?? string.Empty,
                        ENR_RegNumber = rdr["ENR_RegNumber"]?.ToString() ?? string.Empty,
                        SM_SectorName = rdr["SM_SectorName"]?.ToString() ?? string.Empty,
                        ENR_Active = rdr["ENR_Active"]?.ToString() ?? string.Empty,
                        ENR_Class = rdr["ENR_Class"]?.ToString() ?? string.Empty,
                        ETM_EnterpriseType = rdr["ETM_EnterpriseType"]?.ToString() ?? string.Empty,
                        ENR_PrimaryContactNo = rdr["ENR_PrimaryContactNo"]?.ToString() ?? string.Empty,
                        ENR_PrimaryContactEmail = rdr["ENR_PrimaryContactEmail"]?.ToString() ?? string.Empty,
                        ENR_Logo = rdr["ENR_Logo"]?.ToString() ?? string.Empty,
                    };

                    AdminRpt.EnterpriseList.Add(details);
                }
            }

            return AdminRpt;
        }

        public long UpdateProjectIsCompleted(ProjectDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "UpdateProjectIsCompleted"));

            arrParams.Add(new SqlParameter("@PD_Id", entity.PD_Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "ProjectDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public AdminReport GetAdminReportForEnterpriseList(AdminReport rpt)
        {
            AdminReport AdminRpt = new AdminReport
            {
                EnterpriseList = new List<AdminReport.EnterpriseDetails>()
            };
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "SelectEnterpriseListForReport"));

            arrParams.Add(new SqlParameter("@ENR_Id", rpt.ENR_Id));

            arrParams.Add(new SqlParameter("@CountryId", rpt.CountryId));
            arrParams.Add(new SqlParameter("@ProvinceId", rpt.ProvinceId));
            arrParams.Add(new SqlParameter("@BusinessTypeId", rpt.BusinessTypeId));
            arrParams.Add(new SqlParameter("@IndustrySectorId", rpt.IndustrySectorId));
            arrParams.Add(new SqlParameter("@LegalEntityTypeId", rpt.LegalEntityTypeId));
            arrParams.Add(new SqlParameter("@ProtfolioGrowthId", rpt.ProtfolioGrowthId));
            arrParams.Add(new SqlParameter("@JobCategoryId", rpt.JobCategoryId));
            arrParams.Add(new SqlParameter("@CustomerTypeId", rpt.CustomerTypeId));
            arrParams.Add(new SqlParameter("@VisitType", rpt.VisitType));
            arrParams.Add(new SqlParameter("@BudgetTypeId", rpt.BudgetTypeId));

            arrParams.Add(new SqlParameter("@FromDate", rpt.FromDate));
            arrParams.Add(new SqlParameter("@ToDate", rpt.ToDate));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "AdminReport_USP", arrParams.ToArray());
            if (rdr != null)
            {
                while (rdr.Read())
                {
                    AdminReport.EnterpriseDetails details = new AdminReport.EnterpriseDetails
                    {
                        ENR_Id = rdr["ENR_Id"] != DBNull.Value ? Convert.ToInt32(rdr["ENR_Id"]) : 0,
                        ENR_CompanyName = rdr["ENR_CompanyName"]?.ToString() ?? string.Empty,
                        ENR_RegNumber = rdr["ENR_RegNumber"]?.ToString() ?? string.Empty,
                        SM_SectorName = rdr["SM_SectorName"]?.ToString() ?? string.Empty,
                        ENR_Active = rdr["ENR_Active"]?.ToString() ?? string.Empty,
                        ENR_Class = rdr["ENR_Class"]?.ToString() ?? string.Empty,
                        ETM_EnterpriseType = rdr["ETM_EnterpriseType"]?.ToString() ?? string.Empty,
                        ENR_PrimaryContactNo = rdr["ENR_PrimaryContactNo"]?.ToString() ?? string.Empty,
                        ENR_PrimaryContactEmail = rdr["ENR_PrimaryContactEmail"]?.ToString() ?? string.Empty,
                        ENR_Logo = rdr["ENR_Logo"]?.ToString() ?? string.Empty,
                        ENR_IncorporationDate = rdr["ENR_IncorporationDate"] != DBNull.Value ? (DateTime?)Convert.ToDateTime(rdr["ENR_IncorporationDate"]) : null
                    };

                    AdminRpt.EnterpriseList.Add(details);
                }
            }
            return AdminRpt;
        }

        public AdminReport GetAdminReportForSMMEList(AdminReport rpt)
        {
            AdminReport AdminRpt = new AdminReport
            {
                SMMEList = new List<AdminReport.SMMEDetails>()
            };

            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "SelectSMMEListForReport"));
            arrParams.Add(new SqlParameter("@ENR_Id", rpt.ENR_Id));
            arrParams.Add(new SqlParameter("@CountryId", rpt.CountryId));
            arrParams.Add(new SqlParameter("@ProvinceId", rpt.ProvinceId));
            arrParams.Add(new SqlParameter("@BusinessTypeId", rpt.BusinessTypeId));
            arrParams.Add(new SqlParameter("@IndustrySectorId", rpt.IndustrySectorId));
            arrParams.Add(new SqlParameter("@LegalEntityTypeId", rpt.LegalEntityTypeId));
            arrParams.Add(new SqlParameter("@ProtfolioGrowthId", rpt.ProtfolioGrowthId));
            arrParams.Add(new SqlParameter("@JobCategoryId", rpt.JobCategoryId));
            arrParams.Add(new SqlParameter("@CustomerTypeId", rpt.CustomerTypeId));
            arrParams.Add(new SqlParameter("@VisitType", rpt.VisitType));
            arrParams.Add(new SqlParameter("@BudgetTypeId", rpt.BudgetTypeId));
            arrParams.Add(new SqlParameter("@FromDate", rpt.FromDate));
            arrParams.Add(new SqlParameter("@ToDate", rpt.ToDate));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "AdminReport_USP", arrParams.ToArray());
            if (rdr != null)
            {

                while (rdr.Read())
                {
                    AdminReport.SMMEDetails details = new AdminReport.SMMEDetails
                    {
                        SMME_Id = rdr["SMME_Id"] != DBNull.Value ? Convert.ToInt32(rdr["SMME_Id"]) : 0,
                        SMME_CompanyName = rdr["SMME_CompanyName"]?.ToString() ?? string.Empty,
                        SMME_RegNumber = rdr["SMME_RegNumber"]?.ToString() ?? string.Empty,
                        SM_SectorName = rdr["SM_SectorName"]?.ToString() ?? string.Empty,
                        SMME_Active = rdr["SMME_Active"]?.ToString() ?? string.Empty,
                        SMME_Class = rdr["SMME_Class"]?.ToString() ?? string.Empty,
                        ETM_SMMEType = rdr["ETM_SMMEType"]?.ToString() ?? string.Empty,
                        SMME_Logo = rdr["SMME_Logo"]?.ToString() ?? string.Empty,
                        SMME_PrimaryContactNo = rdr["SMME_PrimaryContactNo"]?.ToString() ?? string.Empty,
                        SMME_PrimaryContactEmail = rdr["SMME_PrimaryContactEmail"]?.ToString() ?? string.Empty,
                        SMME_Country = rdr["SMME_Country"]?.ToString() ?? string.Empty
                    };
                    AdminRpt.SMMEList.Add(details);
                }
            }

            return AdminRpt;
        }

        public AdminReport GetAdminReportForProjectList(AdminReport rpt)
        {
            AdminReport AdminRpt = new AdminReport
            {
                ProjectList = new List<AdminReport.ProjectDetails>()
            };
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "SelectProjectListForReport"));
            arrParams.Add(new SqlParameter("@ENR_Id", rpt.ENR_Id));
            arrParams.Add(new SqlParameter("@CountryId", rpt.CountryId));
            arrParams.Add(new SqlParameter("@ProvinceId", rpt.ProvinceId));
            arrParams.Add(new SqlParameter("@BusinessTypeId", rpt.BusinessTypeId));
            arrParams.Add(new SqlParameter("@IndustrySectorId", rpt.IndustrySectorId));
            arrParams.Add(new SqlParameter("@LegalEntityTypeId", rpt.LegalEntityTypeId));
            arrParams.Add(new SqlParameter("@ProtfolioGrowthId", rpt.ProtfolioGrowthId));
            arrParams.Add(new SqlParameter("@JobCategoryId", rpt.JobCategoryId));
            arrParams.Add(new SqlParameter("@CustomerTypeId", rpt.CustomerTypeId));
            arrParams.Add(new SqlParameter("@VisitType", rpt.VisitType));
            arrParams.Add(new SqlParameter("@BudgetTypeId", rpt.BudgetTypeId));
            arrParams.Add(new SqlParameter("@FromDate", rpt.FromDate));
            arrParams.Add(new SqlParameter("@ToDate", rpt.ToDate));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal)
            {
                Direction = ParameterDirection.Output
            };
            arrParams.Add(OutPutId);

            SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "AdminReport_USP", arrParams.ToArray());

            if (rdr != null)
            {
                while (rdr.Read())
                {
                    AdminReport.ProjectDetails details = new AdminReport.ProjectDetails
                    {
                        PD_Id = rdr["PD_Id"] != DBNull.Value ? Convert.ToInt32(rdr["PD_Id"]) : 0,
                        ENR_CompanyName = rdr["ENR_CompanyName"]?.ToString() ?? "No Enterprise",
                        PD_ProjectName = rdr["PD_ProjectName"]?.ToString() ?? string.Empty,
                        PD_Budget = rdr["PD_Budget"] != DBNull.Value ? Convert.ToDecimal(rdr["PD_Budget"]) : 0.0m,
                        ENR_PrimaryContactEmail = rdr["ENR_PrimaryContactEmail"]?.ToString() ?? string.Empty,
                        ProjectDaysLeft = rdr["ProjectDaysLeft"] != DBNull.Value ? Convert.ToInt32(rdr["ProjectDaysLeft"]) : 0,
                        PD_DurationFromDate = rdr["PD_DurationFromDate"]?.ToString() ?? string.Empty,
                        PD_DurationToDate = rdr["PD_DurationToDate"]?.ToString() ?? string.Empty
                    };

                    AdminRpt.ProjectList.Add(details);
                }
            }

            return AdminRpt;
        }

        public long ChangeThemeStyle(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "ChangeTheme"));

            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_ThemeColor", User.ThemeColor));
            arrParams.Add(new SqlParameter("@UM_ThemeStyle", User.ThemeStyle));
            arrParams.Add(new SqlParameter("@UM_TheamLink", User.TheamLink));
            arrParams.Add(new SqlParameter("@UM_CoreLink", User.CoreLink));
            arrParams.Add(new SqlParameter("@UM_CustomCSSLink", User.CustomCSSLink));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public string GetEmailExists(UserModel User)
        {

            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "SelectEmailFromUserMaster"));
            arrParams.Add(new SqlParameter("@UM_EmailId", User.UM_EmailId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray()))
            {

                if (rdr != null && rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        User.UM_EmailId = rdr["UM_EmailId"]?.ToString() ?? string.Empty;
                    }
                }
            }
            return User.UM_EmailId;
        }

        public long UpdatePassword(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "UpdatePassword"));

            arrParams.Add(new SqlParameter("@UM_EmailId", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Password", User.UM_Password));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public string GetStakeholderLogo(UserModel user)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            arrParams.Add(new SqlParameter("@TransactionType", "GetStakeholderLogo"));
            arrParams.Add(new SqlParameter("@ENR_Id", user.StakeHolderId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.Decimal);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            using (SqlDataReader rdr = SqlHelper.ExecuteReader(GetConnectionString(), CommandType.StoredProcedure, "EnterpriseRegistration_USP", arrParams.ToArray()))
            {

                if (rdr != null && rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        user.ENR_CompanyLogo = rdr["ENR_CompanyLogo"]?.ToString() ?? string.Empty;
                    }
                }
            }
            return user.ENR_CompanyLogo;
        }
        public long UpdateEmailVeried(string mail)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "UpdateEmailVerification"));

            arrParams.Add(new SqlParameter("@UM_EmailId", mail));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long ResetPassword(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", "ResetUserPassword"));

            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_CurrentPassword", User.UM_CurrentPassword));
            arrParams.Add(new SqlParameter("@UM_NewPassword", User.UM_NewPassword));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long UpdateUserProfileSettings(UserModel User)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            if (User.UM_Id > 0)
            {
                arrParams.Add(new SqlParameter("@TransactionType", "UpdateUserProfile"));
            }

            arrParams.Add(new SqlParameter("@UM_Id", User.UM_Id));
            arrParams.Add(new SqlParameter("@UM_FirstName", User.UM_FirstName));
            arrParams.Add(new SqlParameter("@UM_LastName", User.UM_LastName));
            arrParams.Add(new SqlParameter("@UM_MainID", User.ENR_Id));
            arrParams.Add(new SqlParameter("@UM_Role", User.UM_Role));
            arrParams.Add(new SqlParameter("@UM_SubRole", User.UM_SubRole));
            arrParams.Add(new SqlParameter("@UM_SubRoleId", User.UM_SubRoleId));
            arrParams.Add(new SqlParameter("@UM_ContactNo", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UM_EmailId", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Login", User.UM_EmailId));
            arrParams.Add(new SqlParameter("@UM_Password", User.UM_ContactNo));
            arrParams.Add(new SqlParameter("@UserId", User.UserID));
            arrParams.Add(new SqlParameter("@UM_ProfilePic", User.UM_ProfilePic));
            arrParams.Add(new SqlParameter("@UM_Gender", User.UM_Gender));
            arrParams.Add(new SqlParameter("@UM_Age", User.UM_Age));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertBuildKPIQuestion(BuildAssessmentSetUp entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            DataTable dtQues = new DataTable();
            dtQues.Columns.Add("CA_SegId", typeof(Int32));
            dtQues.Columns.Add("CA_QsId", typeof(Int32));
            dtQues.Columns.Add("CA_SegSlNo", typeof(Int32));
            dtQues.Columns.Add("CA_Description", typeof(string));

            foreach (var MD in entity.BuildAssesmentDetailsList)
            {
                DataRow dr = dtQues.NewRow();
                dr["CA_SegId"] = MD.KPI_SegmentId;
                dr["CA_QsId"] = MD.KPI_QuestionId;
                dr["CA_SegSlNo"] = MD.BAD_SegSlNo;
                dr["CA_Description"] = MD.KPI_Description;

                dtQues.Rows.Add(dr);
            }

            arrParams.Add(new SqlParameter("@TransactionType", "Insert"));
            ////else
            ////{

            arrParams.Add(new SqlParameter("@KPI_BA_Id", entity.BA_Id));
            arrParams.Add(new SqlParameter("@UserId", entity.BA_CreatedBy));
            arrParams.Add(new SqlParameter("@AssessmentKPI", dtQues));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "AssessmentKPI_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long ProjectTaggingToStakeholderUser(ProjectDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@SUP_StakeholderId", entity.SUP_StakeholderId));
            arrParams.Add(new SqlParameter("@SUP_ProjectId", entity.SUP_ProjectId));
            arrParams.Add(new SqlParameter("@SUP_UserId", entity.SUP_UserId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long SMMETaggingToStakeholderUser(SMMERegistration entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@SUS_StakeholderId", entity.SUS_StakeholderId));
            arrParams.Add(new SqlParameter("@SUS_SMMEId", entity.SUS_SMMEId));
            arrParams.Add(new SqlParameter("@SUS_UserId", entity.SUS_UserId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserMaster_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public Tuple<string, int> GetProjectDataDynamically(GlobalData global)
        {
            string outputString = string.Empty;
            int outputId = 0;

            string connectionString = ConfigurationManager.ConnectionStrings["ConStr"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand(global.StoreProcedure, conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@TransactionType", global.TransactionType ?? (object)DBNull.Value);

                if (global.param1 != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + global.param1, global.param1Value ?? (object)DBNull.Value));
                }

                if (global.param2 != null)
                {
                    if (global.param2Value != null)
                    {
                        cmd.Parameters.Add(new SqlParameter("@" + global.param2, global.param2Value));
                    }
                    else if (global.paramString2 != null)
                    {
                        cmd.Parameters.Add(new SqlParameter("@" + global.param2, global.paramString2));
                    }
                }

                if (global.param3 != null)
                {
                    if (global.param3Value != null)
                    {
                        cmd.Parameters.Add(new SqlParameter("@" + global.param3, global.param3Value));
                    }
                    else if (global.paramString3 != null)
                    {
                        cmd.Parameters.Add(new SqlParameter("@" + global.param3, global.paramString3));
                    }
                }

                SqlParameter outputStrParam = new SqlParameter("@OutPutString", SqlDbType.NVarChar, -1)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outputStrParam);

                SqlParameter outputIdParam = new SqlParameter("@OutPutId", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outputIdParam);

                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();

                    outputString = Convert.ToString(outputStrParam.Value);
                    outputId = Convert.ToInt32(outputIdParam.Value);
                }
                catch (Exception ex)
                {
                    throw new ApplicationException("Error executing stored procedure.", ex);
                }
            }

            return Tuple.Create(outputString, outputId);
        }

        public long InsertKPIQuestionAllocation(KPIAllocation entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            DataTable dtQns = new DataTable();
            dtQns.Columns.Add("KPA_KPS_Id", typeof(Int32));

            foreach (var MD in entity.KPIQnsList)
            {
                if (MD.KPA_KPS_Id.HasValue)  // Make sure it's not null
                {
                    DataRow dr = dtQns.NewRow();
                    dr["KPA_KPS_Id"] = MD.KPA_KPS_Id.Value;  // Use the actual value
                    dtQns.Rows.Add(dr);
                }
            }

            arrParams.Add(new SqlParameter("@TransactionType", "InsertKPIAllocationQns"));
            arrParams.Add(new SqlParameter("@KPA_KC_Id", entity.KPA_KC_Id));
            arrParams.Add(new SqlParameter("@KPA_KCG_Id", entity.KPA_KCG_Id));
            arrParams.Add(new SqlParameter("@KPIAllocationQuestions", dtQns));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "AssessmentKPI_USP", arrParams.ToArray());

            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long AssignKPIToSMME(AssignKPIToSMME entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@SWK_SMME_Id", entity.SWK_SMME_Id));
            arrParams.Add(new SqlParameter("@SWK_KCG_Id", entity.SWK_KCG_Id));
            arrParams.Add(new SqlParameter("@SWK_KC_Id", entity.SWK_KC_Id));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "AssessmentKPI_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUserWiseProject(UserWiseProject entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            DataTable dtUrs = new DataTable();
            dtUrs.Columns.Add("UWP_UserId", typeof(Int32));
            dtUrs.Columns.Add("UWP_MainId", typeof(Int32));

            foreach (var MD in entity.UserList)
            {
                if (MD.UWP_UserId.HasValue)  // Make sure it's not null
                {
                    DataRow dr = dtUrs.NewRow();
                    dr["UWP_UserId"] = MD.UWP_UserId.Value;
                    dr["UWP_MainId"] = MD.UWP_MainId.Value;// Use the actual value
                    dtUrs.Rows.Add(dr);
                }
            }

            arrParams.Add(new SqlParameter("@TransactionType", "InsertUserWiseProject"));
            arrParams.Add(new SqlParameter("@UWP_ProjectId", entity.UWP_ProjectId));
            arrParams.Add(new SqlParameter("@UWP_UserType", entity.UWP_UserType));
            arrParams.Add(new SqlParameter("@UserWiseProject", dtUrs));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "UserWiseProject_USP", arrParams.ToArray());

            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long TaggingTaskToEnterpriseUser(ProjectDetails entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", entity.TransactionType));
            arrParams.Add(new SqlParameter("@TWEU_EnterpriseId", entity.TWEU_EnterpriseId));
            arrParams.Add(new SqlParameter("@TWEU_ProjectId", entity.TWEU_ProjectId));
            arrParams.Add(new SqlParameter("@TWEU_TaskId", entity.TWEU_TaskId));
            arrParams.Add(new SqlParameter("@TWEU_UserId", entity.TWEU_UserId));

            arrParams.Add(new SqlParameter("@CreatedBy", entity.CreatedBy));
            arrParams.Add(new SqlParameter("@UpdatedBy", entity.UpdatedBy));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "TaskDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertUpdateAnswerIsCurrect(AssessmentAnswer entity)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();

            DataTable dtApropAns = new DataTable();
            dtApropAns.Columns.Add("ASA_SegmentId", typeof(Int32));
            dtApropAns.Columns.Add("ASA_QuestionId", typeof(Int32));
            dtApropAns.Columns.Add("ASA_Id", typeof(Int32));
            dtApropAns.Columns.Add("ASA_AnswerType", typeof(string));
            dtApropAns.Columns.Add("ASA_Note", typeof(string));

            foreach (var MD in entity.SelectedAnswerList)
            {
                DataRow dr = dtApropAns.NewRow();
                dr["ASA_SegmentId"] = MD.ASA_SegmentId;
                dr["ASA_QuestionId"] = MD.ASA_QuestionId;
                dr["ASA_Id"] = MD.ASA_Id ?? 0;
                dr["ASA_AnswerType"] = MD.ASA_AnswerType ?? "";
                dr["ASA_Note"] = MD.ASA_Note ?? "";
                dtApropAns.Rows.Add(dr);
            }

            arrParams.Add(new SqlParameter("@TransactionType", "UpdateAnswerIsCurrect"));
            arrParams.Add(new SqlParameter("@ApprovedAssessmentAnswer", dtApropAns));

            arrParams.Add(new SqlParameter("@AASS_SMMEId", entity.AASS_SMMEId));
            arrParams.Add(new SqlParameter("@AASS_BAId", entity.AASS_BAId));
            arrParams.Add(new SqlParameter("@AASS_Summary", entity.AASS_Summary));
            arrParams.Add(new SqlParameter("@AASS_IsVerified", entity.AASS_IsVerified));
            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);

            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BuildAssessmentSetUp_USP", arrParams.ToArray());

            object result = OutPutId.Value;
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }

        public long InsertAreaWiseEnrUser(BranchWiseArea payload)
        {
            List<SqlParameter> arrParams = new List<SqlParameter>();
            arrParams.Add(new SqlParameter("@TransactionType", payload.TransactionType));
            arrParams.Add(new SqlParameter("@BWAU_EnrId", payload.BWAU_EnrId));
            arrParams.Add(new SqlParameter("@BWAU_BranchId", payload.BWAU_BranchId));
            arrParams.Add(new SqlParameter("@BWAU_BWAId", payload.BWAU_BWAId));
            arrParams.Add(new SqlParameter("@BWAU_UserId", payload.BWAU_UserId));

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            arrParams.Add(OutPutId);
            SqlHelper.ExecuteNonQuery(GetConnectionString(), CommandType.StoredProcedure, "BranchDetails_USP", arrParams.ToArray());
            long val = Convert.ToInt64(arrParams[arrParams.Count - 1].Value);
            return val;
        }
    }
}
