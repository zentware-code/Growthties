using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BODDal.Models
{
    public class BranchDetails
    {
        public string Transactiontype { get; set; }
        public long? BD_Id { get; set; }
        public string BD_Name { get; set; }
        public string BD_AddressLine1 { get; set; }
        public string BD_AddressLine2 { get; set; }
        public string BD_Suburb { get; set; }
        public string BD_City { get; set; }
        public int? BD_ProvinceId { get; set; }
        public string BD_Province { get; set; }
        public string BD_PostalCode { get; set; }
        public string BD_ContactNumber { get; set; }
        public string BD_Email { get; set; }
        public string BD_Location { get; set; }
        public int? BD_EnterpriseId { get; set; }
        public int? BD_SmmeId { get; set; }
        public int? BWP_ProjectId { get; set; }
        public string Ischecked { get; set; }
        public int? chkvalue { get; set; }
        public int? UserId { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }

    }
}