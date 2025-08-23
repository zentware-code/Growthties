using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class UserWiseTheme
    {
      public int? UTM_Id { get; set; }
      public int? UTM_UserId { get ; set ; }
      public string UTM_ThemeClass { get ; set ; }
      public string UTM_CoreLink { get ; set ; }
      public string UTM_DefaultLink { get; set; }
      public string UTM_MenuNavigation { get ; set ; }
      public string UTM_NavbarType { get ; set ; }

    }
}
