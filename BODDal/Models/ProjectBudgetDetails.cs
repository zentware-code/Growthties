using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class ProjectBudgetDetails
    {
          public string PBD_FundName{get;set;}
          public string PBD_Desc{get;set;}
          public int? PBD_Qty{get;set;}
          public decimal? PBD_Amount{get;set;}
          public decimal? PBD_TotalAmount{get;set;}
          public int? PBD_ProjectId { get; set; }
          public int? PBD_FinancialYearId { get; set; }
          public string PBD_FinancialYear { get; set; }
        public List<ProjectBudgetDetails> list { get; set; }
        public  ProjectBudgetDetails()
        {
            list = new List<ProjectBudgetDetails>();
        }
    }
}
