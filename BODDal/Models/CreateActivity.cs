using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class CreateActivity
    {

        public int? CA_Id { get; set; }
        public int? CA_ProjectId { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public string CA_ActivityName { get; set; }
        public string CA_DurationFromDate { get; set; }
        public string CA_DurationToDate { get; set; }
        public string CA_Description { get; set; }
        public string TransactionType { get; set; }
    }


}
