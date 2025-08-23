using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class ProjectBudgetFundDetails
    {
        public int? PBFD_FundType { get; set; }
        public int? PBFD_Enterprise { get; set; }
        public string PBFD_Desc { get; set; }
        public int? PBFD_Qty { get; set; }
        public decimal? PBFD_Amount { get; set; }
        public decimal? PBFD_TotalAmount { get; set; }
        public int? PBFD_ProjectId { get; set; }
        public int? PBFD_FinancialYearId { get; set; }
        public List<ProjectBudgetFundDetails> list { get; set; }
        public ProjectBudgetFundDetails()
        {
            list = new List<ProjectBudgetFundDetails>();
        }
    }
}
