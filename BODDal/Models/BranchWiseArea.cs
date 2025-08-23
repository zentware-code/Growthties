using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BODDal.Models
{
    public class BranchWiseArea
    {
        public string TransactionType { get; set; }
        public int? BD_EnterpriseId { get; set; }
        public int? BWAU_BranchId { get; set; }
        public int? BWAU_EnrId { get; set; }
        public int? BWAU_BWAId { get; set; }
        public int? BWAU_UserId { get; set; }

    }
}