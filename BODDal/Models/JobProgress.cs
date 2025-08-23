using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class JobProgress
    {
        public int? JP_JobId { get; set; }
        public int? JP_JobChildId { get; set; }
        public int? UserId { get; set; }
        public string JP_UserType { get; set; }
        public string JP_Comments { get; set; }
        public string JP_Upload { get; set; }
        public string JP_JobStatus { get; set; }
        public int? JPC_Id { get; set; }
        public string JP_JobStatusCode { get; set; }
        public string JP_JobType { get; set; }
    }
}
