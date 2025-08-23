﻿
using System.Collections.Generic;
namespace BODDal.Models
{
    public class GlobalData
    {
        public GlobalData()
        {
            CustomParamList = new List<CustomDBContainer>();
        }

        public string StoreProcedure { get; set; }
        public string TransactionType { get; set; }
        public string[] Param { get; set; }

        public int? FYId { get; set; }
        public int? CompanyID { get; set; }
        public int? UserID { get; set; }
        public string[] paramValue { get; set; }

        public string paramString { get; set; }
        public string param1 { get; set; }
        public string param2 { get; set; }
        public string param3 { get; set; }
        public string param4 { get; set; }
        public string param5 { get; set; }
        public int? param1Value { get; set; }
        public int? param2Value { get; set; }
        public int? param3Value { get; set; }
        public int? param4Value { get; set; }
        public int? param5Value { get; set; }
        public string ParamFromDate { get; set; }
        public string ParamToDate { get; set; }
        public string paramString2 { get; set; }
        public string paramString3 { get; set; }
        public string paramString4 { get; set; }
        public string paramString5 { get; set; }

        public string paramString6 { get; set; }
        public string ParamFromDateValue { get; set; }
        public string ParamToDateValue { get; set; }
        public string Type { get; set; }

        public string OutPutString { get; set; } 
        public bool IncludeOutPutString { get; set; } = false;

        public IList<CustomDBContainer> CustomParamList { get; set; }
    }

    public class CustomDBContainer
    {
        public string PropName { get; set; }
        public string PropValue { get; set; }
    }
}