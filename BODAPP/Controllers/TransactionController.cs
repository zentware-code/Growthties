using BODDal;
using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Reflection;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Data.SqlClient;
using System.Configuration;
using System.Globalization;

namespace BODAPP.Controllers
{
    public class TransactionController : Controller
    {
        public static UserModel UserModel { get; set; }

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
        }


        public TransactionController()
        {
            GetSession();

        }

        // GET: Transaction

        public ActionResult FinancialYearMaster()
        {
            if (UserModel == null)
            {
                return RedirectToAction("EmployeeLogin", "Account");
            }
            return View();
        }
        public ActionResult FinancialYearMasterList()
        {
            if (UserModel == null)
            {
                return RedirectToAction("EmployeeLogin", "Account");
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
            ObjMenuModel.MainMenuModel = new List<MainMenu>();
            ObjMenuModel.MainMenuModel = dl.GetMainMenu(Convert.ToInt32(UserModel.UserID), UserModel.UM_Role);
            ObjMenuModel.SubMenuModel = new List<SubMenu>();
            ObjMenuModel.SubMenuModel = dl.GetSubMenu(Convert.ToInt32(UserModel.UserID), UserModel.UM_Role);

            return View(ObjMenuModel);
        }

    }
}