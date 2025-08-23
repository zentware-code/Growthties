using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class ActivityWiseBudget
    {
        public int? AWB_ActivityId { get; set; }
        public string AWB_ActivityDate { get; set; }
        public string AWB_ActivityDescription { get; set; }
        public decimal? AWB_Budget { get; set; }
        public int? AWB_BudgetDistId { get; set; }
        public int? AWB_FinancialYearId { get; set; }
    }
}
