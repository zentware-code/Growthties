
using BODDal;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using BODDal.Models;
using System.IO;
using System.Reflection;
using System.Web;
using System.Net;
using OfficeOpenXml;
using System.Net.Mail;
using System.Web.Hosting;
using System.Configuration;
using System.Web.Configuration;

namespace BODAPP.Controllers
{
    public class ScriptJsonController : Controller
    {
        DAL dl = new DAL();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
        Dictionary<string, object> childRow;

        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static GlobalPages pageName { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public static UserModel SMMEUserEmpModel { get; set; }
        public static CommonCls cmnCls { get; set; }
        public GlobalData global = new GlobalData();
        public static DataTable dt = new DataTable();

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows) data.Add(GetItem<T>(row));
            return data;
        }

        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();
            foreach (DataColumn column in dr.Table.Columns)
                foreach (PropertyInfo pro in temp.GetProperties())
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
            return obj;
        }

        private static T GetItem1<T>(DataTable dt)
        {
            T data = Activator.CreateInstance<T>();
            foreach (DataRow row in dt.Rows) data = GetItem<T>(row);
            return data;
        }

        public static void GetSession()
        {
            var ctx = System.Web.HttpContext.Current.Session;
            UserModel = (UserModel)ctx["UserDataModel"];
            EnterpriseUserModel = (UserModel)ctx["EnterpriseUserDataModel"];
            SMMEUserModel = (UserModel)ctx["SMMEUserDataModel"];
            SMMEUserEmpModel = (UserModel)ctx["SMMEUserEmpDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)ctx["EnterpriseEMPUserDataModel"];
            pageName = (GlobalPages)ctx["LoginPageName"];
            AdminUserModel = (UserModel)ctx["AdminUserDataModel"];
        }

        public ScriptJsonController() { GetSession(); }


        #region DropDownPopulation

        [HttpPost]
        public JsonResult DropDownPopulation(DDLList data)
        {
            List<DDLList> ddlList = dl.GetDDLList(data);
            return Json(ddlList, JsonRequestBehavior.AllowGet);

        }

        public JsonResult DropDownJoinPopulation(DDLJoinList data)
        {
            List<DDLJoinList> DDLObjList = dl.GetDDLJoinList(data);
            return Json(DDLObjList, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region GetGlobalList

        [HttpPost]
        public JsonResult GetGlobalList(GlobalData global)
        {
            DataTable dt = new DataTable();
            global.CompanyID = UserModel.CompanyID;
            dt = DAL.GetGlobalMasterList(global);

            foreach (DataRow row in dt.Rows)
            {
                parentRow.Clear(); // avoid residual data across calls

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, row[col]);
                }
                parentRow.Add(childRow);
            }
            string GlobalData = jsSerializer.Serialize(parentRow);
            return Json(GlobalData, JsonRequestBehavior.AllowGet);

        }
        #endregion
        #region GetGlobalMaster

        #region GetGlobalMasterTransactionSingle1

        [HttpPost]
        public JsonResult GetGlobalMasterTransactionSingle1(GlobalData global)
        {
            DataSet ds = new DataSet();
            int? mainId = 0;
            int? userId = 0;

            if (EnterpriseUserModel != null)
            {
                userId = EnterpriseUserModel.UserID;
                mainId = EnterpriseUserModel.UM_MainID;
            }
            else if (UserModel != null)
            {
                userId = UserModel.UserID;
                mainId = UserModel.UM_MainID;
            }

            // Use switch for setting param1Value
            switch (global.TransactionType)
            {
                case "AllSMMEForEnterprise":
                case "CountSMMEByEnterprise":
                case "SelectAllEnterpriseUser":
                case "SelectProjectForEnterprise":
                case "SelectSmmeAssessmentForEnterprise":
                case "SelectAllBuildQuestionForEnterp":
                case "SelectAssignAssessmnetforEnterp":
                    global.param1Value = mainId;
                    break;
            }

            // Get dataset
            ds = dl.GetGlobalMasterTransactionSingle1(global);

            // Build the result
            var result = new List<Dictionary<string, object>>();

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    var rowData = new Dictionary<string, object>();
                    foreach (DataColumn col in ds.Tables[0].Columns)
                    {
                        rowData[col.ColumnName] = row[col];
                    }
                    result.Add(rowData);
                }
            }

            // Return data as JSON
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion

        [HttpPost]
        public JsonResult GetGlobalMasterTransaction(GlobalData global)
        {
            // Prepare
            DataTable dt = new DataTable();
            int? mainId = 0;
            int? userid = 0;

            // Resolve current user/main ids (fast path; keep original precedence)
            if (EnterpriseUserModel != null)
            {
                userid = EnterpriseUserModel.UserID;
                mainId = EnterpriseUserModel.UM_MainID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                userid = EnterpriseEMPUserDataModel.UserID;
                mainId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            else if (UserModel != null)
            {
                userid = UserModel.UserID;
                mainId = UserModel.UM_MainID;
            }
            else if (AdminUserModel != null)
            {
                userid = AdminUserModel.UserID;
                mainId = AdminUserModel.UM_MainID;
            }
            else if (SMMEUserModel != null)
            {
                userid = SMMEUserModel.UserID;
                mainId = SMMEUserModel.UM_MainID;
            }
            else if (SMMEUserEmpModel != null)
            {
                userid = SMMEUserEmpModel.UserID;
                mainId = SMMEUserEmpModel.UM_MainID;
            }

            // Fast routing by TransactionType (switch/case)
            switch (global.TransactionType)
            {
                // Simple mainId mapping
                case "SelectForInvoiceListForSMME":
                case "SelectForInvoiceListForEnterprise":
                case "AllSMMEForEnterprise":
                case "SelectAllBranchForAssignToSMME":
                case "SelectStakeholderUserForProjectTagging":
                case "SelectStakeholderUserForSMMETagging":
                case "CountSMMEByEnterprise":
                case "SelectAllEnterpriseUser":
                case "SelectAllSMMEUser":
                case "SelectAllSMMEUserForSelect":
                case "SelectAllEnterpriseUserForSelect":
                case "SelectAllBuildQuestionForEnterp":
                case "SelectSmmeAssessmentForEnterprise":
                case "SelectAssignAssessmnetforEnterp":
                    global.param1Value = mainId;
                    break;

                // Chat (needs UserId too)
                case "SelectEnterpriseUserForChat":
                case "SelectAdminUserForChat":
                    global.param1Value = mainId;
                    global.UserID = userid;
                    break;

                // Calendar needs current user id
                case "ShowJobCalender":
                    global.param1Value = userid;
                    break;

                // Chat history: param2 is UC_UserId
                case "GetChatHistory":
                    global.param2 = "UC_UserId";
                    global.param2Value = userid;
                    break;

                // Stakeholder: only EnterpriseId as param2
                case "SelectEnterpriseForStakeholder":
                    global.param2 = "EnterpriseId";
                    global.param2Value = mainId;
                    break;

                // Stakeholder: param1 = StakeHolderId (no param2)
                case "SelectAllEnterpriseStakeHolderUser":
                case "SelectAllJobForStakeholder":
                case "SelectAssignAssessmnetforStakeholder":
                case "SelectForInvoiceListForStakeholder":
                case "SelectListForEnterpriseForStakeholder":
                    if (EnterpriseUserModel != null)
                    {
                        global.param1Value = EnterpriseUserModel.StakeHolderId;
                    }
                    break;

                // Stakeholder: param1 = StakeHolderId, param2Value = UM_MainID
                case "CountSMMEByStakeholder":
                case "SelectAllBuildQuestionForStakeholder":
                case "SelectAllProjectForStakeholder":
                case "SelectSmmeAssessmentForStakeholder":
                    if (EnterpriseUserModel != null)
                    {
                        global.param1Value = EnterpriseUserModel.StakeHolderId;
                        global.param2Value = EnterpriseUserModel.UM_MainID;
                    }
                    break;

                default:
                    // No extra params needed for other types
                    break;
            }

            // Execute + shape JSON
            dt = dl.GetGlobalMasterTransaction(global);

            parentRow.Clear(); // reset holder before building new rows
            foreach (DataRow row in dt.Rows)
            {
                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, row[col]);
                }
                parentRow.Add(childRow);
            }

            string GlobalData = jsSerializer.Serialize(parentRow);
            return Json(GlobalData, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult GetGlobalMasterTransactionMul(GlobalData global)
        {
            DataSet ds = new DataSet();
            int? mainId = 0;
            int? userid = 0;

            if (EnterpriseUserModel != null)
            {
                userid = EnterpriseUserModel.UserID;
                mainId = EnterpriseUserModel.UM_MainID;
            }
            else if (UserModel != null)
            {
                userid = UserModel.UserID;
                mainId = UserModel.UM_MainID;
            }

            // Use switch instead of multiple ifs
            switch (global.TransactionType)
            {
                case "AllSMMEForEnterprise":
                case "CountSMMEByEnterprise":
                case "SelectAllEnterpriseUser":
                case "SelectProjectForEnterprise":
                case "SelectAllBuildQuestionForEnterp":
                case "SelectAssignAssessmnetforEnterp":
                    global.param1Value = mainId;
                    break;
            }

            // Fetch data
            ds = dl.GetGlobalMasterTransactionSingle1(global);

            // Prepare list of records to return
            List<Dictionary<string, object>> SRecords = new List<Dictionary<string, object>>();

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Dictionary<string, object> record = new Dictionary<string, object>();
                    foreach (DataColumn col in ds.Tables[0].Columns)
                    {
                        record[col.ColumnName] = row[col];
                    }
                    SRecords.Add(record);
                }
            }

            return Json(SRecords, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetGlobalMaster(GlobalData global)
        {
            DataTable dt = new DataTable();
            if (EnterpriseUserModel != null && UserModel == null && AdminUserModel == null && EnterpriseEMPUserDataModel == null)
            {
                global.UserID = EnterpriseUserModel.UserID;

            }
            else if (AdminUserModel != null && UserModel == null && EnterpriseUserModel == null && EnterpriseEMPUserDataModel == null)
            {
                global.UserID = AdminUserModel.UserID;

            }
            else if (EnterpriseEMPUserDataModel != null && UserModel == null && EnterpriseUserModel == null && AdminUserModel == null)
            {
                global.UserID = EnterpriseEMPUserDataModel.UserID;

            }
            else
            {
                global.UserID = UserModel.UserID;

            }

            dt = dl.GetGlobalMaster(global);

            foreach (DataRow row in dt.Rows)
            {
                parentRow.Clear(); // avoid residual data across calls

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, row[col]);
                }

            }
            return Json(childRow, JsonRequestBehavior.AllowGet);

        }
        #endregion

        #region GlobalDelete
        public ActionResult GlobalDelete(GlobalDelete del)
        {
            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.GlobalDelete(del);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record Deleted successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not Delete successfully";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        #endregion

        [HttpPost]
        public ActionResult GetDashBoard(GlobalData global)
        {
            DataSet ds = new DataSet();
            global.CompanyID = UserModel.CompanyID;
            global.FYId = UserModel.FyId;
            ds = dl.GetGlobalMasterTransactionSingle(global);
            AdminDashBoard dash = new AdminDashBoard();
            dash = GetItem1<AdminDashBoard>(ds.Tables[0]);
            var Srecord = dash;

            return Json(Srecord, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult UserMaster(UserModel User)
        {
            User.UserID = UserModel.UserID ?? 0;
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdateUserInfo(User);

                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "User Already Exists...";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetUserMaster(UserModel user)
        {
            DataSet ds = new DataSet();

            UserModel objuser = new UserModel();
            ds = dl.GetUserMaster(user);
            if (ds.Tables.Count > 0)
            {
                objuser = GetItem1<UserModel>(ds.Tables[0]);
                DataTable dt = ds.Tables[1];
                objuser.CompanyNameList = new string[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    objuser.CompanyNameList[i] = dt.Rows[i]["CUA_CM_Id"].ToString();
                }

            }

            return Json(objuser, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult ActiveInactiveUser(UserModel User)
        {
            StatusResponse Status = new StatusResponse();
            User.UserID = UserModel.UserID;
            try
            {
                long id = dl.ActiveInactiveUser(User);
                if (id > 0)
                {
                    Status.Id = 1;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SectorSetUp(SectorSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<SectorSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }
            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CountrySetUp(CountrySetUp entity)
        {

            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<CountrySetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CountrySetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<CountrySetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SectorSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<SectorSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DesignationSetUp(DesignationSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<DesignationSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DesignationSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<DesignationSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EnterpriseTypeSetUp(EnterpriseTypeSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<EnterpriseTypeSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EnterpriseTypeSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<EnterpriseTypeSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult IncomeTypeSetUp(IncomeTypeSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<IncomeTypeSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult IncomeTypeSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<IncomeTypeSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ItemSetUp(ItemSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<ItemSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ItemSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<ItemSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult LegalEntitySetUp(LegalEntitySetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<LegalEntitySetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult LegalEntitySetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<LegalEntitySetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ProvinceSetUp(ProvinceSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<ProvinceSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ProvinceSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<ProvinceSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RoleSetUp(RoleSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<RoleSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RoleSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<RoleSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult FinancialYearSetUp(FinancialYearSetUp entity)
        {

            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            if (EnterpriseUserModel != null)
            {
                entity.UserId = EnterpriseUserModel.UserID;
                entity.EnterpriseId = EnterpriseUserModel.UM_MainID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                entity.UserId = EnterpriseEMPUserDataModel.UserID;
                entity.EnterpriseId = EnterpriseUserModel.UM_MainID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<FinancialYearSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult FinancialYearSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<FinancialYearSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertUpdateEnterpriseRegn(EnterpriseRegistration entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (UserModel != null)
                {
                    entity.CreatedBy = UserModel.UserID;
                    entity.UpdatedBy = UserModel.UserID;
                }
                else if (AdminUserModel != null)
                {
                    entity.CreatedBy = AdminUserModel.UserID;
                    entity.UpdatedBy = AdminUserModel.UserID;
                }

                long id = dl.InsertUpdateEnterpriseRegn(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                    if (entity.ENR_CompanyLogo != null && EnterpriseUserModel != null)
                    {
                        EnterpriseUserModel.UM_CompanyPic = entity.ENR_CompanyLogo;
                    }
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "This Email  Already Exists...";
                    Status.IsSuccess = false;
                    Status.Message = "This Email  Already Exists...";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "This  Phone Number Already Exists...";
                    Status.IsSuccess = false;
                    Status.Message = "This  Phone Number Already Exists...";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = 0;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertUpdateSMMERegistration(SMMERegistration entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.SMME_EnterpriseId = EnterpriseUserModel.UM_MainID;
                    entity.SMME_CreatedBy = EnterpriseUserModel.UserID;
                    entity.CreatedBy = EnterpriseUserModel.UserID;
                    entity.UpdatedBy = EnterpriseUserModel.UserID;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.SMME_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                    entity.SMME_CreatedBy = EnterpriseEMPUserDataModel.UserID;
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
                }
                else if (AdminUserModel != null)
                {
                    entity.SMME_CreatedBy = AdminUserModel.UserID;
                    entity.CreatedBy = AdminUserModel.UserID;
                    entity.UpdatedBy = AdminUserModel.UserID;
                }
                else if (UserModel != null)
                {
                    entity.SMME_CreatedBy = UserModel.UserID;
                    entity.CreatedBy = UserModel.UserID;
                    entity.UpdatedBy = UserModel.UserID;
                }

                long id = dl.InsertUpdateSMMERegistration(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Email Already Exists...";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Phone Number Already Exists...";
                }
                else if (id == -3)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Reg Number Already Exists...";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertUpdateSMMERegistrationStakeHolder(SMMERegistration entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.SWS_StakeholderId = EnterpriseUserModel.UM_MainID;
                    entity.SMME_CreatedBy = EnterpriseUserModel.UserID;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.SWS_StakeholderId = EnterpriseEMPUserDataModel.UM_MainID;
                    entity.SMME_CreatedBy = EnterpriseEMPUserDataModel.UserID;
                }

                long id = dl.InsertUpdateSMMERegistration(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Email Already Exists...";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Phone Number Already Exists...";
                }
                else if (id == -3)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Reg Number Already Exists...";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Upload(FormCollection frm)
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {

                        HttpPostedFileBase file = files[i];
                        string fname;

                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }
                        string uploadpath = frm["uploadPath"];
                        uploadpath = string.IsNullOrEmpty(uploadpath) ? "../Upload/" : uploadpath;
                        fname = Path.Combine(Server.MapPath(uploadpath), fname);
                        file.SaveAs(fname);
                    }
                    return Json("File Uploaded Successfully!");
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json("Data Saved But No File Selected");
            }
        }
        [HttpPost]
        public JsonResult UserPhotoUpdate(UserModel User)
        {
            User.UserID = UserModel.UserID ?? 0;
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UserPhotoUpdate(User);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo Uploaded Successfully!";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo not uploaded successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EnterprisePhotoUpdate(EnterpriseRegistration entr)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.EnterprisePhotoUpdate(entr);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo Uploaded Successfully!";

                    if (entr.ENR_CompanyLogo != null)
                    {
                        EnterpriseUserModel.UM_CompanyPic = entr.ENR_CompanyLogo;
                    }
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo not uploaded successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EnterpriseProfPhotoUpdate(EnterpriseRegistration entr)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.EnterprisePhotoUpdate(entr);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo Uploaded Successfully!";

                    if (entr.ENR_Logo != null)
                    {
                        EnterpriseUserModel.UM_ProfilePic = entr.ENR_Logo;
                    }
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo not uploaded successfully...";
                }
            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UserChangesPassword(UserModel User)
        {
            User.UserID = UserModel.UserID ?? 0;
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UserChangesPassword(User);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "User Already Exists...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AssessmentCategorySetUp(AssessmentCategorySetUp entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.EnterpriseId = EnterpriseUserModel.UM_MainID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                entity.EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
            }

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<AssessmentCategorySetUp>(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.Id = 0;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "This assessment name already exist.!";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AssessmentCategorySetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<AssessmentCategorySetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateQuestionSetup(QuestionSetUp entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.QN_EnterpriseId = EnterpriseUserModel.UM_MainID;
                entity.CreatedBy = EnterpriseUserModel.UserID;
                entity.UpdatedBy = EnterpriseUserModel.UserID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                entity.QN_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
            }
            else
            {
                entity.QN_EnterpriseId = 0;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertUpdateQuestionSetup(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record already exists...";
                }
                else
                {
                    {
                        Status.ExMessage = "";
                        Status.IsSuccess = true;
                        Status.Message = "Record not saved successfully...";
                    }
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetQuestionSetupData(GlobalData global)
        {
            DataSet ds = new DataSet();
            int? mainId = 0;
            int? userid = 0;
            if (EnterpriseUserModel != null)
            {
                userid = EnterpriseUserModel.UserID;
                mainId = EnterpriseUserModel.UM_MainID;
            }
            else if (UserModel != null)
            {
                userid = UserModel.UserID;
                mainId = UserModel.UM_MainID;
            }

            if (global.TransactionType == "AllSMMEForEnterprise")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "CountSMMEByEnterprise")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectAllEnterpriseUser")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectProjectForEnterprise")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectSmmeAssessmentForEnterprise")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectAllBuildQuestionForEnterp")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectAssignAssessmnetforEnterp")
            {
                global.param1Value = mainId;
            }
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            QuestionSetUp QesSet = new QuestionSetUp();
            if (ds.Tables.Count > 1)
            {
                QesSet = GetItem1<QuestionSetUp>(ds.Tables[0]);
                DataTable dt = ds.Tables[1];
                QesSet.QuestionDetailsList = new string[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    QesSet.QuestionDetailsList[i] = dt.Rows[i]["QND_QuestionName"].ToString();
                }
            }
            var Srecord = QesSet;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertBuildQuestion(BuildAssessmentSetUp entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.BA_EnterpriseId = EnterpriseUserModel.UM_MainID;
                entity.BA_CreatedBy = EnterpriseUserModel.UserID;
                entity.CreatedBy = EnterpriseUserModel.UserID;
                entity.UpdatedBy = EnterpriseUserModel.UserID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                entity.BA_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                entity.BA_CreatedBy = EnterpriseEMPUserDataModel.UserID;
                entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.BA_EnterpriseId = 0;
                entity.BA_CreatedBy = AdminUserModel.UserID;
                entity.CreatedBy = AdminUserModel.UserID;
                entity.UpdatedBy = AdminUserModel.UserID;
            }
            if (UserModel != null)
            {
                entity.BA_EnterpriseId = 0;
                entity.BA_CreatedBy = UserModel.UserID;
                entity.CreatedBy = UserModel.UserID;
                entity.UpdatedBy = UserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertBuildQuestion(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AssessmentSegmentSetUp(AssessmentSegmentSetUp entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.EnterpriseId = EnterpriseUserModel.UM_MainID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<AssessmentSegmentSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AssessmentSegmentSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<AssessmentSegmentSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertDeleteEnterpriseWiseSMME(EnterpriiseWiseSMME entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertDeleteEnterpriseWiseSMME(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SMMEPhotoUpdate(SMMERegistration entr)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.SMMEPhotoUpdate(entr);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo Uploaded Successfully!";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo not uploaded successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SMMEPhotoUpdateCompany(SMMERegistration entr)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.SMMEPhotoUpdate(entr);

                if (id > 0)
                {

                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo Uploaded Successfully!";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo not uploaded successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertEnterpriseUserAdmin(UserModel User)
        {
            if (UserModel != null)
            {
                User.UserID = UserModel.UserID ?? 0;
                User.CreatedBy = UserModel.UserID ?? 0;
                User.UpdatedBy = UserModel.UserID ?? 0;
            }
            if (AdminUserModel != null)
            {
                User.UserID = AdminUserModel.UserID ?? 0;
                User.CreatedBy = UserModel.UserID ?? 0;
                User.UpdatedBy = UserModel.UserID ?? 0;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertEnterpriseUserAdmin(User);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "This Email  Already Exists...";
                    Status.IsSuccess = false;
                    Status.Message = "This Email  Already Exists...";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "This  Phone Number Already Exists...";
                    Status.IsSuccess = false;
                    Status.Message = "This  Phone Number Already Exists...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }
            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetEnterpriseUserAdmin(GlobalData global)
        {
            DataSet ds = new DataSet();
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            UserModel user = new UserModel();
            user = GetItem1<UserModel>(ds.Tables[0]);
            string s = user.UM_SubRole;
            var Srecord = user;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertProjectDetails(ProjectDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.PD_EnterpriseId = EnterpriseUserModel.UM_MainID;
                    entity.CreatedBy = EnterpriseUserModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseUserModel.UserID ?? 0;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.PD_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                }
                else if (AdminUserModel != null)
                {
                    entity.CreatedBy = AdminUserModel.UserID ?? 0;
                    entity.UpdatedBy = AdminUserModel.UserID ?? 0;
                }
                else
                {
                    entity.CreatedBy = UserModel.UserID ?? 0;
                    entity.UpdatedBy = UserModel.UserID ?? 0;
                }
                long id = dl.InsertProjectDetails(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Project Already Exists...";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertProjectDetailsForStakeholder(ProjectDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.PD_EnterpriseId = EnterpriseUserModel.StakeHolderId;
                    entity.PD_CreatedBy = EnterpriseUserModel.UserID ?? 0;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.PD_EnterpriseId = EnterpriseEMPUserDataModel.StakeHolderId;
                    entity.PD_CreatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                }
                else
                {
                    entity.PD_CreatedBy = UserModel.UserID ?? 0;
                }
                long id = dl.InsertProjectDetails(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Project Already Exists...";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetProjectForAdmin(GlobalData global)
        {
            DataSet ds = new DataSet();
            ProjectDetails user = new ProjectDetails();
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            if (ds.Tables.Count > 0)
            {
                user = GetItem1<ProjectDetails>(ds.Tables[0]);

                DataTable dt = ds.Tables[1];
                user.BranchList = new string[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    user.BranchList[i] = dt.Rows[i]["BWP_BD_Id"].ToString();
                }
            }

            var Srecord = user;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertEnterpriseUserFromEnterprise(UserModel User)
        {
            if (EnterpriseUserModel != null)
            {
                User.UserID = EnterpriseUserModel.UserID;
                User.ENR_Id = EnterpriseUserModel.UM_MainID;
                User.CreatedBy = EnterpriseUserModel.UserID;
                User.UpdatedBy = EnterpriseUserModel.UserID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                User.UserID = EnterpriseEMPUserDataModel.UserID;
                User.ENR_Id = EnterpriseEMPUserDataModel.UM_MainID;
                User.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                User.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
            }
            else if (SMMEUserModel != null)
            {
                User.UserID = SMMEUserModel.UserID;
                User.ENR_Id = SMMEUserModel.UM_MainID;
            }
            else if (SMMEUserEmpModel != null)
            {
                User.UserID = SMMEUserEmpModel.UserID;
                User.ENR_Id = SMMEUserEmpModel.UM_MainID;
            }

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertEnterpriseUserFromEnterprise(User);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Email  Already Exists...";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This  Phone Number Already Exists...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetEnterpriseUser(GlobalData global)
        {
            DataSet ds = new DataSet();
            if (EnterpriseUserModel != null)
            {
                global.param2Value = EnterpriseUserModel.UM_MainID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                global.param2Value = EnterpriseEMPUserDataModel.UM_MainID;
            }
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            UserModel user = new UserModel();
            user = GetItem1<UserModel>(ds.Tables[0]);
            var Srecord = user;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetSMMEUser(GlobalData global)
        {
            DataSet ds = new DataSet();
            global.param2Value = SMMEUserModel.UM_MainID;
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            UserModel user = new UserModel();
            user = GetItem1<UserModel>(ds.Tables[0]);
            var Srecord = user;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateAssignProject(ProjectDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdateAssignProject(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully!";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult InsertCreateTask(CreateTask entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.CreatedBy = EnterpriseUserModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseUserModel.UserID ?? 0;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                }
                else if (AdminUserModel != null)
                {
                    entity.CreatedBy = AdminUserModel.UserID ?? 0;
                    entity.UpdatedBy = AdminUserModel.UserID ?? 0;
                }
                else
                {
                    entity.CreatedBy = UserModel.UserID ?? 0;
                    entity.UpdatedBy = UserModel.UserID ?? 0;
                }

                long id = dl.InsertCreateTask(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AssignAssessmentToSMME(AssignAssessmentToSMME entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.AAS_EnterpriseId = EnterpriseUserModel.UM_MainID;
                entity.CreatedBy = EnterpriseUserModel.UserID;
                entity.UpdatedBy = EnterpriseUserModel.UserID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                entity.AAS_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.AssignAssessmentToSMME(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AssignProjectToSMME(AssignProjectToSmme entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {

                if (EnterpriseUserModel != null)
                {
                    entity.CreatedBy = EnterpriseUserModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseUserModel.UserID ?? 0;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                }
                else if (AdminUserModel != null)
                {
                    entity.CreatedBy = AdminUserModel.UserID ?? 0;
                    entity.UpdatedBy = AdminUserModel.UserID ?? 0;
                }
                else
                {
                    entity.CreatedBy = UserModel.UserID ?? 0;
                    entity.UpdatedBy = UserModel.UserID ?? 0;
                }
                long id = dl.AssignProjectToSMME(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertCreateActivity(CreateActivity entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.CreatedBy = EnterpriseUserModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseUserModel.UserID ?? 0;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                }
                else if (AdminUserModel != null)
                {
                    entity.CreatedBy = AdminUserModel.UserID ?? 0;
                    entity.UpdatedBy = AdminUserModel.UserID ?? 0;
                }
                else
                {
                    entity.CreatedBy = UserModel.UserID ?? 0;
                    entity.UpdatedBy = UserModel.UserID ?? 0;
                }

                long id = dl.InsertCreateActivity(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertUpdateAssessmentQuesDetails(AssessmentQuesDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertUpdateAssessmentQuesDetails(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Details is already Exists...";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CustomerTypeSetUp(CustomerTypeSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<CustomerTypeSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CustomerTypeSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<CustomerTypeSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult JobCategoriesSetUp(JobCategoriesSetUp entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<JobCategoriesSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = -1;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Category Allready Exist...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult JobCategoriesSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<JobCategoriesSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertCustomerDetails(CustomerDetails cust)
        {
            StatusResponse Status = new StatusResponse();
            if (EnterpriseUserModel != null)
            {
                cust.CD_EnterpriseId = EnterpriseUserModel.UM_MainID;
                cust.UserId = EnterpriseUserModel.UserID;
                cust.CreatedBy = EnterpriseUserModel.UserID;
                cust.UpdatedBy = EnterpriseUserModel.UserID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                cust.CD_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                cust.UserId = EnterpriseEMPUserDataModel.UserID;
                cust.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                cust.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
            }
            else if (SMMEUserModel != null)
            {
                cust.CD_SmmeId = SMMEUserModel.UM_MainID;
                cust.UserId = SMMEUserModel.UserID;
                cust.CreatedBy = SMMEUserModel.UserID;
                cust.UpdatedBy = SMMEUserModel.UserID;
            }
            else if (SMMEUserEmpModel != null)
            {
                cust.CD_SmmeId = SMMEUserEmpModel.UM_MainID;
                cust.UserId = SMMEUserEmpModel.UserID;
                cust.CreatedBy = SMMEUserEmpModel.UserID;
                cust.UpdatedBy = SMMEUserEmpModel.UserID;
            }
            else if (AdminUserModel != null)
            {
                cust.UserId = AdminUserModel.UserID;
                cust.CreatedBy = AdminUserModel.UserID;
                cust.UpdatedBy = AdminUserModel.UserID;
            }
            else if (UserModel != null)
            {
                cust.UserId = UserModel.UserID;
                cust.CreatedBy = UserModel.UserID;
                cust.UpdatedBy = UserModel.UserID;
            }

            try
            {
                long id = dl.InsertCustomerDetails(cust);

                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Email Already Exists...";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Contact Number Already Exists...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetCustomerDetailsAdmin(GlobalData global)
        {
            DataSet ds = new DataSet();
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            CustomerDetails user = new CustomerDetails();
            user = GetItem1<CustomerDetails>(ds.Tables[0]);
            var Srecord = user;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertDeleteEnterpriseWiseCust(CustomerDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertDeleteEnterpriseWiseCust(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertDeleteSMMEWiseCust(CustomerDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertDeleteSMMEWiseCust(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult InsertJobDetails(JobDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.JD_EnterpriseId = EnterpriseUserModel.UM_MainID;
                    entity.CreatedBy = EnterpriseUserModel.UserID;
                    entity.UpdatedBy = EnterpriseUserModel.UserID;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.JD_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;

                }
                else if (AdminUserModel != null)
                {
                    entity.CreatedBy = AdminUserModel.UserID;
                    entity.UpdatedBy = AdminUserModel.UserID;
                }
                else if (UserModel != null)
                {
                    entity.CreatedBy = UserModel.UserID;
                    entity.UpdatedBy = UserModel.UserID;
                }

                long id = dl.InsertJobDetails(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertJobDetailsForStakeholder(JobDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.JD_EnterpriseId = EnterpriseUserModel.StakeHolderId;
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    entity.JD_EnterpriseId = EnterpriseEMPUserDataModel.StakeHolderId;

                }
                long id = dl.InsertJobDetails(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetJobDetailsForAdmin(GlobalData global)
        {
            DataSet ds = new DataSet();
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobDetails user = new JobDetails();
            user = GetItem1<JobDetails>(ds.Tables[0]);
            var Srecord = user;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AssignJobToEnterpriseUser(AssignJobToUser entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.AssignJobToEnterpriseUser(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetJobData(GlobalData global)
        {
            DataSet ds = new DataSet();
            int? mainId = 0;
            int? userid = 0;
            if (EnterpriseUserModel != null)
            {
                userid = EnterpriseUserModel.UserID;
                mainId = EnterpriseUserModel.UM_MainID;
            }
            else if (UserModel != null)
            {
                userid = UserModel.UserID;
                mainId = UserModel.UM_MainID;
            }

            if (global.TransactionType == "AllSMMEForEnterprise")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "CountSMMEByEnterprise")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectAllEnterpriseUser")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectProjectForEnterprise")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectSmmeAssessmentForEnterprise")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectAllBuildQuestionForEnterp")
            {
                global.param1Value = mainId;
            }
            if (global.TransactionType == "SelectAssignAssessmnetforEnterp")
            {
                global.param1Value = mainId;
            }
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobDetails jdSingle = new JobDetails();
            if (ds.Tables.Count > 1)
            {
                jdSingle = GetItem1<JobDetails>(ds.Tables[0]);

                jdSingle.MultipleJobDetailsList = ConvertDataTable<MultipleJobDetails>(ds.Tables[1]);
                jdSingle.MaintenanceJobDetailsList = ConvertDataTable<MaintenanceJobDetails>(ds.Tables[2]);
            }
            var Srecord = jdSingle;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertRecordForProgress(JobProgress entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.UserId = EnterpriseUserModel.UserID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                entity.UserId = EnterpriseEMPUserDataModel.UserID;
            }
            if (SMMEUserModel != null)
            {
                entity.UserId = SMMEUserModel.UserID;
            }
            if (SMMEUserEmpModel != null)
            {
                entity.UserId = SMMEUserEmpModel.UserID;
            }

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertRecordForProgress(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AssignJobToEnterprise(JobDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.AssignJobToEnterprise(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertTeamBuildingForSMME(BuildTeam entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (SMMEUserModel != null)
                {
                    entity.BT_SMMEId = SMMEUserModel.UM_MainID;
                    entity.CreatedBy = SMMEUserModel.UserID;
                    entity.UpdatedBy = SMMEUserModel.UserID;
                }
                else if (SMMEUserEmpModel != null)
                {
                    entity.BT_SMMEId = SMMEUserEmpModel.UM_MainID;
                    entity.CreatedBy = SMMEUserEmpModel.UserID;
                    entity.UpdatedBy = SMMEUserEmpModel.UserID;
                }

                long id = dl.InsertTeamBuildingForSMME(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetTeamUserData(GlobalData global)
        {
            DataSet ds = new DataSet();

            ds = dl.GetGlobalMasterTransactionSingle1(global);
            BuildTeam QesSet = new BuildTeam();
            if (ds.Tables.Count > 1)
            {
                QesSet = GetItem1<BuildTeam>(ds.Tables[0]);
                DataTable dt = ds.Tables[1];
                QesSet.BuildTeamUserList = new string[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    QesSet.BuildTeamUserList[i] = dt.Rows[i]["UM_Name"].ToString();
                }
            }
            var Srecord = QesSet;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateUploadStatus(JobProgress entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdateUploadStatus(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertRecordForProgressComment(JobProgress entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.UserId = EnterpriseUserModel.UserID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                entity.UserId = EnterpriseEMPUserDataModel.UserID;
            }
            if (SMMEUserModel != null)
            {
                entity.UserId = SMMEUserModel.UserID;
            }
            if (SMMEUserEmpModel != null)
            {
                entity.UserId = SMMEUserEmpModel.UserID;
            }

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertRecordForProgressComment(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertBranchDetails(BranchDetails brnch)
        {
            StatusResponse Status = new StatusResponse();
            if (EnterpriseUserModel != null)
            {
                brnch.BD_EnterpriseId = EnterpriseUserModel.UM_MainID;
                brnch.CreatedBy = EnterpriseUserModel.UserID;
                brnch.UpdatedBy = EnterpriseUserModel.UserID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                brnch.BD_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                brnch.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                brnch.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
            }
            if (SMMEUserModel != null)
            {
                brnch.BD_SmmeId = SMMEUserModel.UM_MainID;
            }
            if (SMMEUserEmpModel != null)
            {
                brnch.BD_SmmeId = SMMEUserEmpModel.UM_MainID;
            }
            try
            {
                long id = dl.InsertBranchDetails(brnch);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }

                else if (id == -3)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This branch already exists";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This email already exists";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This phone number already exists";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AssignSMMEToBranch(BranchDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.CreatedBy = EnterpriseUserModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseUserModel.UserID ?? 0;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID ?? 0;
                }

                long id = dl.AssignSMMEToBranch(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AssignUserToBranch(BranchDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.AssignUserToBranch(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AssignProjectToBranch(BranchDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.AssignProjectToBranch(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AssignJobToSMMEUser(AssignJobToUser entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.AssignJobToSMMEUser(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AssignTaskToSMMEUser(CreateTask entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.AssignTaskToSMMEUser(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetBranchDetailsAdmin(GlobalData global)
        {
            DataSet ds = new DataSet();
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            BranchDetails brnch = new BranchDetails();
            brnch = GetItem1<BranchDetails>(ds.Tables[0]);
            var Srecord = brnch;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateWhiteListing(EnterpriseRegistration entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdateWhiteListing(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertTeamBuildingForEnterprise(BuildTeam entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.BT_ENR_Id = EnterpriseUserModel.UM_MainID;
                }
                long id = dl.InsertTeamBuildingForEnterprise(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AssignProjectToSMMEUser(ProjectDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (SMMEUserModel != null)
                {
                    entity.UWP_MainId = SMMEUserModel.UM_MainID;
                }
                else
                {
                    entity.UWP_MainId = SMMEUserEmpModel.UM_MainID;
                }
                long id = dl.AssignProjectToSMMEUser(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UploadAssessment(FormCollection frm)
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {

                        HttpPostedFileBase file = files[i];
                        string fname;

                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }
                        string uploadpath = frm["uploadPath"];
                        uploadpath = string.IsNullOrEmpty(uploadpath) ? "../AssessmentUpload/" : uploadpath;
                        fname = Path.Combine(Server.MapPath(uploadpath), fname);
                        file.SaveAs(fname);
                    }
                    return Json("File Uploaded Successfully!");
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json("Data Saved But No File Selected");
            }
        }

        [HttpPost]
        public JsonResult UpdateUploadTaskStatus(TaskProgress entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdateUploadTaskStatus(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertRecordForTaskProgressComment(TaskProgress entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.UserId = EnterpriseUserModel.UserID;
            }
            if (SMMEUserModel != null)
            {
                entity.UserId = SMMEUserModel.UserID;
            }
            if (SMMEUserEmpModel != null)
            {
                entity.UserId = SMMEUserEmpModel.UserID;
            }

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertRecordForTaskProgressComment(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertRecordTaskForProgress(TaskProgress entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.UserId = EnterpriseUserModel.UserID;
            }
            if (SMMEUserModel != null)
            {
                entity.UserId = SMMEUserModel.UserID;
            }

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertRecordForTaskProgress(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertUpdateProjectBudget(ProjectBudgetDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertUpdateProjectBudget(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateProjectBudgetFundDetails(ProjectBudgetFundDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertUpdateProjectBudgetFundDetails(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -2)
                {

                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "Data Duplicate";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }

            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateBudgetAllocationForActivity(BudgetAllocation entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertUpdateBudgetAllocationForActivity(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateBudgetAllocationForTask(BudgetAllocation entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertUpdateBudgetAllocationForTask(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateBudgetAllocationForSMME(BudgetAllocation entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertUpdateBudgetAllocationForSMME(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateBudgetAllocationForSMMEExpenditure(BudgetAllocation entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertUpdateBudgetAllocationForSMMEExpenditure(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateProjectWiseDocument(ProjectWiseDocument entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {

                long id = dl.InsertUpdateProjectWiseDocument(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult BudgetTypeSetUp(BudgetType entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<BudgetType>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult BudgetTypeSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<BudgetType>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult InsertUpdateUser(UserModel entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (entity.Role != "")
                {
                    if (EnterpriseUserModel != null)
                    {
                        entity.Role = "E";

                    }
                    else if (SMMEUserModel != null)
                    {
                        entity.Role = "S";
                    }
                    else if (UserModel != null)
                    {
                        if (entity.Role == "E")
                        {
                            entity.Role = "E";
                        }
                        else
                        {
                            entity.Role = "A";
                        }
                    }
                }
                long id = dl.InsertUpdateUser(entity);
                if (id > 0)
                {
                    if (entity.Password != null)
                    {
                        Status.Id = 1;
                        Status.ExMessage = "";
                        Status.IsSuccess = true;
                        Status.Message = "Record saved successfully...";
                    }
                    else
                    {
                        Status.Id = 1;
                        Status.ExMessage = "";
                        Status.IsSuccess = true;
                        Status.Message = "Record saved successfully...";
                    }
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult EnterpriseUserPhotoUpdate(UserModel entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.EnterpriseUserPhotoUpdate(entity);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo Uploaded Successfully!";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo not uploaded successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EnterpriseDocUpdateForJob(JobDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.EnterpriseDocUpdateForJob(entity);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo Uploaded Successfully!";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo not uploaded successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CustomerPhotoUpdate(CustomerDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.CustomerPhotoUpdate(entity);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo Uploaded Successfully!";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Photo not uploaded successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult FundTypeSetUp(FundType entity)
        {
            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<FundType>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult FundTypeSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<FundType>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetAdminUser(GlobalData global)
        {
            DataSet ds = new DataSet();
            if (UserModel != null)
            {
                global.param2Value = UserModel.UM_MainID;
            }
            if (AdminUserModel != null)
            {

                global.param2Value = AdminUserModel.UM_MainID;
            }
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            UserModel user = new UserModel();
            user = GetItem1<UserModel>(ds.Tables[0]);
            var Srecord = user;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertAdminUserFromAdmin(UserModel User)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (UserModel != null)
                {
                    User.CreatedBy = UserModel.UserID;
                    User.UpdatedBy = UserModel.UserID;
                }
                if (AdminUserModel != null)
                {
                    User.CreatedBy = AdminUserModel.UserID;
                    User.UpdatedBy = AdminUserModel.UserID;
                }

                long id = dl.InsertAdminUserFromAdmin(User);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Email  Already Exists...";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This  Phone Number Already Exists...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }
            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed...";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertSMMEUser(UserModel User)
        {
            if (SMMEUserModel != null)
            {
                User.UserID = SMMEUserModel.UserID;
                User.UM_MainID = SMMEUserModel.UM_MainID;
                User.CreatedBy = SMMEUserModel.UserID;
                User.UpdatedBy = SMMEUserModel.UserID;
            }
            else if (SMMEUserEmpModel != null)
            {
                User.UserID = SMMEUserEmpModel.UserID;
                User.UM_MainID = SMMEUserEmpModel.UM_MainID;
                User.CreatedBy = SMMEUserEmpModel.UserID;
                User.UpdatedBy = SMMEUserEmpModel.UserID;
            }

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertSMMEUser(User);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Email  Already Exists...";
                }
                else if (id == -2)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This  Phone Number Already Exists...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertCostManagement(CostManagement cost)
        {
            StatusResponse Status = new StatusResponse();

            if (SMMEUserModel != null)
            {
                cost.CM_SMMEId = SMMEUserModel.UM_MainID;
            }
            try
            {
                long id = dl.InsertCostManagement(cost);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }

                else if (id == -3)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Type and Type Name Exists...";
                }

                else if (id == -1)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "This Phone Number Already Exists...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertJobInvoice(JobInvoice entity)
        {
            StatusResponse Status = new StatusResponse();

            if (SMMEUserModel != null)
            {
                entity.JI_SMMEId = SMMEUserModel.UM_MainID;
                entity.UserId = SMMEUserModel.UserID;
            }
            try
            {
                long id = dl.InsertJobInvoice(entity);

                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }

                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetInvoiceData(GlobalData global)
        {
            DataSet ds = new DataSet();

            global.param2Value = SMMEUserModel.UM_MainID;
            global.param2 = "JI_SMMEId";
            global.StoreProcedure = "JobInvoice_USP";
            global.TransactionType = "SelectForInvoicePreview";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobInvoice job = new JobInvoice();
            if (ds.Tables.Count > 1)
            {
                job.JobInvoiceTransactionList = ConvertDataTable<JobInvoiceTransaction>(ds.Tables[1]);
            }
            var Srecord = job;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public ActionResult GetUserLoginForWhitelisting(GlobalData global)
        {
            DataSet ds = new DataSet();
            UserModel UserObj = new UserModel();
            UserObj = dl.GetUserLoginForWhitelisting(global.param1Value);
            GlobalPages PageName = new GlobalPages();
            PageName.PageName = "EnterpriseLogin";
            Session["EnterpriseUserDataModel"] = UserObj;
            Session["LoginPageName"] = PageName;
            return RedirectToAction("EnterpriseDashboard", "Enterprise");
        }
        public ActionResult GetUserLoginForInactiveWhitelisting(GlobalData global)
        {
            DataSet ds = new DataSet();
            UserModel UserObj = new UserModel();
            UserObj = dl.GetUserLoginForInactiveWhitelisting(global.param1Value);
            UserObj.UM_MainID = global.param1Value;
            GlobalPages PageName = new GlobalPages();
            PageName.PageName = "EnterpriseLogin";
            Session["EnterpriseUserDataModel"] = UserObj;
            Session["LoginPageName"] = PageName;
            return RedirectToAction("EnterpriseProfileComplete", "Enterprise");
        }
        public ActionResult GetUSMMELoginForAfterReg(GlobalData global)
        {
            DataSet ds = new DataSet();
            UserModel UserObj = new UserModel();
            UserObj = dl.GetUSMMELoginForAfterReg(global.param1Value);
            GlobalPages PageName = new GlobalPages();
            PageName.PageName = "SMMELogin";
            Session["SMMEUserDataModel"] = UserObj;
            Session["LoginPageName"] = PageName;
            return RedirectToAction("SMMEDashboard", "SMME");
        }

        public ActionResult UploadBulkSMMEForAdmin(FormCollection frm)
        {
            StatusResponse Status = new StatusResponse();
            DataTable dataTable = new DataTable();

            dataTable.Columns.Add("SMME_CompanyName", typeof(string));
            dataTable.Columns.Add("SMME_RegNumber", typeof(string));
            dataTable.Columns.Add("SMME_SectorId", typeof(string));
            dataTable.Columns.Add("SMME_SMMETypeId", typeof(string));
            dataTable.Columns.Add("SMME_CountryId", typeof(string));
            dataTable.Columns.Add("SMME_ProvinceId", typeof(string));
            dataTable.Columns.Add("SMME_BusinessAddress", typeof(string));
            dataTable.Columns.Add("SMME_Address2", typeof(string));
            dataTable.Columns.Add("SMME_PostalCode", typeof(string));
            dataTable.Columns.Add("SMME_City", typeof(string));
            dataTable.Columns.Add("SMME_Subarb", typeof(string));
            dataTable.Columns.Add("SMME_LegalEntityTypeId", typeof(string));
            dataTable.Columns.Add("SMME_TaxNumber", typeof(string));
            dataTable.Columns.Add("SMME_VatNumber", typeof(string));
            dataTable.Columns.Add("SMME_IncorporationDate", typeof(string));
            dataTable.Columns.Add("SMME_RegNum2", typeof(string));
            dataTable.Columns.Add("SMME_PrimaryContactName", typeof(string));
            dataTable.Columns.Add("SMME_PrimaryContactEmail", typeof(string));
            dataTable.Columns.Add("SMME_SecondaryContactName", typeof(string));
            dataTable.Columns.Add("SMME_SecondaryContactEmail", typeof(string));
            dataTable.Columns.Add("SMME_BillingContactNumber", typeof(string));
            dataTable.Columns.Add("SMME_BillingAddress", typeof(string));
            dataTable.Columns.Add("SMME_PrimaryContactNo", typeof(string));
            dataTable.Columns.Add("SMME_SecondaryContactNo", typeof(string));
            dataTable.Columns.Add("SMME_BEElevel", typeof(string));
            dataTable.Columns.Add("SMME_ProtfolioGrowth", typeof(string));
            dataTable.Columns.Add("SMME_BlckWomen", typeof(string));

            dataTable.Columns.Add("SMME_EnterpriseId", typeof(string));
            dataTable.Columns.Add("SMME_BusinessDes", typeof(string));
            dataTable.Columns.Add("SMME_WebsiteURL", typeof(string));
            dataTable.Columns.Add("SMME_SocialMediaLink", typeof(string));
            dataTable.Columns.Add("SMME_Prefix", typeof(string));
            dataTable.Columns.Add("SMME_Logo", typeof(string));
            dataTable.Columns.Add("SMME_Active", typeof(bool));
            dataTable.Columns.Add("SMME_Pending", typeof(bool));
            dataTable.Columns.Add("SMME_Deactivate", typeof(bool));

            if (Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        string fname;

                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        if (file != null && file.ContentLength > 0)
                        {
                            using (var package = new ExcelPackage(file.InputStream))
                            {
                                var worksheet = package.Workbook.Worksheets[0];
                                var rowCount = worksheet.Dimension.Rows;
                                var colCount = worksheet.Dimension.Columns;

                                for (int row = 2; row <= rowCount; row++)
                                {
                                    DataRow dataRow = dataTable.NewRow();

                                    dataRow["SMME_CompanyName"] = worksheet.Cells[row, 1].Text;
                                    dataRow["SMME_RegNumber"] = worksheet.Cells[row, 2].Text;
                                    dataRow["SMME_SectorId"] = worksheet.Cells[row, 3].Text;
                                    dataRow["SMME_SMMETypeId"] = worksheet.Cells[row, 4].Text;
                                    dataRow["SMME_CountryId"] = worksheet.Cells[row, 5].Text;
                                    dataRow["SMME_ProvinceId"] = worksheet.Cells[row, 6].Text;
                                    dataRow["SMME_BusinessAddress"] = worksheet.Cells[row, 7].Text;
                                    dataRow["SMME_Address2"] = worksheet.Cells[row, 8].Text;
                                    dataRow["SMME_PostalCode"] = worksheet.Cells[row, 9].Text;
                                    dataRow["SMME_City"] = worksheet.Cells[row, 10].Text;
                                    dataRow["SMME_Subarb"] = worksheet.Cells[row, 11].Text;
                                    dataRow["SMME_LegalEntityTypeId"] = worksheet.Cells[row, 12].Text;
                                    dataRow["SMME_TaxNumber"] = worksheet.Cells[row, 13].Text;
                                    dataRow["SMME_VatNumber"] = worksheet.Cells[row, 14].Text;
                                    dataRow["SMME_IncorporationDate"] = worksheet.Cells[row, 15].Text;
                                    dataRow["SMME_RegNum2"] = worksheet.Cells[row, 16].Text;
                                    dataRow["SMME_PrimaryContactName"] = worksheet.Cells[row, 17].Text;
                                    dataRow["SMME_PrimaryContactEmail"] = worksheet.Cells[row, 18].Text;
                                    dataRow["SMME_SecondaryContactName"] = worksheet.Cells[row, 19].Text;
                                    dataRow["SMME_SecondaryContactEmail"] = worksheet.Cells[row, 20].Text;
                                    dataRow["SMME_BillingContactNumber"] = worksheet.Cells[row, 21].Text;
                                    dataRow["SMME_BillingAddress"] = worksheet.Cells[row, 22].Text;
                                    dataRow["SMME_PrimaryContactNo"] = worksheet.Cells[row, 23].Text;
                                    dataRow["SMME_SecondaryContactNo"] = worksheet.Cells[row, 24].Text;
                                    dataRow["SMME_BEElevel"] = worksheet.Cells[row, 25].Text;
                                    dataRow["SMME_ProtfolioGrowth"] = worksheet.Cells[row, 26].Text;
                                    dataRow["SMME_BlckWomen"] = worksheet.Cells[row, 27].Text;

                                    dataRow["SMME_EnterpriseId"] = "";
                                    dataRow["SMME_BusinessDes"] = "";
                                    dataRow["SMME_WebsiteURL"] = "";
                                    dataRow["SMME_SocialMediaLink"] = "";
                                    dataRow["SMME_Prefix"] = "";
                                    dataRow["SMME_Logo"] = "";

                                    string sMME_Active = null;
                                    if (string.IsNullOrEmpty(sMME_Active))
                                    {
                                        dataRow["SMME_Active"] = DBNull.Value;
                                    }
                                    else
                                    {
                                        bool parsedValue;
                                        if (bool.TryParse(sMME_Active, out parsedValue))
                                        {
                                            dataRow["SMME_Active"] = parsedValue;
                                        }
                                        else
                                        {
                                            dataRow["SMME_Active"] = DBNull.Value; // or `false` depending on your requirements
                                        }
                                    }

                                    string sMME_Pending = null;
                                    if (string.IsNullOrEmpty(sMME_Pending))
                                    {
                                        dataRow["SMME_Pending"] = true;
                                    }
                                    else
                                    {
                                        bool parsedValue;
                                        if (bool.TryParse(sMME_Pending, out parsedValue))
                                        {
                                            dataRow["SMME_Pending"] = true;
                                        }
                                        else
                                        {
                                            dataRow["SMME_Pending"] = true; // or `false` depending on your requirements
                                        }
                                    }

                                    string sMME_Deactivate = null;
                                    if (string.IsNullOrEmpty(sMME_Deactivate))
                                    {
                                        dataRow["SMME_Pending"] = DBNull.Value;
                                    }
                                    else
                                    {
                                        bool parsedValue;
                                        if (bool.TryParse(sMME_Deactivate, out parsedValue))
                                        {
                                            dataRow["SMME_Deactivate"] = parsedValue;
                                        }
                                        else
                                        {
                                            dataRow["SMME_Deactivate"] = DBNull.Value; // or `false` depending on your requirements
                                        }
                                    }

                                    dataTable.Rows.Add(dataRow);
                                }
                            }
                        }
                    }

                    var getData = dl.InsertBulkSMMEForAdmin(dataTable);
                    if (getData.Item2 > 0)
                    {
                        Status.Id = getData.Item2;
                        Status.ExMessage = getData.Item1;
                        Status.IsSuccess = true;
                        Status.Message = "Your changes were saved successfully";
                    }
                    else
                    {
                        Status.Id = getData.Item2;
                        Status.ExMessage = getData.Item1;
                        Status.IsSuccess = true;
                        Status.Message = getData.Item1;
                    }
                }
                catch (Exception ex)
                {
                    Status.Id = -1;
                    Status.IsSuccess = false;
                    Status.ExMessage = ex.Message;
                    Status.Message = "Process failed..!";
                }
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UploadBulkSMMEForEnterprise(FormCollection frm)
        {
            StatusResponse Status = new StatusResponse();
            DataTable dataTable = new DataTable();

            dataTable.Columns.Add("SMME_CompanyName", typeof(string));
            dataTable.Columns.Add("SMME_RegNumber", typeof(string));
            dataTable.Columns.Add("SMME_SectorId", typeof(string));
            dataTable.Columns.Add("SMME_SMMETypeId", typeof(string));
            dataTable.Columns.Add("SMME_CountryId", typeof(string));
            dataTable.Columns.Add("SMME_ProvinceId", typeof(string));
            dataTable.Columns.Add("SMME_BusinessAddress", typeof(string));
            dataTable.Columns.Add("SMME_Address2", typeof(string));
            dataTable.Columns.Add("SMME_PostalCode", typeof(string));
            dataTable.Columns.Add("SMME_City", typeof(string));
            dataTable.Columns.Add("SMME_Subarb", typeof(string));
            dataTable.Columns.Add("SMME_LegalEntityTypeId", typeof(string));
            dataTable.Columns.Add("SMME_TaxNumber", typeof(string));
            dataTable.Columns.Add("SMME_VatNumber", typeof(string));
            dataTable.Columns.Add("SMME_IncorporationDate", typeof(string));
            dataTable.Columns.Add("SMME_RegNum2", typeof(string));
            dataTable.Columns.Add("SMME_PrimaryContactName", typeof(string));
            dataTable.Columns.Add("SMME_PrimaryContactEmail", typeof(string));
            dataTable.Columns.Add("SMME_SecondaryContactName", typeof(string));
            dataTable.Columns.Add("SMME_SecondaryContactEmail", typeof(string));
            dataTable.Columns.Add("SMME_BillingContactNumber", typeof(string));
            dataTable.Columns.Add("SMME_BillingAddress", typeof(string));
            dataTable.Columns.Add("SMME_PrimaryContactNo", typeof(string));
            dataTable.Columns.Add("SMME_SecondaryContactNo", typeof(string));
            dataTable.Columns.Add("SMME_BEElevel", typeof(string));
            dataTable.Columns.Add("SMME_ProtfolioGrowth", typeof(string));
            dataTable.Columns.Add("SMME_BlckWomen", typeof(string));

            dataTable.Columns.Add("SMME_PrimaryIdType", typeof(string));
            dataTable.Columns.Add("SMME_PrimaryIdNumber", typeof(string));
            dataTable.Columns.Add("SMME_SecondaryIdType", typeof(string));
            dataTable.Columns.Add("SMME_SecondaryIdNumber", typeof(string));

            dataTable.Columns.Add("SMME_EnterpriseId", typeof(string));
            dataTable.Columns.Add("SMME_BusinessDes", typeof(string));
            dataTable.Columns.Add("SMME_WebsiteURL", typeof(string));
            dataTable.Columns.Add("SMME_SocialMediaLink", typeof(string));
            dataTable.Columns.Add("SMME_Prefix", typeof(string));
            dataTable.Columns.Add("SMME_Logo", typeof(string));
            dataTable.Columns.Add("SMME_Active", typeof(bool));
            dataTable.Columns.Add("SMME_Pending", typeof(bool));
            dataTable.Columns.Add("SMME_Deactivate", typeof(bool));

            if (Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        string fname;

                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        if (file != null && file.ContentLength > 0)
                        {
                            using (var package = new ExcelPackage(file.InputStream))
                            {
                                var worksheet = package.Workbook.Worksheets[0];
                                var rowCount = worksheet.Dimension.Rows;
                                var colCount = worksheet.Dimension.Columns;

                                for (int row = 2; row <= rowCount; row++)
                                {
                                    DataRow dataRow = dataTable.NewRow();

                                    dataRow["SMME_CompanyName"] = worksheet.Cells[row, 1].Text;
                                    dataRow["SMME_RegNumber"] = worksheet.Cells[row, 2].Text;
                                    dataRow["SMME_SectorId"] = worksheet.Cells[row, 3].Text;
                                    dataRow["SMME_SMMETypeId"] = worksheet.Cells[row, 4].Text;
                                    dataRow["SMME_CountryId"] = worksheet.Cells[row, 5].Text;
                                    dataRow["SMME_ProvinceId"] = worksheet.Cells[row, 6].Text;
                                    dataRow["SMME_BusinessAddress"] = worksheet.Cells[row, 7].Text;
                                    dataRow["SMME_Address2"] = worksheet.Cells[row, 8].Text;
                                    dataRow["SMME_PostalCode"] = worksheet.Cells[row, 9].Text;
                                    dataRow["SMME_City"] = worksheet.Cells[row, 10].Text;
                                    dataRow["SMME_Subarb"] = worksheet.Cells[row, 11].Text;
                                    dataRow["SMME_LegalEntityTypeId"] = worksheet.Cells[row, 12].Text;
                                    dataRow["SMME_TaxNumber"] = worksheet.Cells[row, 13].Text;
                                    dataRow["SMME_VatNumber"] = worksheet.Cells[row, 14].Text;
                                    dataRow["SMME_IncorporationDate"] = worksheet.Cells[row, 15].Text;
                                    dataRow["SMME_RegNum2"] = worksheet.Cells[row, 16].Text;
                                    dataRow["SMME_PrimaryContactName"] = worksheet.Cells[row, 17].Text;
                                    dataRow["SMME_PrimaryContactEmail"] = worksheet.Cells[row, 18].Text;
                                    dataRow["SMME_SecondaryContactName"] = worksheet.Cells[row, 19].Text;
                                    dataRow["SMME_SecondaryContactEmail"] = worksheet.Cells[row, 20].Text;
                                    dataRow["SMME_BillingContactNumber"] = worksheet.Cells[row, 21].Text;
                                    dataRow["SMME_BillingAddress"] = worksheet.Cells[row, 22].Text;
                                    dataRow["SMME_PrimaryContactNo"] = worksheet.Cells[row, 23].Text;
                                    dataRow["SMME_SecondaryContactNo"] = worksheet.Cells[row, 24].Text;
                                    dataRow["SMME_BEElevel"] = worksheet.Cells[row, 25].Text;
                                    dataRow["SMME_ProtfolioGrowth"] = worksheet.Cells[row, 26].Text;
                                    dataRow["SMME_BlckWomen"] = worksheet.Cells[row, 27].Text;

                                    dataRow["SMME_PrimaryIdType"] = worksheet.Cells[row, 28].Text;
                                    dataRow["SMME_PrimaryIdNumber"] = worksheet.Cells[row, 29].Text;
                                    dataRow["SMME_SecondaryIdType"] = worksheet.Cells[row, 30].Text;
                                    dataRow["SMME_SecondaryIdNumber"] = worksheet.Cells[row, 31].Text;

                                    dataRow["SMME_EnterpriseId"] = "";
                                    dataRow["SMME_BusinessDes"] = "";
                                    dataRow["SMME_WebsiteURL"] = "";
                                    dataRow["SMME_SocialMediaLink"] = "";
                                    dataRow["SMME_Prefix"] = "";
                                    dataRow["SMME_Logo"] = "";

                                    string sMME_Active = null;
                                    if (string.IsNullOrEmpty(sMME_Active))
                                    {
                                        dataRow["SMME_Active"] = DBNull.Value;
                                    }
                                    else
                                    {
                                        bool parsedValue;
                                        if (bool.TryParse(sMME_Active, out parsedValue))
                                        {
                                            dataRow["SMME_Active"] = parsedValue;
                                        }
                                        else
                                        {
                                            dataRow["SMME_Active"] = DBNull.Value; // or `false` depending on your requirements
                                        }
                                    }

                                    string sMME_Pending = null;
                                    if (string.IsNullOrEmpty(sMME_Pending))
                                    {
                                        dataRow["SMME_Pending"] = true;
                                    }
                                    else
                                    {
                                        bool parsedValue;
                                        if (bool.TryParse(sMME_Pending, out parsedValue))
                                        {
                                            dataRow["SMME_Pending"] = true;
                                        }
                                        else
                                        {
                                            dataRow["SMME_Pending"] = true; // or `false` depending on your requirements
                                        }
                                    }

                                    string sMME_Deactivate = null;
                                    if (string.IsNullOrEmpty(sMME_Deactivate))
                                    {
                                        dataRow["SMME_Pending"] = DBNull.Value;
                                    }
                                    else
                                    {
                                        bool parsedValue;
                                        if (bool.TryParse(sMME_Deactivate, out parsedValue))
                                        {
                                            dataRow["SMME_Deactivate"] = parsedValue;
                                        }
                                        else
                                        {
                                            dataRow["SMME_Deactivate"] = DBNull.Value; // or `false` depending on your requirements
                                        }
                                    }

                                    dataTable.Rows.Add(dataRow);
                                }
                            }
                        }
                    }

                    var getData = dl.InsertBulkSMMEForEnterprise(dataTable, EnterpriseUserModel.UM_MainID);
                    if (getData.Item2 > 0)
                    {
                        Status.Id = getData.Item2;
                        Status.ExMessage = getData.Item1;
                        Status.IsSuccess = true;
                        Status.Message = "Your changes were saved successfully";
                    }
                    else
                    {
                        Status.Id = getData.Item2;
                        Status.ExMessage = getData.Item1;
                        Status.IsSuccess = true;
                        Status.Message = getData.Item1;
                    }
                }
                catch (Exception ex)
                {
                    Status.Id = -1;
                    Status.IsSuccess = false;
                    Status.ExMessage = ex.Message;
                    Status.Message = "Process failed..!";
                }
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ExportToExcelDynamic(int? BaId, string smmeEmail)
        {
            global.TransactionType = "SelectBuildQuestionList";
            global.param1 = "BA_Id";
            global.param1Value = BaId;
            global.StoreProcedure = "BuildAssessmentSetUp_USP";
            DataTable dataTable = dl.GetGlobalMasterTransaction(global);

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet1");

                int qnIdColumnIndex = dataTable.Columns.IndexOf("BAD_QuestionId");
                int questionColumnIndex = dataTable.Columns.IndexOf("QN_Question");
                int segmentColumnIndex = dataTable.Columns.IndexOf("BAD_SegmentId");

                if (qnIdColumnIndex != -1 && questionColumnIndex != -1)
                {
                    worksheet.Cells[1, 1].Value = smmeEmail;

                    using (var range = worksheet.Cells[1, 1, 1, dataTable.Columns.Count])
                    {
                        range.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        range.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightBlue);
                    }

                    for (int row = 0; row < dataTable.Rows.Count; row++)
                    {
                        var segId = dataTable.Rows[row][segmentColumnIndex].ToString();
                        var qnId = dataTable.Rows[row][qnIdColumnIndex].ToString();
                        var question = dataTable.Rows[row][questionColumnIndex].ToString();

                        var combinedValue = $" {question} | {qnId} | {segId} ";

                        worksheet.Cells[1, row + 2].Value = combinedValue;
                    }

                    worksheet.Cells.AutoFitColumns();
                }

                var stream = new MemoryStream();
                package.SaveAs(stream);
                string fileName = "ExportedData.xlsx";
                string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                stream.Position = 0;
                return File(stream, contentType, fileName);
            }
        }

        public ActionResult AssessmentAnswerUpload(FormCollection frm)
        {
            DataTable parentDt = new DataTable();
            DataTable childDt = new DataTable();
            StatusResponse Status = new StatusResponse();
            int? BaId = frm["BAId"] != null ? Convert.ToInt32(frm["BAId"]) : (int?)null;
            int Id = frm["Id"] != null ? Convert.ToInt32(frm["Id"]) : 0;

            if (Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        string fname;

                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        if (file != null && file.ContentLength > 0)
                        {
                            using (var package = new ExcelPackage(file.InputStream))
                            {
                                var worksheet = package.Workbook.Worksheets[0];
                                var rowCount = worksheet.Dimension.Rows;
                                var colCount = worksheet.Dimension.Columns;

                                worksheet.Cells["1:1"].Style.Locked = true;

                                worksheet.Cells["2:" + rowCount].Style.Locked = false;

                                worksheet.Protection.IsProtected = true;
                                worksheet.Protection.SetPassword("UNLOCK123");

                                parentDt.Columns.Add("BaId", typeof(int));
                                parentDt.Columns.Add("Id", typeof(int));
                                parentDt.Columns.Add("SMME_Email", typeof(string));

                                childDt.Columns.Add("QsId", typeof(int));
                                childDt.Columns.Add("SegId", typeof(int));
                                childDt.Columns.Add("SMME_Email", typeof(string));
                                childDt.Columns.Add("Answer", typeof(string));

                                for (int row = 2; row <= rowCount; row++)
                                {
                                    DataRow parentRow = parentDt.NewRow();
                                    parentRow["SMME_Email"] = worksheet.Cells[row, 1].Text; // Column A: Email
                                    parentRow["BaId"] = BaId;
                                    parentRow["Id"] = Id;

                                    parentDt.Rows.Add(parentRow);
                                }

                                foreach (DataRow parentRow in parentDt.Rows)
                                {
                                    string smmeEmail = parentRow["SMME_Email"].ToString();

                                    for (int row = 2; row <= rowCount; row++)
                                    {
                                        if (worksheet.Cells[row, 1].Text == smmeEmail)
                                        {
                                            for (int col = 2; col <= colCount; col++)
                                            {
                                                string cellValue = worksheet.Cells[1, col].Text;

                                                if (!string.IsNullOrWhiteSpace(cellValue))
                                                {
                                                    var parts = cellValue.Split('|');
                                                    if (parts.Length == 3)
                                                    {
                                                        string question = parts[0].Trim();
                                                        string qsIdStr = parts[1].Trim();
                                                        string segIdStr = parts[2].Trim();

                                                        int qsId;
                                                        int segId;

                                                        qsId = int.TryParse(qsIdStr, out qsId) ? qsId : -1;
                                                        segId = int.TryParse(segIdStr, out segId) ? segId : -1;

                                                        DataRow childRow = childDt.NewRow();
                                                        childRow["SMME_Email"] = smmeEmail;
                                                        childRow["QsId"] = qsId;
                                                        childRow["SegId"] = segId;
                                                        childRow["Answer"] = worksheet.Cells[row, col].Text;

                                                        childDt.Rows.Add(childRow);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                    var getData = dl.AssessmentAnswerUpload(parentDt, childDt);
                    if (getData.Item2 > 0)
                    {
                        Status.Id = getData.Item2;
                        Status.ExMessage = getData.Item1;
                        Status.IsSuccess = true;
                        Status.Message = "Your changes were saved successfully";
                    }
                    else
                    {
                        Status.Id = getData.Item2;
                        Status.ExMessage = getData.Item1;
                        Status.IsSuccess = false;
                        Status.Message = getData.Item1;
                    }

                }
                catch (Exception ex)
                {
                    Status.Id = -1;
                    Status.IsSuccess = false;
                    Status.ExMessage = ex.Message;
                    Status.Message = "Process failed...";
                }
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateEnterpriseChatStatus(UserModel entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdateEnterpriseChatStatus(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUserStatus(int userId)
        {
            StatusResponse Status = new StatusResponse();
            try
            {

                var userStatus = dl.GetUserStatus(userId);

                if (!string.IsNullOrEmpty(userStatus))
                {
                    Status.IsSuccess = true;
                    Status.Message = userStatus;
                }
                else
                {
                    Status.IsSuccess = false;
                    Status.Message = "Status not found.";
                }
            }
            catch (Exception ex)
            {
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed...";
            }

            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertUpdateEnterpriseChatting(UserModel entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertUpdateEnterpriseChatting(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AssignProjectToStakeholder(ProjectDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {

                if (EnterpriseUserModel != null)
                {
                    entity.PWS_EnterpriseId = EnterpriseUserModel.UM_MainID;
                    entity.CreatedBy = EnterpriseUserModel.UserID;
                    entity.UpdatedBy = EnterpriseUserModel.UserID;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.PWS_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
                }

                long id = dl.AssignProjectToStakeholder(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AssignSMMEToStakeholder(SMMERegistration entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.SWS_EnterpriseId = EnterpriseUserModel.UM_MainID;
                    entity.CreatedBy = EnterpriseUserModel.UserID;
                    entity.UpdatedBy = EnterpriseUserModel.UserID;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.SWS_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
                }

                long id = dl.AssignSMMEToStakeholder(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AssignJobToStakeholder(JobDetails entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.SWJ_EnterpriseId = EnterpriseUserModel.UM_MainID;
                    entity.CreatedBy = EnterpriseUserModel.UserID;
                    entity.UpdatedBy = EnterpriseUserModel.UserID;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.SWJ_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
                }

                long id = dl.AssignJobToStakeholder(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AssignAssessmentToStakeholder(BuildAssessmentSetUp entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                if (EnterpriseUserModel != null)
                {
                    entity.SWA_EnterpriseId = EnterpriseUserModel.UM_MainID;
                    entity.CreatedBy = EnterpriseUserModel.UserID;
                    entity.UpdatedBy = EnterpriseUserModel.UserID;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    entity.SWA_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                    entity.CreatedBy = EnterpriseEMPUserDataModel.UserID;
                    entity.UpdatedBy = EnterpriseEMPUserDataModel.UserID;
                }

                long id = dl.AssignAssessmentToStakeholder(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ManagePermissionForStakeholder(ProjectDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.ManagePermissionForStakeholder(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdminReport(AdminReport rpt)
        {
            DataSet ds = new DataSet();
            if (UserModel != null)
            {
                rpt.UserId = UserModel.CompanyID;
            }
            if (AdminUserModel != null)
            {
                rpt.UserId = AdminUserModel.CompanyID;
            }
            AdminReport admnrpt = new AdminReport();
            admnrpt = dl.GetAdminReport(rpt);
            var Srecord = admnrpt;
            return Json(admnrpt, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdminReportForEnterpriseList(AdminReport rpt)
        {
            DataSet ds = new DataSet();
            if (UserModel != null)
            {
                rpt.UserId = UserModel.CompanyID;
            }
            if (AdminUserModel != null)
            {
                rpt.UserId = AdminUserModel.CompanyID;
            }
            AdminReport admnrpt = new AdminReport();
            admnrpt = dl.GetAdminReportForEnterpriseList(rpt);
            var Srecord = admnrpt;
            return Json(admnrpt, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdminReportForSMMEList(AdminReport rpt)
        {
            DataSet ds = new DataSet();
            if (UserModel != null)
            {
                rpt.UserId = UserModel.CompanyID;
            }
            if (AdminUserModel != null)
            {
                rpt.UserId = AdminUserModel.CompanyID;
            }
            AdminReport admnrpt = new AdminReport();
            admnrpt = dl.GetAdminReportForSMMEList(rpt);
            var Srecord = admnrpt;
            return Json(admnrpt, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdminReportForProjectList(AdminReport rpt)
        {
            DataSet ds = new DataSet();
            if (UserModel != null)
            {
                rpt.UserId = UserModel.CompanyID;
            }
            if (AdminUserModel != null)
            {
                rpt.UserId = AdminUserModel.CompanyID;
            }
            AdminReport admnrpt = new AdminReport();
            admnrpt = dl.GetAdminReportForProjectList(rpt);
            var Srecord = admnrpt;
            return Json(admnrpt, JsonRequestBehavior.AllowGet);
        }

        public class EmailService
        {
            public static string SendConfirmationEmail(string recipientEmail, string subject, string body, string msg)
            {
                try
                {
                    var smtpClient = new SmtpClient("mail.esdplatform.co.za")    // smtp.gmail.com
                    {
                        Port = 25,   //465, // Use port 465 for SSL or 587 for TLS
                        Credentials = new NetworkCredential("_mainaccount@esdplatform.co.za", "zCzmHteN&#7!75"),

                        EnableSsl = true
                    };

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("noreply@esdplatform.co.za"),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true
                    };

                    mailMessage.To.Add(recipientEmail);

                    smtpClient.Send(mailMessage);
                    return msg;
                }
                catch (SmtpException smtpEx)
                {
                    return "SMTP Error: " + smtpEx.Message;
                }
                catch (Exception smtpEx)
                {
                    return "SMTP Error: " + smtpEx.Message; ;
                }
            }
        }

        [HttpPost]
        public JsonResult UpdateProjectIsCompleted(ProjectDetails entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdateProjectIsCompleted(entity);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Project completed successfully..! ";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ChangeThemeStyle(UserModel User)
        {
            if (UserModel != null)
            {
                User.UM_Id = UserModel.UserID ?? 0;
            }
            else if (AdminUserModel != null)
            {
                User.UM_Id = AdminUserModel.UserID ?? 0;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                User.UM_Id = EnterpriseEMPUserDataModel.UserID ?? 0;
            }
            else if (EnterpriseUserModel != null)
            {
                User.UM_Id = EnterpriseUserModel.UserID ?? 0;
            }
            else if (SMMEUserModel != null)
            {
                User.UM_Id = SMMEUserModel.UserID ?? 0;
            }
            else if (SMMEUserEmpModel != null)
            {
                User.UM_Id = SMMEUserEmpModel.UserID ?? 0;
            }

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.ChangeThemeStyle(User);

                if (id > 0)
                {
                    if (UserModel != null)
                    {
                        UserModel.ThemeStyle = User.ThemeStyle;
                        UserModel.TheamLink = User.TheamLink;
                        UserModel.CoreLink = User.CoreLink;
                        UserModel.ThemeColor = User.ThemeColor;
                        UserModel.CustomCSSLink = User.CustomCSSLink;
                    }
                    else if (AdminUserModel != null)
                    {
                        AdminUserModel.ThemeStyle = User.ThemeStyle;
                        AdminUserModel.TheamLink = User.TheamLink;
                        AdminUserModel.ThemeColor = User.ThemeColor;
                        AdminUserModel.CoreLink = User.CoreLink;
                        AdminUserModel.CustomCSSLink = User.CustomCSSLink;
                    }
                    else if (EnterpriseEMPUserDataModel != null)
                    {
                        EnterpriseEMPUserDataModel.ThemeStyle = User.ThemeStyle;
                        EnterpriseEMPUserDataModel.TheamLink = User.TheamLink;
                        EnterpriseEMPUserDataModel.ThemeColor = User.ThemeColor;
                        EnterpriseEMPUserDataModel.CoreLink = User.CoreLink;
                        EnterpriseEMPUserDataModel.CustomCSSLink = User.CustomCSSLink;
                    }
                    else if (EnterpriseUserModel != null)
                    {
                        EnterpriseUserModel.ThemeStyle = User.ThemeStyle;
                        EnterpriseUserModel.ThemeColor = User.ThemeColor;
                        EnterpriseUserModel.TheamLink = User.TheamLink;
                        EnterpriseUserModel.CoreLink = User.CoreLink;
                        EnterpriseUserModel.CustomCSSLink = User.CustomCSSLink;
                    }
                    else if (SMMEUserModel != null)
                    {
                        SMMEUserModel.ThemeStyle = User.ThemeStyle;
                        SMMEUserModel.TheamLink = User.TheamLink;
                        SMMEUserModel.ThemeColor = User.ThemeColor;
                        SMMEUserModel.CoreLink = User.CoreLink;
                        SMMEUserModel.CustomCSSLink = User.CustomCSSLink;
                    }
                    else if (SMMEUserEmpModel != null)
                    {
                        SMMEUserEmpModel.ThemeStyle = User.ThemeStyle;
                        SMMEUserEmpModel.TheamLink = User.TheamLink;
                        SMMEUserEmpModel.ThemeColor = User.ThemeColor;
                        SMMEUserEmpModel.CoreLink = User.CoreLink;
                        SMMEUserEmpModel.CustomCSSLink = User.CustomCSSLink;
                    }

                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else if (id == 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = false;
                    Status.Message = "Your changes were not saved successfully...";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        [HttpPost]
        public JsonResult GetEmailExists(UserModel User)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                string email = dl.GetEmailExists(User);

                if (!string.IsNullOrEmpty(email))
                {
                    string baseUrl = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Account/ChangePasswordConfirm";
                    string encodedEmail = Base64Encode(email);

                    DateTime expirationTime = DateTime.Now.AddMinutes(5);
                    string encodedExpirationTime = Base64Encode(expirationTime.ToString("o")); // Using 'o' for ISO 8601 format

                    string link = $"{baseUrl}?email={encodedEmail}&expires={encodedExpirationTime}";

                    string subject = "Set a new password.";
                    string body = $"Click here,<br/> <p><a href='{link}'> {link} </a> </p>";

                    string emailSent = EmailService.SendConfirmationEmail(email, subject, body, "Please check your email for passowrd reset");
                    Status.IsSuccess = true;
                    Status.Message = emailSent;
                }
                else
                {
                    Status.IsSuccess = false;
                    Status.Message = "Email does not exist.";
                }
            }
            catch (Exception ex)
            {
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed. Please try again.";
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdatePassword(UserModel User)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdatePassword(User);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your password were saved successfully! ";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your password not were saved successfully!";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        public class EmailServiceByTemplate
        {
            public static string SendConfirmationEmail(
             string recipientEmail,
             string subject,
             string templatePath,
             string link,
             string title,
             string messageBody,
             string username,
             string companyName,
             string eventName,
             string eventFromDate,
             string eventToDate,
             string duration,
             string pD_BusinessType,
             string pD_Sector,
             string description,
             string jobName,
             string jobDesc,
             string role,
             string subRole,
             string uM_Login,
             string password
             )
            {
                try
                {
                    string emailTemplate = "";
                    string path = HostingEnvironment.MapPath(templatePath);
                    if (!string.IsNullOrEmpty(path))
                    {
                        emailTemplate = System.IO.File.ReadAllText(path);
                    };

                    emailTemplate = emailTemplate.Replace("{{Link}}", link);
                    emailTemplate = emailTemplate.Replace("{{Title}}", title);
                    emailTemplate = emailTemplate.Replace("{{MessageBody}}", messageBody);

                    emailTemplate = emailTemplate.Replace("{{UserName}}", username);
                    emailTemplate = emailTemplate.Replace("{{CompanyName}}", companyName);
                    emailTemplate = emailTemplate.Replace("{{EventName}}", eventName);
                    emailTemplate = emailTemplate.Replace("{{Duration}}", duration);
                    emailTemplate = emailTemplate.Replace("{{EventFromDate}}", eventFromDate);
                    emailTemplate = emailTemplate.Replace("{{EventToDate}}", eventToDate);
                    emailTemplate = emailTemplate.Replace("{{PD_BusinessType}}", pD_BusinessType);
                    emailTemplate = emailTemplate.Replace("{{PD_Sector}}", pD_Sector);
                    emailTemplate = emailTemplate.Replace("{{Description}}", description);
                    emailTemplate = emailTemplate.Replace("{{JobName}}", jobName);
                    emailTemplate = emailTemplate.Replace("{{JobDesc}}", jobDesc);

                    emailTemplate = emailTemplate.Replace("{{Role}}", role);
                    emailTemplate = emailTemplate.Replace("{{SubRole}}", subRole);
                    emailTemplate = emailTemplate.Replace("{{UM_Login}}", uM_Login);
                    emailTemplate = emailTemplate.Replace("{{Password}}", password);

                    var smtpClient = new SmtpClient("mail.esdplatform.co.za")
                    {
                        Port = 587,   //// 25,
                        Credentials = new NetworkCredential("noresponse@esdplatform.co.za", "Trendy@Siya1"),

                        EnableSsl = true
                    };

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("noresponse@esdplatform.co.za"),
                        Subject = subject,
                        Body = emailTemplate,
                        IsBodyHtml = true
                    };

                    mailMessage.To.Add(recipientEmail);

                    smtpClient.Send(mailMessage);
                    return "Email sent successfully!";
                }
                catch (SmtpException smtpEx)
                {
                    return "SMTP Error: " + smtpEx.Message;
                }
                catch (Exception ex)
                {
                    return "Error: " + ex.Message;
                }
            }

        }

        //////////////////////////////   modular way  ////////////////////////////////
        [HttpPost]
        public JsonResult GetEmailExistsByTemplate(EmailDetails emailcontent, string action)
        {
            StatusResponse status = new StatusResponse();
            try
            {
                string username = "";
                string email = "";
                string companyname = "";
                if (EnterpriseUserModel != null)
                {
                    username = EnterpriseUserModel.UserName;
                    email = EnterpriseUserModel.UM_EmailId;
                    if (action == "addnewproject")
                    { email = emailcontent.EnrEmail; }
                    if (action == "addnewprojectassigntosmme")
                    { email = emailcontent.Email; }
                    if (action == "assignprojecttostakeholder")
                    { email = emailcontent.EnrEmail; }
                    if (action == "assignjobtostakeholder")
                    { email = emailcontent.EnrEmail; }
                    if (action == "assignjobtosmmebyenterprise")
                    { email = emailcontent.Email; }
                    if (action == "smmeregistration")
                    { email = emailcontent.Email; companyname = EnterpriseUserModel.CompanyName; }
                    if (action == "smmeregistrationoutside")
                    { email = emailcontent.Email; companyname = EnterpriseUserModel.CompanyName; }
                    if (action == "enterpriseuseradd")
                    { email = emailcontent.UM_Login; companyname = EnterpriseUserModel.CompanyName; }

                    if (action == "assessmentverified")
                    { email = emailcontent.Email; companyname = emailcontent.CompanyName; }
                    if (action == "assessmentnotverified")
                    { email = emailcontent.Email; companyname = emailcontent.CompanyName; }

                    companyname = EnterpriseUserModel.CompanyName;
                }
                else if (EnterpriseEMPUserDataModel != null)
                {
                    username = EnterpriseEMPUserDataModel.UserName;
                    email = EnterpriseEMPUserDataModel.UM_EmailId;
                    if (action == "addnewproject")
                    { email = emailcontent.EnrEmail; }
                    if (action == "addnewprojectassigntosmme")
                    { email = emailcontent.Email; }
                    if (action == "assignprojecttostakeholder")
                    { email = emailcontent.EnrEmail; }
                    if (action == "assignjobtostakeholder")
                    { email = emailcontent.EnrEmail; }
                    if (action == "assignjobtosmmebyenterprise")
                    { email = emailcontent.Email; }
                    if (action == "smmeregistration")
                    { email = emailcontent.Email; companyname = EnterpriseEMPUserDataModel.CompanyName; }
                    if (action == "smmeregistrationoutside")
                    { email = emailcontent.Email; companyname = EnterpriseEMPUserDataModel.CompanyName; }

                    if (action == "assessmentverified")
                    { email = emailcontent.Email; companyname = emailcontent.CompanyName; }
                    if (action == "assessmentnotverified")
                    { email = emailcontent.Email; companyname = emailcontent.CompanyName; }

                    companyname = EnterpriseEMPUserDataModel.CompanyName;
                }
                else if (SMMEUserModel != null)
                {
                    username = SMMEUserModel.UserName;
                    if (action == "smmeregistration")
                    { email = emailcontent.Email; }
                    if (action == "smmeregistrationoutside")
                    { email = emailcontent.Email; }
                    if (action == "smmeuseradd")
                    { email = emailcontent.UM_Login; }
                    companyname = SMMEUserModel.CompanyName;
                }
                else if (SMMEUserEmpModel != null)
                {
                    username = SMMEUserEmpModel.UserName;
                    if (action == "smmeregistration")
                    { email = emailcontent.Email; }
                    if (action == "smmeregistrationoutside")
                    { email = emailcontent.Email; }
                    if (action == "smmeuseradd")
                    { email = emailcontent.UM_Login; }
                    companyname = SMMEUserEmpModel.CompanyName;
                }
                else if (AdminUserModel != null)
                {
                    username = AdminUserModel.UserName;
                    email = AdminUserModel.UM_EmailId;
                    if (action == "addnewproject")
                    { email = emailcontent.EnrEmail; }
                    if (action == "addnewprojectassigntosmme")
                    { email = emailcontent.Email; }
                    if (action == "assignjobtoenterprisebyadmin")
                    { email = emailcontent.EnrEmail; }
                    if (action == "enterpriseregistration")
                    { email = emailcontent.EnrEmail; companyname = AdminUserModel.CompanyName; }
                    if (action == "smmeregistration")
                    { email = emailcontent.Email; companyname = AdminUserModel.CompanyName; }
                    if (action == "smmeregistrationoutside")
                    { email = emailcontent.Email; companyname = AdminUserModel.CompanyName; }
                    if (action == "enterpriseuseradd")
                    { email = emailcontent.UM_Login; companyname = AdminUserModel.CompanyName; }

                    if (action == "assessmentverified")
                    { email = emailcontent.Email; companyname = emailcontent.CompanyName; }
                    if (action == "assessmentnotverified")
                    { email = emailcontent.Email; companyname = emailcontent.CompanyName; }

                    companyname = AdminUserModel.CompanyName;
                }
                else if (UserModel != null)
                {
                    username = UserModel.UserName;
                    email = UserModel.UM_EmailId;
                    if (action == "addnewproject")
                    { email = emailcontent.EnrEmail; }
                    if (action == "addnewprojectassigntosmme")
                    { email = emailcontent.Email; }
                    if (action == "assignjobtoenterprisebyadmin")
                    { email = emailcontent.EnrEmail; }
                    if (action == "enterpriseregistration")
                    { email = emailcontent.EnrEmail; companyname = UserModel.CompanyName; }
                    if (action == "smmeregistration")
                    { email = emailcontent.Email; companyname = UserModel.CompanyName; }
                    if (action == "smmeregistrationoutside")
                    { email = emailcontent.Email; companyname = UserModel.CompanyName; }
                    if (action == "adminuseradd")
                    { email = emailcontent.UM_Login; companyname = UserModel.CompanyName; }
                    if (action == "enterpriseuseradd")
                    { email = emailcontent.UM_Login; companyname = UserModel.CompanyName; }

                    if (action == "assessmentverified")
                    { email = emailcontent.Email; companyname = emailcontent.CompanyName; }
                    if (action == "assessmentnotverified")
                    { email = emailcontent.Email; companyname = emailcontent.CompanyName; }

                    companyname = UserModel.CompanyName;
                }
                else
                {
                    if (action == "enterpriseregistration")
                    { email = emailcontent.EnrEmail; }
                    if (action == "smmeregistration")
                    { email = emailcontent.Email; }
                    if (action == "smmeregistrationoutside")
                    { email = emailcontent.Email; }
                    if (action == "passwordreset")
                    { email = emailcontent.UM_Login; }
                    if (action == "smmeuseradd")
                    { email = emailcontent.UM_Login; }
                }

                if (!string.IsNullOrEmpty(email))
                {
                    var emailDetails = GetEmailDetails(action, email, username, companyname, emailcontent);

                    string emailSent = EmailServiceByTemplate.SendConfirmationEmail(
                      email,
                        emailDetails.Subject,
                        emailDetails.TemplatePath,
                        emailDetails.Link,
                        emailDetails.Title,
                        emailDetails.MessageBody,
                        emailDetails.UserName,
                        emailDetails.CompanyName,
                        emailDetails.EventName,
                        emailDetails.EventFromDate,
                        emailDetails.EventToDate,
                        emailDetails.Duration,
                        emailDetails.PD_BusinessType,
                        emailDetails.PD_Sector,
                        emailDetails.Description,
                        emailDetails.JobName,
                        emailDetails.JobDesc,
                        emailDetails.Role,
                        emailDetails.SubRole,
                        emailDetails.UM_Login,
                        emailDetails.Password

                    );

                    status.IsSuccess = true;
                    status.Message = emailSent;
                }
                else
                {
                    status.IsSuccess = false;
                    status.Message = "Email does not exist.";
                }
            }
            catch (Exception ex)
            {
                status.IsSuccess = false;
                status.ExMessage = ex.Message;
                status.Message = "Process failed. Please try again.";
            }

            return Json(status, JsonRequestBehavior.AllowGet);
        }

        private EmailDetails GetEmailDetails(string action, string email, string username, string companyname, EmailDetails emailcontent)
        {
            string baseUrl = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Account/ChangePasswordConfirm";
            string baseUrl2 = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Account/EmailVerified";

            string encodedEmail = Base64Encode(email);
            string encodedCompany = Base64Encode(companyname);

            DateTime expirationTime = DateTime.Now.AddMinutes(5);
            string encodedExpirationTime = Base64Encode(expirationTime.ToString("o"));
            string link = $"{baseUrl}?email={encodedEmail}&expires={encodedExpirationTime}";
            string linkEmlVarufy = $"{baseUrl2}?email={encodedEmail}&com={encodedCompany}";

            switch (action.ToLower())
            {
                case "passwordreset":
                    return new EmailDetails
                    {
                        Subject = "Change Password.",
                        Title = "Password Reset Request",
                        MessageBody = $"We have received a request to reset your password. Please click the link below to reset your password.",
                        TemplatePath = "~/Content/Template/resetpassword.html",
                        Link = link
                    };

                case "addnewproject":
                    return new EmailDetails
                    {
                        Link = $"{WebConfigurationManager.AppSettings["BaseUrl"].ToString()}Project/ProjectDetailsNew?Id={emailcontent.PD_Id}&Role={emailcontent.Role}",
                        UserName = $"{ emailcontent.UserName }",
                        Subject = $"New Assignment: { emailcontent.EventName }",
                        Title = $"{ emailcontent.EventName }",
                        Duration = $"{ emailcontent.EventFromDate } to { emailcontent.EventToDate }",
                        PD_Sector = $"{ emailcontent.PD_Sector }",
                        PD_BusinessType = $"{ emailcontent.PD_BusinessType }",
                        Role = $"{ emailcontent.Role }",
                        CompanyName = $"{ emailcontent.EnrCompany }",
                        Description = $"{ emailcontent.Description }",
                        EventName = $"{ emailcontent.EventName }",
                        TemplatePath = "~/Content/Template/addnewproject-by-enterprise.html"
                    };

                case "addnewprojectassigntosmme":
                    return new EmailDetails
                    {
                        Link = $"{WebConfigurationManager.AppSettings["BaseUrl"].ToString()}Project/ProjectDetailsNew?Id={emailcontent.PD_Id}&Role={emailcontent.Role}",
                        /// Link = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Project/ProjectDetailsNew?Id=" + emailcontent.PD_Id,
                        UserName = $"{ emailcontent.SMMEName }",
                        Subject = $"You've been assigned to { emailcontent.EventName }",
                        Title = $"A New Project Assigned by {companyname} to { emailcontent.SMMEName }",
                        EventName = $"{ emailcontent.EventName }",
                        CompanyName = companyname,
                        Duration = $"{ emailcontent.EventFromDate } to { emailcontent.EventToDate }",
                        Description = $"{ emailcontent.Description }",
                        TemplatePath = "~/Content/Template/addnewprojectassignToSmme.html"

                    };

                case "assignprojecttostakeholder":
                    return new EmailDetails
                    {
                        Link = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Project/ProjectDetailsNew?Id=" + emailcontent.PD_Id,
                        UserName = $"{ emailcontent.EnrCompany }",
                        Subject = $" You’ve Been Assigned to a New Project",   ///: { emailcontent.EventName }",
                        Title = $"You have been added as a stakeholder to the project: <b>{ emailcontent.EventName }</b> by <b>{ companyname }</b>",
                        EventName = $"{ emailcontent.EventName }",
                        CompanyName = companyname,
                        EventFromDate = $"{ emailcontent.EventFromDate }",
                        SubRole = $"{ emailcontent.SubRole }",
                        Duration = $"{ emailcontent.EventFromDate } to { emailcontent.EventToDate }",
                        Description = $"{ emailcontent.Description }",
                        TemplatePath = "~/Content/Template/assignProjectToStakeholder.html"
                    };
                case "createnewactivity":
                    return new EmailDetails
                    {
                        Link = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Project/ActivityDescription?Id=" + emailcontent.PD_Id + "&CAId=" + emailcontent.Id,
                        UserName = $"{ emailcontent.EnrCompany }",
                        Subject = $"New Assignment: { emailcontent.EventName }",
                        Title = $"You've been assigned to manage <b>{ emailcontent.EventName }</b> by <b>{ companyname }</b>",
                        EventName = $"{ emailcontent.EventName }",
                        CompanyName = companyname,
                        Duration = $"{ emailcontent.EventFromDate } to { emailcontent.EventToDate }",
                        Description = $"{ emailcontent.Description }",
                        TemplatePath = "~/Content/Template/createnewactivity.html"
                    };
                case "createnewtask":
                    return new EmailDetails
                    {
                        Link = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Project/TaskProgressEnterprise?Id=" + emailcontent.Id + "&Mode=V",
                        UserName = $"{ emailcontent.EnrCompany }",
                        Subject = $"New Assignment: { emailcontent.EventName }",
                        Title = $"You've been assigned to manage <b>{ emailcontent.EventName }</b> by <b>{ companyname }</b>",
                        EventName = $"{ emailcontent.EventName }",
                        CompanyName = companyname,
                        Duration = $"{ emailcontent.EventFromDate } to { emailcontent.EventToDate }",
                        Description = $"{ emailcontent.Description }",
                        TemplatePath = "~/Content/Template/createnewtask.html"
                    };
                case "assignjobtostakeholder":
                    return new EmailDetails
                    {
                        Link = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Project/ProjectDetailsNew?Id=" + emailcontent.PD_Id,
                        UserName = $"{ emailcontent.EnrCompany }",
                        Subject = $"Job Assigned: { emailcontent.JobName }",
                        Title = $"You've been assigned to manage <b>{ emailcontent.JobName }</b> by <b>{ companyname }.</b>",
                        JobName = $"{ emailcontent.JobName }",
                        CompanyName = companyname,
                        Duration = $"{ emailcontent.JobDurationFromDate } to { emailcontent.JobDurationToDate }",
                        JobDesc = $"{ emailcontent.JobDesc }",
                        TemplatePath = "~/Content/Template/assignJobToStakeholder.html"

                    };
                case "assignjobtosmmebyenterprise":
                    return new EmailDetails
                    {
                        Link = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Project/ProjectDetailsNew?Id=" + emailcontent.JD_Id,
                        UserName = $"{ emailcontent.SMMEName }",
                        Subject = $"Job Assigned: { emailcontent.JobName }",
                        Title = $"You've been assigned a new job by <b>{ companyname }.</b>",
                        JobName = $"{ emailcontent.JobName }",
                        CompanyName = companyname,
                        Duration = $"{ emailcontent.JobDurationFromDate } to { emailcontent.JobDurationToDate }",
                        JobDesc = $"{ emailcontent.JobDesc }",
                        TemplatePath = "~/Content/Template/addnewJobassignToSmme.html"

                    };
                case "assignjobtoenterprisebyadmin":
                    return new EmailDetails
                    {
                        Link = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Project/ProjectDetailsNew?Id=" + emailcontent.JD_Id,
                        UserName = $"{ companyname }",
                        Subject = $"Job Assigned: { emailcontent.JobName }",
                        Title = $"You've been assigned a new job by <b>Admin.</b>",
                        JobName = $"{ emailcontent.JobName }",
                        CompanyName = companyname,
                        Duration = $"{ emailcontent.JobDurationFromDate } to { emailcontent.JobDurationToDate }",
                        JobDesc = $"{ emailcontent.JobDesc }",
                        TemplatePath = "~/Content/Template/assignjobtoenterprisebyadmin.html"

                    };
                case "enterpriseregistration":
                    return new EmailDetails
                    {
                        Link = linkEmlVarufy,
                        UserName = $"{ emailcontent.UserName }",
                        Subject = $"Welcome, { emailcontent.UserName }! Get Started with Your New Account",
                        Title = "",
                        MessageBody = $".",
                        UM_Login = $"{ emailcontent.UM_Login }",
                        Password = $"{ emailcontent.Password }",
                        TemplatePath = "~/Content/Template/enterpriseregistration.html",

                    };
                case "smmeregistration":
                    return new EmailDetails
                    {
                        Link = linkEmlVarufy,
                        UserName = $"{ emailcontent.UserName }",
                        Subject = $"Welcome, { emailcontent.UserName }! Get Started with Your New Account",
                        Title = "",
                        MessageBody = $".",
                        UM_Login = $"{ emailcontent.UM_Login }",
                        Password = $"{ emailcontent.Password }",
                        TemplatePath = "~/Content/Template/smmeregistration.html",

                    };
                case "smmeregistrationoutside":
                    return new EmailDetails
                    {
                        Link = linkEmlVarufy,
                        UserName = $"{ emailcontent.UserName }",
                        Subject = $"Welcome, { emailcontent.UserName }! Get Started with Your New Account",
                        Title = "",
                        MessageBody = $".",
                        UM_Login = $"{ emailcontent.UM_Login }",
                        Password = $"{ emailcontent.Password }",
                        TemplatePath = "~/Content/Template/smmeregistrationoutside.html",

                    };
                case "adminuseradd":
                    return new EmailDetails
                    {
                        Link = linkEmlVarufy,
                        UserName = $"{ emailcontent.UserName }",
                        Subject = $"Welcome, { emailcontent.UserName }! Get Started with Your New Account",
                        Title = "",
                        MessageBody = $".",
                        SubRole = $"{ emailcontent.SubRole }",
                        UM_Login = $"{ emailcontent.UM_Login }",
                        Password = $"{ emailcontent.Password }",
                        TemplatePath = "~/Content/Template/adminuseradd.html",

                    };
                case "enterpriseuseradd":
                    return new EmailDetails
                    {
                        Link = linkEmlVarufy,
                        UserName = $"{ emailcontent.UserName }",
                        Subject = $"Welcome, { emailcontent.UserName }! Get Started with Your New Account",
                        Title = "",
                        MessageBody = $".",
                        SubRole = $"{ emailcontent.SubRole }",
                        UM_Login = $"{ emailcontent.UM_Login }",
                        Password = $"{ emailcontent.Password }",
                        TemplatePath = "~/Content/Template/enterpriseuseradd.html",
                    };
                case "smmeuseradd":
                    return new EmailDetails
                    {
                        Link = linkEmlVarufy,
                        UserName = $"{ emailcontent.UserName }",
                        Subject = $"Welcome, { emailcontent.UserName }! Get Started with Your New Account",
                        Title = "",
                        MessageBody = $".",
                        SubRole = $"{ emailcontent.SubRole }",
                        UM_Login = $"{ emailcontent.UM_Login }",
                        Password = $"{ emailcontent.Password }",
                        TemplatePath = "~/Content/Template/smmeuseradd.html",
                    };
                case "assessmentverified":
                    return new EmailDetails
                    {
                        UserName = $"{ emailcontent.CompanyName }",
                        UM_Login = $"{ emailcontent.Email }",
                        TemplatePath = "~/Content/Template/assessmentverified.html",

                    };
                case "assessmentnotverified":
                    return new EmailDetails
                    {
                        UserName = $"{ emailcontent.CompanyName }",
                        UM_Login = $"{ emailcontent.Email }",
                        TemplatePath = "~/Content/Template/assessmentnotverified.html",

                    };
                default:
                    return new EmailDetails
                    {
                        BaseUrl = WebConfigurationManager.AppSettings["BaseUrl"].ToString() + "Account/Default",
                        Subject = "Action Required",
                        Title = "Action Required",
                        MessageBody = "Please follow the instructions provided in the email.",
                        TemplatePath = "~/Upload/default_template.html",
                        Link = $"{Base64Encode(email)}"
                    };
            }
        }

        [HttpPost]
        public JsonResult ResetPassword(UserModel User)
        {
            if (EnterpriseUserModel != null)
            {
                User.UM_Id = EnterpriseUserModel.UserID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                User.UM_Id = EnterpriseEMPUserDataModel.UserID;
            }
            else if (SMMEUserModel != null)
            {
                User.UM_Id = SMMEUserModel.UserID;
            }
            else if (SMMEUserEmpModel != null)
            {
                User.UM_Id = SMMEUserEmpModel.UserID;
            }
            else if (AdminUserModel != null)
            {
                User.UM_Id = AdminUserModel.UserID;
            }

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.ResetPassword(User);
                if (id > 0)
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your password was saved successfully! Please login with your new password.";
                }
                else
                {
                    Status.Id = id;
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your current password is not exist!";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -2;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateUserProfileSettings(UserModel User)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.UpdateUserProfileSettings(User);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }
            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed...";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertBuildKPIQuestion(BuildAssessmentSetUp entity)
        {
            if (EnterpriseUserModel != null)
            {
                entity.BA_EnterpriseId = EnterpriseUserModel.UM_MainID;
                entity.BA_CreatedBy = EnterpriseUserModel.UserID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                entity.BA_EnterpriseId = EnterpriseEMPUserDataModel.UM_MainID;
                entity.BA_CreatedBy = EnterpriseEMPUserDataModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.BA_EnterpriseId = 0;
                entity.BA_CreatedBy = AdminUserModel.UserID;
            }
            if (UserModel != null)
            {
                entity.BA_EnterpriseId = 0;
                entity.BA_CreatedBy = UserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertBuildKPIQuestion(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetGlobalMasterTransactionForBudget(GlobalData global)
        {
            DataTable dt = new DataTable();
            int? mainId = 0;
            int? userid = 0;
            int? CountryId = 0;

            dt = dl.GetGlobalMasterTransaction(global);

            foreach (DataRow row in dt.Rows)
            {
                parentRow.Clear(); // avoid residual data across calls

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, row[col]);
                }
                parentRow.Add(childRow);

            }
            string GlobalData = jsSerializer.Serialize(parentRow);
            return Json(GlobalData, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult TaggingProjectToStakeholderUser(ProjectDetails entity)
        {
            entity.SUP_StakeholderId = EnterpriseUserModel.UM_MainID;
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.ProjectTaggingToStakeholderUser(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult TaggingSMMEToStakeholderUser(SMMERegistration entity)
        {
            entity.SUS_StakeholderId = EnterpriseUserModel.UM_MainID;
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.SMMETaggingToStakeholderUser(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetEnterpriseDashboardData(GlobalData global)
        {
            if (EnterpriseEMPUserDataModel != null)
            {
                global.param3 = "UserId";
                global.param3Value = EnterpriseEMPUserDataModel.UserID;
            }
            DataSet ds = new DataSet();
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            EnrDashBoard enrData = new EnrDashBoard();
            enrData = GetItem1<EnrDashBoard>(ds.Tables[0]);
            var Srecord = enrData;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetProjectDataDynamically(GlobalData global)
        {
            var result = dl.GetProjectDataDynamically(global);  // Assuming this is your DLL call

            var jsonResponse = new
            {
                OutPutId = result.Item2,
                OutPutString = result.Item1
            };

            return Json(jsonResponse, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetSMMEDashboardData(GlobalData global)
        {
            if (SMMEUserEmpModel != null)
            {
                global.param2 = "UserId";
                global.param2Value = SMMEUserEmpModel.UserID;
            }
            DataSet ds = new DataSet();
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMEDashBoard smmeData = new SMMEDashBoard();
            smmeData = GetItem1<SMMEDashBoard>(ds.Tables[0]);
            var Srecord = smmeData;
            return Json(Srecord, JsonRequestBehavior.AllowGet);
        }

        public ActionResult KPICategorySetUp(KPICategorySetUp entity)
        {

            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<KPICategorySetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult KPICategorySetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<KPICategorySetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult KPICategoryGroupSetUp(KPICategoryGroupSetUp entity)
        {

            if (UserModel != null)
            {
                entity.UserId = UserModel.UserID;
            }
            if (AdminUserModel != null)
            {
                entity.UserId = AdminUserModel.UserID;
            }
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = DAL.InsertUpdate<KPICategoryGroupSetUp>(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult KPICategoryGroupSetUpList(GlobalData global)
        {
            var agentList = DAL.GetGlobalMasterList<KPICategoryGroupSetUp>(global);
            return Json(agentList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertKPIQuestionAllocation(KPIAllocation entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertKPIQuestionAllocation(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AssignKPIToSMME(AssignKPIToSMME entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.AssignKPIToSMME(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }
            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUserWiseProject(UserWiseProject entity)
        {

            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertUserWiseProject(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult TaggingTaskToEnterpriseUser(ProjectDetails entity)
        {
            entity.SUP_StakeholderId = EnterpriseUserModel.UM_MainID;
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.TaggingTaskToEnterpriseUser(entity);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateAnswerIsCurrect(AssessmentAnswer entity)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertUpdateAnswerIsCurrect(entity);

                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }
            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed...";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertBranchWiseAreaEnrUser(BranchWiseArea payload)
        {
            StatusResponse Status = new StatusResponse();
            try
            {
                long id = dl.InsertAreaWiseEnrUser(payload);
                if (id > 0)
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Your changes were saved successfully";
                }
                else
                {
                    Status.ExMessage = "";
                    Status.IsSuccess = true;
                    Status.Message = "Record not saved successfully...";
                }

            }
            catch (Exception ex)
            {
                Status.Id = -1;
                Status.IsSuccess = false;
                Status.ExMessage = ex.Message;
                Status.Message = "Process failed..!";
            }
            finally
            {
            }
            return Json(Status, JsonRequestBehavior.AllowGet);
        }

    }
}
