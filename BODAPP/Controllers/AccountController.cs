using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BODDal;
using System.Data;
using System.Reflection;
using System.Globalization;

namespace BODAPP.Controllers
{
    public class AccountController : Controller
    {
        DAL dl = new DAL();
        public GlobalData global = new GlobalData();
        public static GlobalPages globalpage { get; set; }
        public static UserModel UserModel { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public static UserModel SMMEUserEmpModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static GlobalPages pageName { get; set; }
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
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
            EnterpriseUserModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseUserDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
            SMMEUserModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserDataModel"];
            SMMEUserEmpModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserEmpDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
        }
        public AccountController()
        {
            GetSession();
        }
        public ActionResult AdminLogin()
        {
            HttpContext.Session.Clear();
            Session["UserDataModel"] = null;
            Session["EnterpriseUserDataModel"] = null;
            Session["SMMEUserDataModel"] = null;
            Session["SMMEUserEmpDataModel"] = null;
            Session["EnterpriseEMPUserDataModel"] = null;
            Session["LoginPageName"] = null;
            Session["AdminUserDataModel"] = null;

            DAL dl = new DAL();
            DDLList ddl = new DDLList();
            //List<DDLList> ObjList1 = new List<DDLList>();

            List<SelectListItem> ObjList = new List<SelectListItem>();
           
            ViewBag.Session = ObjList;
            Session["SelectListItem"] = ObjList;
            ViewBag.Comp = false;
            return View();
        }
       
