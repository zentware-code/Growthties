using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class TaskProgress
    {
        public int? TP_TaskId { get; set; }
     
        public int? UserId { get; set; }
        public string TP_UserType { get; set; }
        public string TP_Comments { get; set; }
        public string TP_Upload { get; set; }
        public string TP_TaskStatus { get; set; }
        public int? TPC_Id { get; set; }
        public string TP_TaskStatusCode { get; set; }
        public string TP_TaskType { get; set; }
    }
}
