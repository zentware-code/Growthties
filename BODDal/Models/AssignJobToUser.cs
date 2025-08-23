using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssignJobToUser
    {
        public int? AJU_Id { get; set; }
        public int? AJU_JobId { get; set; }
        public int? TJ_TeamId { get; set; }
        public int? AJU_UserId { get; set; }
        public string Status { get; set; }
        public string TransactionType { get; set; }
    }


}
