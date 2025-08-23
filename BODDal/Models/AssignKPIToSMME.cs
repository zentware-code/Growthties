using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssignKPIToSMME
    {
        public int? SWK_Id { get; set; }
        public int? SWK_SMME_Id { get; set; }
        public int? SWK_KC_Id { get; set; }
        public int? SWK_KCG_Id { get; set; }
        public string TransactionType { get; set; }
    }
}
