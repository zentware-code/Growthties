using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class JobDetails
    {
        public string TransactionType { get; set; }
        public int? JD_Id { get ; set ; }
        public string JD_JobName { get ; set ; }
        public string JD_JobStartDate { get ; set ; }
        public string JD_JobEndDate { get ; set ; }
        public string JD_Description { get ; set ; }
        public int? JD_CustomerId { get ; set ; }
        public int? JD_EnterpriseId { get ; set ; }
        public int? JD_SmmeId { get ; set ; }
        public int? JD_SectorId { get; set; }
        public int? JD_BusinessTypeId { get; set; }

        public int? SWJ_Id { get; set; }
        public int? SWJ_JobId { get; set; }
        public int? SWJ_EnterpriseId { get; set; }
        public int? SWJ_StakeholderId { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public int? JD_JobCateoryId { get; set; }
        public string JD_VistType { get; set; }
        public bool? IsCompleted { get ; set ; }
        public string Title { get; set; }
        public string  CD_Name { get ; set ; }
        public string CD_AddressLine1 { get ; set ; }
        public string CD_Suburb { get ; set ; }
        public string CD_City { get ; set ; }
        public string CD_PostalCode { get ; set ; }
        public string CD_ContactNumber { get ; set ; }
        public string CD_Type { get ; set ; }
        public string CD_Location { get ; set ; }
        public string CD_RegistrationNo { get ; set ; }
        public string JC_JobCategories { get; set; }
        public string CD_Email { get; set; }
        public string JD_BudgeType { get; set; }
        public decimal? JD_Budget { get; set; }
        public string JD_Document { get; set; }

        public List<MultipleJobDetails> MultipleJobDetailsList { get; set; }
        public List<MaintenanceJobDetails> MaintenanceJobDetailsList { get; set; }
        public JobDetails()
        {
            MultipleJobDetailsList = new List<MultipleJobDetails>();
            MaintenanceJobDetailsList = new List<MaintenanceJobDetails>();
        }
    }
}
