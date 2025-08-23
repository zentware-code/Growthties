using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssignProjectToSmme
    {
        public int? PSM_EnterpriseId { get; set; }
        public int? PSM_SmmeId { get; set; }
        public int? PSM_ProjectId { get; set; }
        public string TransactionType { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
