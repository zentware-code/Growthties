using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class DesignationSetUp : ModelBase
    {
        public string Designation { get; set; }
        public string Description { get; set; }

        public override string Abbr
        {
            get
            {
                return "DM_";
            }
        }

    }


}
