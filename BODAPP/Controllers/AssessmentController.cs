using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BODAPP.Controllers
{
    public class AssessmentController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public static UserModel SMMEUserEmpModel { get; set; }
        public static GlobalPages pageName { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static void GetSession()
        {
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            EnterpriseUserModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseUserDataModel"];
            SMMEUserModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserDataModel"];
            SMMEUserEmpModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserEmpDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
        }


        public AssessmentController()
        {
            GetSession();

        }
        public ActionResult AddQuestionSetup()
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
        public ActionResult QuestionSetupList()
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
        public ActionResult QuestionBuilding()
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
        public ActionResult ViewAllBuildQuestion()
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
        public ActionResult ViewAllBuildQuestionEnterprise()
        {

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }

            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }

            ViewBag.EntrId = 0;
            return View();
        }
        public ActionResult YourAssessment()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ShowAssessment()
        {
            //if (SMMEUserModel == null)
            //{
            //    return RedirectToAction("SMMELogin", "Account");
            //}
            if (SMMEUserModel != null)
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                ViewBag.ThemeColor = SMMEUserModel.ThemeColor;
                ViewBag.CustomCSSLink = SMMEUserModel.CustomCSSLink;
                //ViewBag.BAId = SMMEUserModel.BA_Id;
                //ViewBag.AssessmentId = SMMEUserModel.Assessment_Id;
            }
            else
            {
                ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
            }

            return View();
        }
        public ActionResult AssignSMMEAssessmentForadmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAssessment(int? BAId)
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.BaId = BAId;
            return View();
        }
        public ActionResult ViewAssessmentForEnterprise()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
        public ActionResult AssignSMMEAssessmentForEnterprise()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
        public ActionResult AllAssignAssessmnetByAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult AllAssignAssessmnetByAdminForSingleSMME(int? Id)
        {
            if ((UserModel == null) && (AdminUserModel == null) && (EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.Id = Id;
            return View();
        }

        public ActionResult AllAssignAssessmnetByEnterp()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
        public ActionResult AllAssessmentListForSMME()
        {
            if (SMMEUserModel == null & SMMEUserEmpModel == null)
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
                ViewBag.SmmeId = SMMEUserEmpModel.UM_MainID;
                return View();
            }
        }
        public ActionResult ViewAssessmentForSMME()
        {
            if (SMMEUserModel == null & SMMEUserEmpModel == null)
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
        public ActionResult AssessmnetWiseSMMEByAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null) && (EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }

            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewSMMEWiseAssessment(int? Id)
        {
            //if(SMMEUserModel != null)  
            //{
            //    ViewBag.SMMECompanyName = SMMEUserModel.UserName;
            //    ViewBag.Email = SMMEUserModel.UM_Login;
            //}
            //if (SMMEUserEmpModel != null) 
            //{
            //    ViewBag.SMMECompanyName = SMMEUserEmpModel.UserName;
            //    ViewBag.Email = SMMEUserEmpModel.UM_Login;
            //}
            //if (EnterpriseUserModel != null)
            //{
            //    ViewBag.SMMECompanyName = EnterpriseUserModel.UserName;
            //    ViewBag.Email = EnterpriseUserModel.UM_Login;
            //}
            //if (EnterpriseEMPUserDataModel != null)
            //{
            //    ViewBag.SMMECompanyName = EnterpriseEMPUserDataModel.UserName;
            //    ViewBag.Email = EnterpriseEMPUserDataModel.UM_Login;
            //}

            if ((UserModel == null) && (AdminUserModel == null) && (EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            
            ViewBag.SmmeId = Id;
            return View();
        }

        public ActionResult ExportToExcelDynamic()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult ViewAllKpiQuestion()
        {
            if ((UserModel == null))
            {
                if (AdminUserModel != null)
                {

                    return View();
                }
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

        public ActionResult ViewAssessmentKPI()
        {
            return View();
        }
        public ActionResult KPIAllocation()
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

        public ActionResult KPIAllocationList()
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
    }
}