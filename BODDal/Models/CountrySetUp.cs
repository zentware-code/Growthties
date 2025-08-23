using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class CountrySetUp : ModelBase
    {
        public string CountryName { get; set; }
        public string Description { get; set; }

        public override string Abbr
        {
            get
            {
                return "CM_";
            }
        }

    }


}
