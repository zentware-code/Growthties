using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class CompanyMaster
    {
      public int? CM_Id { get; set; }
      public string CM_Name { get ; set ; }
      public string CM_DSCCode { get ; set ; }
      public string CM_HouseNo { get ; set ; }
      public string CM_PO { get ; set ; }
      public int? CM_UpazillaId { get ; set ; }
      public int? CM_DistrictId { get; set; }
      public string CM_InchargeName { get ; set ; }
      public string CM_Contact { get ; set ; }
      public string CM_Email { get ; set ; }
      public string CM_Location { get ; set ; }
      public string CM_Prefix { get; set; }
      public int? UserId { get; set; }

    }
}
