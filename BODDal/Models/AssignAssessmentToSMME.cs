using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssignAssessmentToSMME
    {
        public int? AAS_SMME_Id { get; set; }
        public int? AAS_BA_Id { get; set; }
        public int? AAS_Assessment_Id { get; set; }
        public int? AAS_EnterpriseId { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public string TransectionType { get; set; }
    }
}