        public ActionResult SMMELogin()
        {
            HttpContext.Session.Clear();
            Session["UserDataModel"] = null;
            Session["EnterpriseUserDataModel"] = null;
            Session["SMMEUserDataModel"] = null;
            Session["SMMEUserEmpDataModel"] = null;
            Session["EnterpriseEMPUserDataModel"] = null;
            Session["LoginPageName"] = null;
            DAL dl = new DAL();
            DDLList ddl = new DDLList();
            List<SelectListItem> ObjList = new List<SelectListItem>();

            ViewBag.Session = ObjList;
            Session["SelectListItem"] = ObjList;
            ViewBag.Comp = false;
            return View();
        }
        [HttpPost]
        public ActionResult SMMELogin(FormCollection data)
        {
           
            UserModel UserObj = new UserModel();
            UserObj.UserLoginID = data["txtUid"].ToString();
            UserObj.Password = data["txtPwd"].ToString();
            UserObj.Role = "S";
            UserModel User = dl.GetUserLogin(UserObj);

            UserWiseTheme usertheme = dl.GetUserWiseTheme(User.UserID);
            //if (User.UserID != null && User.UM_Status<=0)
            if (User.UserID != null)
            {
                if (User.UM_EmailVery == "Y")
                {
                    if (User.UM_Role == "S" && User.UM_SubRole != "SuperAdmin")
                    {
                        Session["SMMEUserEmpDataModel"] = User;
                    }
                    else
                    {
                        Session["SMMEUserDataModel"] = User;
                    }
                    return RedirectToAction("SMMEDashboard", "SMME");
                }
                else
                {
                    ViewBag.EmailVery = "No";
                    ViewBag.UserFirstName = User.UserName;
                    ViewBag.Email = User.UM_EmailId;
                    //ViewBag.LoginId = User.UM_Login;
                    ViewBag.Password = User.UM_Password;
                    //ViewBag.Message = "Your email is not verified. Please verify your email to login.";
                    return View();
                }


            }
            //else if (User.UM_Status >= 1)
            //{
            //    Session["SMMEUserDataModel"] = User;
            //    return RedirectToAction("ShowAssessment", "Assessment");
            //}
            else
            {
               // ViewBag.Message = "Your account is not active, Please contact your admin.";
                ViewBag.Message = "Username or Password is incorrect, please enter correct username and password";
                return View();
            }
        }
        public ActionResult AdminRegister()
        {
            UserModel UserObj = new UserModel();
            
            return View();
        }
        [HttpPost]
        public ActionResult AdminLogin(FormCollection data)
        {
            Session["EnterpriseUserDataModel"] = null;
            UserModel UserObj = new UserModel();
            UserObj.UserLoginID = data["txtUid"].ToString();
            UserObj.Password = data["txtPwd"].ToString();
            UserObj.Role = "A";
            UserModel User = dl.GetUserLogin(UserObj);

            UserWiseTheme usertheme = dl.GetUserWiseTheme(User.UserID);
            if (User.UserID != null)
            {
                if (User.UM_Active == 0)
                {
                    ViewBag.Message = "User Not Active";
                    return View();
                }
                else if (User.UM_EmailVery == null || User.UM_EmailVery.Trim() != "Y")
                {
                    ViewBag.EmailVery = "No";
                    ViewBag.UserFirstName = User.UserName;
                    ViewBag.Email = User.UM_EmailId;
                    //ViewBag.LoginId = User.UM_Login;
                    ViewBag.Password = User.UM_Password;
                    //ViewBag.Message = "Please verify your email from the link that we mailed. Click on Resend to send your email again";
                    return View();
                }


                //if (User.UM_EmailVery == "N")
                //{

                //    ViewBag.Message = "Email Not Verified";
                //    return View();
                //}

                else
                {
                    if (User.UM_Role == "A" && User.UM_SubRole != "Admin")
                    {
                        Session["AdminUserDataModel"] = User;
                    }
                    else
                    {
                        Session["UserDataModel"] = User;
                    }
                    
                    return RedirectToAction("AdminDashboard", "Home");

                }
               
            }
            else
            {
                ViewBag.Message = "Username or Password is incorrect, please enter correct username and password";
                return View();
            }
        }
        public ActionResult EnterpriseLogin()
        {
            HttpContext.Session.Clear();
            Session["UserDataModel"] = null;
            Session["EnterpriseUserDataModel"] = null;
            Session["SMMEUserDataModel"] = null;
            Session["SMMEUserEmpDataModel"] = null;
            Session["EnterpriseEMPUserDataModel"] = null;
            Session["LoginPageName"] = null;
            DAL dl = new DAL();
            DDLList ddl = new DDLList();
            List<SelectListItem> ObjList = new List<SelectListItem>();

            ViewBag.Session = ObjList;
            Session["SelectListItem"] = ObjList;
            ViewBag.Comp = false;
            return View();
        }
        [HttpPost]
        public ActionResult EnterpriseLogin(FormCollection data)
        {
            Session["UserDataModel"] = null;
            UserModel UserObj = new UserModel();
            UserObj.UserLoginID = data["txtUid"].ToString();
            UserObj.Password = data["txtPwd"].ToString();
            UserObj.Role = "E";
            UserModel User = dl.GetUserLogin(UserObj);
            GlobalPages PageName = new GlobalPages();
            PageName.PageName = "EnterpriseLogin";
            UserWiseTheme usertheme = dl.GetUserWiseTheme(User.UserID);
            if (User.UserID != null)
            {

                if (User.UM_EmailVery == null || User.UM_EmailVery.Trim() != "Y")
                {
                    ViewBag.EmailVery = "No";
                    ViewBag.UserFirstName = User.UserName;
                    ViewBag.Email = User.UM_EmailId;
                    //ViewBag.LoginId = User.UM_Login;
                    ViewBag.Password = User.UM_Password;
                    //ViewBag.Message = "Please verify your email from the link that we mailed. Click on Resend to send your email again";
                    return View();
                }

                if (User.UM_Active == 0)
                {
                    if (User.UM_Role == "E" && User.UM_SubRole != "SuperAdmin")
                    {
                        Session["EnterpriseEMPUserDataModel"] = User;
                    }
                    else
                    {
                        Session["EnterpriseUserDataModel"] = User;
                    }
                    
                    Session["LoginPageName"] = PageName;
                    return RedirectToAction("EnterpriseProfileComplete", "Enterprise", new { Id = User.UM_MainID });
                }
              
                    if (User.UM_Role == "E" && User.UM_SubRole != "SuperAdmin")
                    {
                        Session["EnterpriseEMPUserDataModel"] = User;
                    }
                    else
                    {
                        Session["EnterpriseUserDataModel"] = User;
                    }
                    Session["LoginPageName"] = PageName;
                    return RedirectToAction("EnterpriseDashboard", "Enterprise");
               
            }
           
            else
            {
                ViewBag.Message = "Login Not Sucessfull";
                ViewBag.Message = "Username or Password is incorrect, please enter correct username and password";
                return View();
            }
        }
        public ActionResult EnterpriseUserLogin()
        {
            HttpContext.Session.Clear();
            Session["UserDataModel"] = null;
            Session["EnterpriseUserDataModel"] = null;
            Session["SMMEUserDataModel"] = null;
            Session["SMMEUserEmpDataModel"] = null;
            Session["EnterpriseEMPUserDataModel"] = null;
            Session["LoginPageName"] = null;
            DAL dl = new DAL();
            DDLList ddl = new DDLList();
            List<SelectListItem> ObjList = new List<SelectListItem>();

            ViewBag.Session = ObjList;
            Session["SelectListItem"] = ObjList;
            ViewBag.Comp = false;
            return View();
        }
        [HttpPost]
        public ActionResult EnterpriseUserLogin(FormCollection data)
        {
            Session["UserDataModel"] = null;
            Session["AdminUserDataModel"] = null;
            Session["EnterpriseUserDataModel"] = null;
            Session["EnterpriseEMPUserDataModel"] = null;
            Session["SMMEUserDataModel"] = null;
            Session["SMMEUserEmpDataModel"] = null;
            UserModel UserObj = new UserModel();
            UserObj.UserLoginID = data["txtUid"].ToString();
            UserObj.Password = data["txtPwd"].ToString();
            UserObj.Role = "E";
            UserModel User = dl.GetUserEmpLogin(UserObj);
            GlobalPages PageName = new GlobalPages();
            PageName.PageName="EnterpriseUserLogin";
            UserWiseTheme usertheme = dl.GetUserWiseTheme(User.UserID);
            if (User.UserID != null)
            {
                if (User.UM_Active == 0)
                {
                    Session["EnterpriseEMPUserDataModel"] = User;
                    Session["LoginPageName"] = PageName;
                    return RedirectToAction("EnterpriseProfileComplete", "Enterprise");
                }
                if (User.UM_EmailVery == "Y")
                {
                    Session["EnterpriseEMPUserDataModel"] = User;
                    Session["LoginPageName"] = PageName;
                    return RedirectToAction("EnterpriseDashboard", "Enterprise");
                }
                else
                {
                    ViewBag.Message = "Your email is not verified. Please verify your email to login.";
                    return View();
                }
            }

            else
            {
                ViewBag.Message = "Login Not Sucessfull";
                ViewBag.Message = "Username or Password is incorrect, please enter correct username and password";
                return View();
            }
        }
        public ActionResult AdminUserLogin()
        {
            HttpContext.Session.Clear();
            Session["UserDataModel"] = null;
            Session["EnterpriseUserDataModel"] = null;
            Session["SMMEUserDataModel"] = null;
            Session["SMMEUserEmpDataModel"] = null;
            Session["EnterpriseEMPUserDataModel"] = null;
            Session["AdminUserDataModel"] = null;
            Session["LoginPageName"] = null;
            DAL dl = new DAL();
            DDLList ddl = new DDLList();
            List<SelectListItem> ObjList = new List<SelectListItem>();

            ViewBag.Session = ObjList;
            Session["SelectListItem"] = ObjList;
            ViewBag.Comp = false;
            return View();
        }
        [HttpPost]
        public ActionResult AdminUserLogin(FormCollection data)
        {
            Session["UserDataModel"] = null;
            Session["EnterpriseUserDataModel"] = null;
            Session["SMMEUserDataModel"] = null;
            Session["SMMEUserEmpDataModel"] = null;
            Session["EnterpriseEMPUserDataModel"] = null;
            Session["AdminUserDataModel"] = null;
            Session["LoginPageName"] = null;
            UserModel UserObj = new UserModel();
            UserObj.UserLoginID = data["txtUid"].ToString();
            UserObj.Password = data["txtPwd"].ToString();
            UserObj.Role = "A";
            UserModel User = dl.GetUserEmpLogin(UserObj);
            GlobalPages PageName = new GlobalPages();
            PageName.PageName = "AdminUserLogin";
            UserWiseTheme usertheme = dl.GetUserWiseTheme(User.UserID);
            if (User.UserID != null)
            {
                if (User.UM_EmailVery == "Y")
                {
                    Session["AdminUserDataModel"] = User;
                    Session["LoginPageName"] = PageName;
                    return RedirectToAction("AdminDashboard", "Home");
                }
                else
                {
                    ViewBag.Message = "Your email is not verified. Please verify your email to login.";
                    return View();
                }
            }

            else
            {
                ViewBag.Message = "Login not sucessfull";
                ViewBag.Message = "Username or Password is incorrect, please enter correct username and password";
                return View();
            }
        }

