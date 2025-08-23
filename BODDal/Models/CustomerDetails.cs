using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BODDal.Models
{
    public class CustomerDetails
    {
        public int? CD_Id { get ; set ; }
        public string CD_FirstName { get ; set ; }
        public string CD_LastName { get; set; }
        public string CD_ProfilePic { get; set; }
        public string CD_AddressLine1 { get ; set ; }
        public string CD_AddressLine2 { get ; set ; }
        public string CD_Suburb { get ; set ; }
        public string CD_City { get ; set ; }
        public int? CD_ProvinceId { get ; set ; }
        public int? CD_CountryId { get; set; }

        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }

        public string CD_PostalCode { get ; set ; }
        public string CD_ContactNumber { get ; set ; }
        public string CD_Email { get; set; }
        public int? CD_Type { get ; set ; }
        public string CD_Location { get ; set ; }
        public int? CD_SectorId { get ; set ; }
        public int? CD_BusinessTypeId { get; set; }
        
        public string CD_RegistrationNo { get ; set ; }
        public string CD_Vat { get ; set ; }
        public string CD_Tax { get ; set ; }
        
        public int? CD_EnterpriseId { get; set; }
        public int? CD_SmmeId { get; set; }
        public string CD_Prefix { get; set; }
        public string Ischecked { get; set; }
        public int? chkvalue { get; set; }
        public int? UserId { get; set; }
        public string Transactiontype { get; set; }

    }
}