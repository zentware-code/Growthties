using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BODDal.Models
{
    /// <summary>
    /// POST Insert & Update status from DB
    /// </summary>
    public class StatusResponse
    {

        public long Id { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string ExMessage { get; set; }


    }
}