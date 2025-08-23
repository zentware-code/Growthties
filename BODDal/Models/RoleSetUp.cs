using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class RoleSetUp : ModelBase
    {
        public string Role { get; set; }
        public string SubRole { get; set; }
        public string Description { get; set; }

        public override string Abbr
        {
            get
            {
                return "RM_";
            }
        }

    }


}
