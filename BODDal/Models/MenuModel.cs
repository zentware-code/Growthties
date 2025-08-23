using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{

    public class MenuModel
    {
        public List<GroupMenu> GroupMenuModel { get; set; }
        public List<MainMenu> MainMenuModel { get; set; }
        public List<SubMenu> SubMenuModel { get; set; }
    }
    public class GroupMenu
    {
        //public int ID;//MEnu Id
        public int MenuGrId;
        public string MenuGroup;
       
    }
    public class MainMenu
    {
        public int ID;
        public int? MenuId;
        public string MainMenuItem;
        public int? MenuGroupId;
        public string MainMenuURL;
        public string MenuIcon;
        public string Checked;
        public string MenuClass;
        public string IsDashboard;
    }
    public class SubMenu
    {
        public int? MenuId;
        public int MainMenuID;
        public string SubMenuItem;
        public string MenuClass;
        public int? MenuGroupId;
        public string SubMenuIcon;
        public string SubMenuURL;
        public string Checked;
        public string IsDashboard;
    }
}