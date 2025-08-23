using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class ProvinceSetUp : ModelBase
    {
        public string Province { get; set; }
        public string Description { get; set; }
        public int? CountryId { get; set; }
        public string CountryName { get; set; }

        public override string Abbr
        {
            get
            {
                return "PM_";
            }
        }

    }


}
