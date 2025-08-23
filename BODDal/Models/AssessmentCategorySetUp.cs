using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssessmentCategorySetUp : ModelBase
    {
        public string Category { get; set; }
        public string Description { get; set; }
        public int? EnterpriseId { get; set; }
        public override string Abbr
        {
            get
            {
                return "AC_";
            }
        }
    }
}
