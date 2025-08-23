using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class FinancialYearSetUp : ModelBase
    {
        public string Name { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Year { get; set; }
        public int? EnterpriseId { get; set; }

        public override string Abbr
        {
            get
            {
                return "FM_";
            }
        }

    }


}
