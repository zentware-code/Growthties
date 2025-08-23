using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class CostManagement
    {
       public int? CM_Id { get; set; }
       public string CM_Name { get; set; }
       public string CM_Type { get; set; }
       public decimal? CM_Charge { get; set; }
       public int? CM_SMMEId { get; set; }
    }
}
