using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class EmailDetails
    {
        public string BaseUrl { get; set; }
        public string Subject { get; set; }
        public string Title { get; set; }
        public string MessageBody { get; set; }
        public string TemplatePath { get; set; }
        public string Link { get; set; }
        public string Action { get; set; }



        public string UM_FirstName { get; set; }
        public string UM_LastName { get; set; }
        public string UM_Login { get; set; }

        public string UserName { get; set; }
        public string CompanyName { get; set; }
        public string SubRole { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }

        public int PD_Id { get; set; }
        public int Id { get; set; }
        public string EventName { get; set; }
        public string EventFromDate { get; set; }
        public string EventToDate { get; set; }
        public string Duration { get; set; }
        public string PD_BusinessType { get; set; }
        public string PD_Sector { get; set; }
        public string Description { get; set; }
        public string SMMEName { get; set; }
        public string Email { get; set; }
        public string EnrEmail { get; set; }
        public string EnrCompany { get; set; }

        public int JD_Id { get; set; }
        public int JobId { get; set; }
        public string JobName { get; set; }
        public string JobDurationFromDate { get; set; }
        public string JobDurationToDate { get; set; }
        public string JobDesc { get; set; }

        public int? ENR_Id { get; set; }
        public Int64? UM_Id { get; set; }

    }

}
