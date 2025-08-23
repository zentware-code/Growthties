using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
   public class JobInvoiceTransaction
    {
       
	public int? JIT_JI_CostType{get;set;}
	public decimal?JIT_Cost{get;set;}
	public int?JIT_Qty{get;set;} 
	public decimal?JIT_TotalCost{get;set;}
	public string CM_Type{get;set;}
       public string CM_Name{get;set;}
  
    }
}
