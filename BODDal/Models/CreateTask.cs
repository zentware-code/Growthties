using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class CreateTask
    {

        public int? TD_Id { get; set; }
        public string TD_TaskName { get; set; }
        public string TD_DurationFromDate { get; set; }
        public string TD_DurationToDate { get; set; }
        public string TD_Description { get; set; }
        public int? TD_ProjectId { get; set; }
        public int? TD_ActivityId { get; set; }
        public int? UserId { get; set; }
        public int? TeamId { get; set; }

        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }

        public string CA_ActivityName { get; set; }
        public string PD_ProjectName { get; set; }

        public string ProjectDate { get; set; }
        public string ProjectCreatedDate { get; set; }
        public string ActivityDate { get; set; }
        public string Status { get; set; }
        public string TransactionType { get; set; }
    }


}
