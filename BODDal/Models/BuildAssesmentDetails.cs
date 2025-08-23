using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class BuildAssesmentDetails
    {
        public int? BAD_SegSlNo { get; set; }
        public int? BAD_SegmentId { get; set; }
        public int? BAD_Slno { get; set; }
        public int? BAD_QuestionId { get; set; }
        public int? KPI_SegmentId { get; set; }
        public int? KPI_QuestionId { get; set; }
        public string KPI_Description { get; set; }

    }


}
