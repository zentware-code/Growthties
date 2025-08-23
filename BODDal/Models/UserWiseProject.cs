using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class UserWiseProject
    {
        public int? UWP_Id { get; set; }
        //public int? UWP_MainId { get; set; }
        public int? UWP_ProjectId { get; set; }
        public string UWP_UserType { get; set; }
        public List<UserOnProject> UserList { get; set; }

        public UserWiseProject()
        {
            UserList = new List<UserOnProject>();
        }
    }
}
