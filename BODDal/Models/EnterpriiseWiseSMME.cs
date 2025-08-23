using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
  public  class EnterpriiseWiseSMME
    {
        public int? EWS_EnterpriseId { get; set; }
        public int? EWS_SMME_Id { get; set; }
        public Int64? SMME_Id { get; set; }
        
        public string Transactiontype { get; set; }

        public string ENR_CompanyName { get; set; }
        public string ENR_PrimaryContactEmail { get; set; }
        public string ENR_PrimaryContactNo { get; set; }
        public string ENR_CreatedDate { get; set; }
        public string ENR_Logo { get; set; }
        public string ENR_Prefix { get; set; }

        public string SMME_CompanyName { get; set; }
        public string SMME_Logo { get; set; }
        public string SMME_Prefix { get; set; }
        public string SMME_PrimaryContactEmail { get; set; }
        public string SMME_PrimaryContactNo { get; set; }
        public string SMME_CreatedDate { get; set; }
        public int? TotalProject { get; set; }
        public int? TotalCompletedProject { get; set; }
        
        public int? TotalJob { get; set; }
        public int? TotalCompletedJob { get; set; }
        
        public int? TotalActivity { get; set; }
        public int? TotalCompletedActivity { get; set; }

        public Decimal TotalBudgetAllocated { get; set; }
        public int? TotalTeam { get; set; }

        public int? TotalTask { get; set; }
        public int? TotalCompletedTask { get; set; }

        public int? TotalAssessment { get; set; }
        public int? TotalCompletedAssessment { get; set; }
        



        public List<EnterpriiseWiseSMME> EnterpriiseWiseSMMEList { get; set; }
        public EnterpriiseWiseSMME()
        {
            EnterpriiseWiseSMMEList = new List<EnterpriiseWiseSMME>();
        }
        
    }
}
