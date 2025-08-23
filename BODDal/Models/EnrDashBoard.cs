using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class EnrDashBoard
    {
        public int? TotalCust { get; set; }

        public int? TotalEmployee { get; set; }
        public int? TotalProject { get; set; }
        public int? TotalJOB { get; set; }
        public int? TotalTask { get; set; }
        public int? TaskOpen { get; set; }

        public int? TaskProgress { get; set; }
        public int? TaskCompleted { get; set; }


        public int? TotalAssesment { get; set; }
        
        public int? TotalActivity { get; set; }

        public int? TotalCompletedJOB { get; set; }

        public int? TotalOpenJOB { get; set; }
        public int? TotalProgressJOB { get; set; }

        public int? ProjectOnTrack { get; set; }

        public int? ProjectBehind { get; set; }
        public int? ProjectCompleted { get; set; }

        public int? TotalProjectsLastYr { get; set; }
        public int? TotalProjectsLastMonth { get; set; }
        public int? TotalProjectsLastWeek { get; set; }
        public string ENR_Logo { get; set; }
        public string ENR_CompanyLogo { get; set; }


        public int? TotalSMME { get; set; }
        public int? TotalActiveSMME { get; set; }
        public decimal? ActiveSMMEPercentage { get; set; }
        public int? TotalDeactiveSMME { get; set; }
        public int? TotalPendingSMME { get; set; }

        public int? TotalAssessment { get; set; }
        public int? CompletedAssessment { get; set; }
        public decimal? CompletedAssessmentPercentage { get; set; }

        public decimal? TotalBudget { get; set; }
        public decimal? TotalFundedBudget { get; set; }
        public decimal? TotalAllocatedBudget { get; set; }
        public decimal? TotalAvailableBudget { get; set; }
        public decimal? AllocatedBudgetPercentage { get; set; }
        public decimal? TotalExpenditureBudget { get; set; }
        public string CurrentFinancialYear { get; set; }
        public decimal? TotalActivityWiseBudget { get; set; }
        public decimal? TotalTaskWiseBudget { get; set; }
        public decimal? TotalSMMEWiseBudget { get; set; }

        //public int? UsersCreatedLastMonth { get; set; }
        //public int? AssessmentsCreatedLastMonth { get; set; }
        //public int? ProjectsCreatedLastMonth { get; set; }
        //public int? ActivitiesCreatedLastMonth { get; set; }
        //public int? TasksCreatedLastMonth { get; set; }
        //public int? SMMEsCreatedLastMonth { get; set; }

        public int? totalUsers { get; set; }
        public int? totalAssessments { get; set; }
        public int? totalProjects { get; set; }
        public int? totalActivities { get; set; }
        public int? totalTasks { get; set; }
        public int? totalSMMEs { get; set; }
      
    }
}
