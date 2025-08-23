using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class QuestionSetUp 
    {
        public Int64? QN_Id { get; set; }
        public string QN_Question { get; set; }
        public string QN_QuestionType { get; set; }
        public int? QN_EnterpriseId { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public bool? QN_IsUpload { get; set; }
        public string[] QuestionDetailsList { get; set; }
    }


}
