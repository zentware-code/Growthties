using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class EnterpriseRegistration
    {
        public Int64? ENR_Id { get; set; }
        public string ENR_CompanyName { get ; set ; }
        public string ENR_RegNumber { get ; set ; }
        public int? ENR_SectorId { get ; set ; }
        public int? ENR_EnterpriseTypeId { get ; set ; }
        public int? ENR_ProvinceId { get ; set ; }
        public int? ENR_CountryId { get; set; }
       // public string ENR_CountryId { get; set; }

        /***  new added 16-10-2024   ***/
        public string ENR_PrimaryContactFirstName { get; set; }
        public string ENR_PrimaryContactLastName { get; set; }
        public string ENR_SecondaryContactFirstName { get; set; }
        public string ENR_SecondaryContactLastName { get; set; }
        public string ENR_BillingFirstName { get; set; }
        public string ENR_BillingLastName { get; set; }
        public string ENR_BillingEmail { get; set; }
        public string ENR_BillingSuburb { get; set; }
        public string ENR_BillingCity { get; set; }
        public string ENR_BillingPostalCode { get; set; }
        public int? ENR_BillingProvinceId { get; set; }
        public int? ENR_BillingCountryId { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }

        /***  new added end   ***/

        public string ENR_BusinessAddress { get ; set ; }
        public string ENR_Logo { get; set; }
        public string ENR_PreFix { get; set; }
        public int? ENR_LegalEntityTypeId { get ; set ; }
        public string ENR_TaxNumber { get ; set ; }
        public string ENR_VatNumber { get ; set ; }
        public string ENR_IncorporationDate { get ; set ; }
        public string ENR_RegNum2 { get ; set ; }
        public string ENR_PrimaryContactName { get ; set ; }
        public string ENR_PrimaryContactEmail { get ; set ; }
        public string ENR_Password { get; set; }
        public string ENR_SecondaryContactName { get ; set ; }
        public string ENR_SecondaryContactEmail { get ; set ; }
        public string ENR_PrimaryContactNo { get; set; }
        public string ENR_SecondaryContactNo { get; set; }
        public string ENR_BillingContactNumber { get ; set ; }
        public string ENR_BillingAddress { get ; set ; }
        public string ENR_BusinessDes { get ; set ; }
        public string ENR_WebsiteURL { get ; set ; }
        public string ENR_ProfilePic { get; set; }
        public string ENR_SocialMediaLink { get ; set ; }
        public string ENR_BussinessDescripton { get; set; }
        public string ENR_Subarb { get; set; }
        public string ENR_City { get; set; }
        public string ENR_Address2 { get; set; }
        public string ENR_PostalCode { get; set; }
        public string Mode { get; set; }
        public int? UserId { get; set; }
        public int? TotalSMME { get; set; }
        public string ENR_CompanyLogo { get; set; }
        public string ENR_Active { get; set; }
        public string Type { get; set; }
        public List<SMMERegistration> SMMERegistrationList { get; set; }
        public List<CustomerDetails> CustomerDetailsList { get; set; }
        public List<EnterpriiseWiseSMME> EnterPriseWiseSMMEList { get; set; }
        public EnterpriseRegistration()
        {
            SMMERegistrationList = new List<SMMERegistration>();
            CustomerDetailsList = new List<CustomerDetails>();
            EnterPriseWiseSMMEList = new List<EnterpriiseWiseSMME>();
        }
    }
}
