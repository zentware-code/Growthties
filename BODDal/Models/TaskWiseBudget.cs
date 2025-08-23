using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class TaskWiseBudget
    {
        public decimal? TWB_Budget { get; set; }
        public int? TWB_TaskId { get; set; }
        public int? TWB_ActivityId { get; set; }
        public int? TWB_ProjectId { get; set; }
        public int? TWB_BudgetDistId { get; set; }
        public int? TWB_FinancialYearId { get; set; }
        public string TWB_TaskDate { get; set; }
        public string TWB_TaskDescription { get; set; }

    }
}
