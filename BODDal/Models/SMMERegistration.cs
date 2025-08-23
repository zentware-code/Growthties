using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class SMMERegistration
    {
        public Int64? SMME_Id { get; set; }
        public int? SMME_EnrId { get; set; }
        public string SMME_CompanyName { get ; set ; }
        public string SMME_RegNumber { get ; set ; }
        public int? SMME_BlckWomen { get; set; }        
        public int? SMME_SectorId { get ; set ; }
        public string SMME_Subarb { get; set; }
        public string SMME_PostalCode { get; set; }
        public int? SMME_SMMETypeId { get ; set ; }
        public int? SMME_ProvinceId { get ; set ; }
        public int? SMME_CountryId { get; set; }
        public string CM_CountryName { get; set; }
        public int? SMME_CreatedBy { get; set; }
        public int? SMME_UpdatedBy { get; set; }

        public string SMME_EntityType { get; set; }

        /***  new added 16-10-2024   ***/
        public string SMME_PrimaryContactFirstName { get; set; }
        public string SMME_PrimaryContactLastName { get; set; }
        public string SMME_SecondaryContactFirstName { get; set; }
        public string SMME_SecondaryContactLastName { get; set; }
        public string SMME_BillingFirstName { get; set; }
        public string SMME_BillingLastName { get; set; }
        public string SMME_BillingEmail { get; set; }
        public string SMME_BillingSuburb { get; set; }
        public string SMME_BillingCity { get; set; }
        public string SMME_BillingPostalCode { get; set; }
        public string IsStakeHolderEntry { get; set; }
        public int? SMME_BillingProvinceId { get; set; }
        public int? SMME_BillingCountryId { get; set; }

        /***  new added end   ***/

        public string SMME_BusinessAddress { get ; set ; }
        public string SMME_Address2 { get; set; }
        public int? SMME_LegalEntityTypeId { get ; set ; }
        public string SMME_TaxNumber { get ; set ; }
        public string SMME_VatNumber { get ; set ; }
        public string SMME_IncorporationDate { get ; set ; }
        public string SMME_DateOfBirth { get; set; }
        public string SMME_Gender { get; set; }
        public string SMME_RegNum2 { get ; set ; }
        public string SMME_PrimaryContactName { get ; set ; }
        public string SMME_PrimaryContactEmail { get ; set ; }
        public string SMME_Password { get; set; }
        public string SMME_SecondaryContactName { get ; set ; }
        public string SMME_SecondaryContactEmail { get ; set ; }
        public string SMME_PrimaryContactNo { get; set; }
        public string SMME_SecondaryContactNo { get; set; }
        public string SMME_BillingContactNumber { get ; set ; }
        public string SMME_BillingAddress { get ; set ; }
        public string SMME_BusinessDes { get ; set ; }
        public string SMME_WebsiteURL { get ; set ; }
        public string SMME_ProfilePic { get; set; }
        public string SMME_SocialMediaLink { get ; set ; }
        public string SMME_Logo { get; set; }
        public string SMME_Prefix { get; set; }
        public string SMME_CompanyLogo { get; set; }
        public string Type { get; set; }
        public string TransactionType { get; set; }

        public int? SWS_Id { get; set; }
        public int? SWS_SMMEId { get; set; }
        public int? SWS_EnterpriseId { get; set; }
        public int? SWS_StakeholderId { get; set; }

        public int? SUS_StakeholderId { get; set; }
        public int? SUS_SMMEId { get; set; }
        public int? SUS_UserId { get; set; }


        public string CreatedBy_UM_Name { get; set; }

        public string SMME_Active { get; set; }
        public string SMME_class { get; set; }
        public string Mode { get; set; }
        public int? UserId { get; set; }
        public string Ischecked { get; set; }
        public int? chkvalue { get; set; }
        public int?  SMME_EnterpriseId { get; set; }
        public string SMME_City { get; set; }
        public string SM_SectorName { get; set; }
        public string PM_Province { get; set; }
        public int? SMME_BEElevel { get; set; }
        public int? SMME_ProtfolioGrowth { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }

        public string SMME_PrimaryIdType { get; set; }
        public string SMME_PrimaryIdNumber { get; set; }
        public string SMME_SecondaryIdType { get; set; }
        public string SMME_SecondaryIdNumber { get; set; }

        public List<CustomerDetails> CustomerDetailsList { get; set; }
        public SMMERegistration()
        {
            CustomerDetailsList = new List<CustomerDetails>();
        }
    }
}
