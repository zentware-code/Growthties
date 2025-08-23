using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AdminReport
    {
        public int? UserId { get; set; }
        public int? CountryId { get; set; }
        public int? ProvinceId { get; set; }
        public int? BusinessTypeId { get; set; }
        public int? IndustrySectorId { get; set; }
        public int? LegalEntityTypeId { get; set; }
        public int? ProtfolioGrowthId { get; set; }
        public int? JobCategoryId { get; set; }
        public int? CustomerTypeId { get; set; }
        public string VisitType { get; set; }
        public int? BudgetTypeId { get; set; }


        public int? TotalEnterprise { get; set; }
        public int? TotalPendingEnterprise { get; set; }
        public int? TotalActiveEnterprise { get; set; }
        public int? TotalCompletedEnterprise { get; set; }

        public int? TotalSMME { get; set; }
        public int? TotalActiveSMME { get; set; }
        public int? TotalCompletedSMME { get; set; }
        public int? TotalPendingSMME { get; set; }

        public int? TotalProject { get; set; }
        public int? TotalActiveProject { get; set; }
        public int? TotalPendingProject { get; set; }
        public int? TotalCompletedProject { get; set; }

        public int? TotalJOB { get; set; }
        public int? TotalCompletedJOB { get; set; }
        public int? TotalOpenJOB { get; set; }
        public int? TotalProgressJOB { get; set; }

        public int? TotalAssesment { get; set; }
        public int? TotalActiveAssesment { get; set; }
        public int? TotalPendingAssesment { get; set; }
        public int? TotalCompletedAssesment { get; set; }

        public int? TotalTask { get; set; }
        public int? TotalCompletedTask { get; set; }
        public int? TotalOpenTask { get; set; }
        public int? TotalProgressTask { get; set; }

        public int? TotalCustomer { get; set; }
        public int? TotalActiveCustomer { get; set; }
        public int? TotalDeactiveCustomer { get; set; }
        public int? TotalPendingCustomer { get; set; }

        public int? TotalActivity { get; set; }
        public int? TotalActiveActivity { get; set; }
        public int? TotalCompletedActivity { get; set; }
        public int? TotalPendingActivity { get; set; }

        public double? TotalBudget { get; set; }
        public double? TotalSMMEWiseBudget { get; set; }
        public double? TotalActivityWiseBudget { get; set; }
        public double? TotalTaskWiseBudget { get; set; }

        public int? EMEPerProtfolioGrowth { get; set; }
        public int? TotalEMEProtfolioGrowth { get; set; }
        
        public int? QSEPerProtfolioGrowth { get; set; }
        public int? TotalQSEProtfolioGrowth { get; set; }
        

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string TransactionType { get; set; }
        public string Param { get; set; }
        public int? ENR_Id { get; set; }
        public int? SMME_Id { get; set; }
        public int? PD_Id { get; set; }

        public List<EnterpriseDetails> EnterpriseList { get; set; }
        public List<SMMEDetails> SMMEList { get; set; }
        public List<ProjectDetails> ProjectList { get; set; }
        public class EnterpriseDetails
        {
            public int ENR_Id { get; set; }
            public string ENR_CompanyName { get; set; }
            public string ENR_RegNumber { get; set; }
            public string SM_SectorName { get; set; }  
            public string ENR_Active { get; set; }     
            public string ENR_Class { get; set; }       
            public string ETM_EnterpriseType { get; set; } 
            public string ENR_PrimaryContactNo { get; set; } 
            public string ENR_PrimaryContactEmail { get; set; } 
            public string ENR_Logo { get; set; }          
            public DateTime? ENR_IncorporationDate { get; set; } 
        }
        public class SMMEDetails
        {
            public int? SMME_Id { get; set; }
            public string SMME_CompanyName { get; set; }
            public string SMME_RegNumber { get; set; }
            public string SM_SectorName { get; set; }
            public string SMME_Class { get; set; }
            public string SMME_Active { get; set; }
            public string SMME_Logo { get; set; }
            public string ETM_SMMEType { get; set; }
            public string SMME_PrimaryContactNo { get; set; }
            public string SMME_PrimaryContactEmail { get; set; }
            public DateTime? SMME_IncorporationDate { get; set; }
            public string SMME_Address { get; set; }
            public string SMME_Country { get; set; }
        }
        public class ProjectDetails
        {
            public int? PD_Id { get; set; }
            public string PD_ProjectName { get; set; }
            public string PD_DurationFromDate { get; set; }
            public string PD_DurationToDate { get; set; }
            public string ENR_CompanyName { get; set; }
            public string ENR_PrimaryContactEmail { get; set; }
            public int? ProjectDaysLeft { get; set; }
            public decimal? PD_Budget { get; set; }
            //public string SMME_PrimaryContactNo { get; set; }
            //public string SMME_PrimaryContactEmail { get; set; }
            //public DateTime? SMME_IncorporationDate { get; set; }
            //public string SMME_Address { get; set; }
            //public string SMME_Country { get; set; }
        }

    }
}
