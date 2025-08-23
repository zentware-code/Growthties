using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class ProjectWiseDocument
    {
       public int? PWD_ProjectId { get; set; }
       public string PWD_Document { get; set; }
       public string PWD_DocumentName { get; set; }
       public string PWD_DocumentDec { get; set; }
    }
}
