using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class KPIAllocation
    {
        public int? KPA_Id { get; set; }
        public int? KPA_KC_Id { get; set; }
        public int? KPA_KCG_Id { get; set; }
        public List<KPIQuestion> KPIQnsList { get; set; }

        public KPIAllocation()
        {
            KPIQnsList = new List<KPIQuestion>();
        }
    }
}
