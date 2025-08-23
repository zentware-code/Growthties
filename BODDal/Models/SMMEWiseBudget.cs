using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class SMMEWiseBudget
    {
        public int? SWB_SMMEId { get; set; }
        public string SWB_SMMEDate { get; set; }
        public string SWB_SMMEDescription { get; set; }
        public decimal? SWB_Budget { get; set; }
        public int? SWB_BudgetDistId  { get; set; }
        public int? SWB_FinancialYearId { get; set; }
        public int? SWB_ActivityId  { get; set; }
        public int? SWB_TaskId { get; set; }
    }
}