        public ActionResult EnterpriseRegistration()
        {
            return View();
        }
        public ActionResult EnterpriseSettings_contact(int? Id,string M)
        {
            //if ((UserModel == null) && (AdminUserModel == null))
            //{
            //    return RedirectToAction("AdminLogin", "Account");
            //}

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
            {
                ViewBag.M = "E";
            }
            else
            {
                ViewBag.M = "";
            }

            return View();
        }
        public ActionResult EnterpriseSettings_company(int? Id, string M)
        {
            //if ((UserModel == null) && (AdminUserModel == null))
            //{
            //    return RedirectToAction("AdminLogin", "Account");
            //}

            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            {
                ViewBag.M = "E";
            }
            else
            {
                ViewBag.M = "";
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            return View();
        }
        public ActionResult EnterpriseSettings_legalentity(int? Id, string M)
        {
            //if ((UserModel == null) && (AdminUserModel == null))
            //{
            //    return RedirectToAction("AdminLogin", "Account");
            //}

            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            {
                ViewBag.M = "E";
            }
            else
            {
                ViewBag.M = "";
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            return View();
        }
        public ActionResult EnterpriseSettings_financial(int? Id, string M)
        {
            //if ((UserModel == null) && (AdminUserModel == null))
            //{
            //    return RedirectToAction("AdminLogin", "Account");
            //}

            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            {
                ViewBag.M = "E";
            }
            else
            {
                ViewBag.M = "";
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            return View();
        }

        public ActionResult UserView_Account()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult UserView_Security()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult UserView_Notification()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult UserView_SMME()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        //public ActionResult SMMERegistration(int? enrId)
        //{
        //    string rawUrl = Request.RawUrl?.ToLower();

        //    // Case 1: Allow exactly /account/smmeregistration (no query)
        //    bool isAccountRoute = rawUrl == "/account/msmeregistration";

        //    // Case 2: Allow exactly /cocacola/smmeregistration?enrid=1
        //    bool isCocaColaRoute = rawUrl == "/cocacola/msmeregistration?enrid=1";

        //    if (!isAccountRoute && !isCocaColaRoute)
        //    {
        //        return HttpNotFound(); // or custom error view
        //    }

        //    return View();
        //}

        public ActionResult SMMERegistration(int? enrId)
        {
            string rawUrl = Request.RawUrl?.ToLower();

            // Case 1: Allow exactly /account/msmeregistration (no query)
            bool isAccountRoute = rawUrl == "/account/msmeregistration";

            // Case 2: Allow exactly /cocacola/msmeregistration?enrid=1
            bool isCocaColaRoute = rawUrl == "/cocacola/msmeregistration?enrid=1";

            // Case 3: Allow exactly /microsoft/msmeregistration?enrid=30
            bool isMicrosoftRoute = rawUrl == "/microsoft/msmeregistration?enrid=30";

            if (!isAccountRoute && !isCocaColaRoute && !isMicrosoftRoute)
            {
                return HttpNotFound(); // or custom error view
            }

            return View();
        }


        public ActionResult SMMESettings_company(int? Id, string M)
        {
            if ((UserModel == null) && (AdminUserModel == null) && (EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
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
            if ((UserModel == null) && (AdminUserModel == null) && (EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
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
            if ((UserModel == null) && (AdminUserModel == null) && (EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
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
            if ((UserModel == null) && (AdminUserModel == null) && (EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else if(EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
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

       
        public ActionResult ChangePassword()
        {
            return View();
        }

    
        //public ActionResult ChangePasswordConfirm()
        //{
        //    return View();
        //}

        public ActionResult ChangePasswordConfirm(string email, string expires)
        {
            string decodedEmail = Base64Decode(email);
            string decodedExpirationTime = Base64Decode(expires);

            DateTime expirationTime = DateTime.ParseExact(decodedExpirationTime, "o", CultureInfo.InvariantCulture);

            if (DateTime.Now > expirationTime)
            {
                // return RedirectToAction("Error", "Account", new { message = "The password reset link has expired. Please request a new one." });
                return RedirectToAction("ExiprePasswordLink", "Account");
            }
            return View();
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

       

        public ActionResult EmailVerified(string Email,string com)

        {
            long val = dl.UpdateEmailVeried(Base64Decode(Email)); 
                ViewBag.CompanyName=Base64Decode(com);
            if (val == 1)
            {
                ViewBag.Link = "/Account/EnterpriseLogin";
            }
            else if (val == 2)
            {
                ViewBag.Link = "/Account/SMMELogin";
            }
            else if (val == 3)
            {
                ViewBag.Link = "/Account/EnterpriseLogin";
            }
            else if (val == 4)
            {
                ViewBag.Link = "/Account/AdminLogin";
            }
            else
            {
                ViewBag.Link = "/Account/AdminLogin";
            }
            return View();
        }

        public ActionResult ResetPassword()
        {
            return View();
        }

        public ActionResult UserProfile()
        {
            if (UserModel == null && AdminUserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }

            return View();
        }

        public ActionResult UserProfileEnr()
        {
            if (EnterpriseEMPUserDataModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }

        public ActionResult ESDLogin()
        {
            return View();
        }
        public ActionResult ExiprePasswordLink()
        {
            return View();
        }

    }
}