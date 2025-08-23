using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BODDal.Models;

namespace BODDal.Models
{
    public class BuildAssessmentSetUp
    {
        public Int64? BA_Id { get; set; }
        public int? BA_QuestionTypeId { get; set; }
        public string AC_Category  { get; set; }
        public int? CountQues { get; set; }
        public int? BA_EnterpriseId { get; set; }
        public long? BA_CreatedBy { get; set; }

        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public string TransactionType { get; set; }
        public int? SWA_Id { get; set; }
        public int? SWA_AssessmentId { get; set; }
        public int? SWA_EnterpriseId { get; set; }
        public int? SWA_StakeholderId { get; set; }
        public List<BuildAssesmentDetails> BuildAssesmentDetailsList { get; set; }
       
        public BuildAssessmentSetUp()
        {
            BuildAssesmentDetailsList = new List<BuildAssesmentDetails>();
        }
        
    }
}
