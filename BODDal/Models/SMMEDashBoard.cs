using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class SMMEDashBoard
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

        public decimal? TotalBudget { get; set; }
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

        public decimal? TotalBudgetForProject { get; set; }
        public decimal? TotalBudgetForActivity { get; set; }
        public decimal? TotalBudgetForTask { get; set; }

        public int? PendingAssessment { get; set; }
        public string SMMEVerificationStatus { get; set; }
        



        //public int? CurrentMonthRegistration { get; set; }
        //public int? TotalRegistration { get; set; }
        //public int? CurrentMonthNewRegistrationPercentage { get; set; }

        //public int? CurrentMonthWomenYouth { get; set; }
        //public int? TotalWomenYouth { get; set; }
        //public decimal? CurrentMonthWomenYouthPercentage { get; set; }

        //public int? CurrentMonthFunding { get; set; }
        //public int? TotalFunding { get; set; }
        //public decimal? CurrentMonthFundingPercentage { get; set; }

        //public int? CurrentMonthRetentionRate { get; set; }
        //public int? TotalRetentionRate { get; set; }
        //public decimal? CurrentMonthRetentionRatePercentage { get; set; }

        //public int? CurrentMonthJobCreation { get; set; }
        //public int? TotalJobCreation { get; set; }
        //public decimal? CurrentMonthJobCreationPercentage { get; set; }

    }
}
