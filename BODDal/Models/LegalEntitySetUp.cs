using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class LegalEntitySetUp : ModelBase
    {
        public string LegalEntity { get; set; }
        public string Description { get; set; }

        public override string Abbr
        {
            get
            {
                return "LEM_";
            }
        }

    }


}
