using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssessmentAnswer
    {
        public int? ASA_Id { get; set; }
        public int? ASA_QuestionId { get; set; }
        public string ASA_Answer { get; set; }
        public int? ASA_SegmentId { get; set; }
        public string ASA_File {  get; set; }
        public string ASA_AnswerType { get; set; }
        public string ASA_Note { get; set; }
        public string AAS_Type { get; set; }
        public int? AASS_Id { get; set; }
        public int? AASS_BAId { get; set; }
        public int? AASS_SMMEId { get; set; }
        public string AASS_Summary { get; set; }
        public string AASS_IsVerified { get; set; }

        public List<AssessmentAnswer> SelectedAnswerList { get; set; }

        public AssessmentAnswer()
        {
            SelectedAnswerList = new List<AssessmentAnswer>();
        }
    }
}
