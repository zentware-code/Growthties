using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class BudgetAllocation
    {
        public int? ProjectId { get; set; }
        public List<ActivityWiseBudget> ActivityList { get; set; }
        public List<TaskWiseBudget> TaskList { get; set; }
        public List<SMMEWiseBudget> SMMEWiseBudgetList { get; set; }
        public List<ExpenditureWiseBudget> ExpenditureWiseBudgetList { get; set; }
        public BudgetAllocation()
       {
            ActivityList = new List<ActivityWiseBudget>();
            TaskList = new List<TaskWiseBudget>();
            SMMEWiseBudgetList = new List<SMMEWiseBudget>();
            ExpenditureWiseBudgetList = new List<ExpenditureWiseBudget>();
        }
    }
}
