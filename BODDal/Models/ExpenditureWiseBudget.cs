using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class ExpenditureWiseBudget
    {
        public int? EWB_SMMEId { get; set; }
        public string EWB_ExpenditureDate { get; set; }
        public string EWB_ExpenditureDescription { get; set; }
        public decimal? EWB_Budget { get; set; }
        public decimal? EWB_ExpenditureBudget { get; set; }
        public int? EWB_BudgetDistId { get; set; }
        public int? EWB_FinancialYearId { get; set; }
        public int? EWB_ActivityId { get; set; }
        public int? EWB_TaskId { get; set; }
    }
}
