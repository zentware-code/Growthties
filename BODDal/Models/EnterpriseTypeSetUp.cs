using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class EnterpriseTypeSetUp : ModelBase
    {
        public string EnterpriseType { get; set; }
        public string Description { get; set; }
        public int? IndustryId { get; set; }
        public string SectorName { get; set; }
        public override string Abbr
        {
            get
            {
                return "ETM_";
            }
        }

    }


}
