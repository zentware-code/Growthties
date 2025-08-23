using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class BuildTeam
    {
        public int? BT_Id { get; set; }
        public string BT_TeamName { get ; set ; }
        public string BT_Description { get ; set ; }
        public int? BT_SMMEId { get; set; }
        public int? BT_ENR_Id { get; set; }
        public string BT_UserType { get; set; }
        public string TransactionType { get; set; }
        public int? BT_TeamLeader { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public string[] BuildTeamUserList { get; set; }
        
    }
}
