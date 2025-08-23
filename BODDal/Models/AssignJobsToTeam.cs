using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssignJobsToTeam
    {
        public int? TJ_Id { get; set; }
        public int? TJ_JobId { get; set; }
        public int? TJ_TeamId { get; set; }
        public string TransactionType { get; set; }
    }


}
