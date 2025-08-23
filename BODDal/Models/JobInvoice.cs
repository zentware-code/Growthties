using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class JobInvoice
    {
        public int? JI_Id { get; set; }
        public string JI_InvoiceNo { get; set; }
        public string JI_InvoiceDate { get; set; }
        public int? JI_SMMEId { get; set; }
        public int? JI_JobId { get; set; }
        public int? JI_CustId { get; set; }
        public int? UserId { get; set; }
        public decimal? JI_Total { get; set; }
        public string JI_Note { get; set; }
        public string JI_PaymentMode { get; set; }
        public string CD_Name { get; set; }
        public string CD_Email { get; set; }
        public string CD_ContactNumber { get; set; }
        public string CD_City { get; set; }
        public string SMME_CompanyName { get; set; }
        public string SMME_PostalCode { get; set; }
        public string SMME_BusinessAddress { get; set; }
        public string SMME_PrimaryContactEmail { get; set; }
        public string SMME_PrimaryContactNo { get; set; }
        public string ENR_CompanyName { get; set; }
        public string ENR_PostalCode { get; set; }
        public string ENR_BusinessAddress { get; set; }
        public string ENR_PrimaryContactEmail { get; set; }
        public string ENR_PrimaryContactNo { get; set; }
        public string UserName { get; set; }
        public string JD_JobName { get; set; }
        public string JD_VistType { get; set; }
        public string JI_JobType { get; set; }
        public int? JI_ChildId { get; set; }
        public List<JobInvoiceTransaction> JobInvoiceTransactionList { get; set; }
        public SMMERegistration SMMEReg { get; set; }
        public EnterpriseRegistration EnterpriseReg { get; set; }
        public JobInvoice()
        {
            JobInvoiceTransactionList = new List<JobInvoiceTransaction>();
            SMMEReg = new SMMERegistration();
            EnterpriseReg = new EnterpriseRegistration();

        }
    }
}
