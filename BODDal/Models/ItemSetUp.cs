using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class ItemSetUp : ModelBase
    {
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }

        public override string Abbr
        {
            get
            {
                return "IM_";
            }
        }

    }


}
