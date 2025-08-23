using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssessmentQuesDetails
    {
        public int? ASM_Id { get; set; }
        public int? ASM_SMME_Id { get; set; }
        public int? ASM_BA_Id { get; set; }
        public int? ASM_AssessmentTypeId { get; set; }

        public List<AssessmentAnswer> AssessmentAnswerList { get; set; }
        public AssessmentQuesDetails()
        {
            AssessmentAnswerList = new List<AssessmentAnswer>();
        }
    }


}
