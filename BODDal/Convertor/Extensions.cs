﻿
using BODDal.Models.Interface;
using BODDal.Models.Interface;
using BODDal.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;

namespace BODDal.Convertor
{
    static partial class HelperFunctions
    {
        /// <summary>
        /// Converts datatable to list<T> dynamically
        /// </summary>
        /// <typeparam name="T">Class name</typeparam>
        /// <param name="dataTable">data table to convert</param>
        /// <returns>List<T></returns>
        public static List<T> ToList<T>(this DataTable dataTable) where T : IModelBase, new()
        {
            var dataList = new List<T>();
            var appender = (new T()).Abbr;
            //Define what attributes to be read from the class
            const BindingFlags flags = BindingFlags.Public | BindingFlags.Instance;

            //Read Attribute Names and Types
            var objFieldNames = typeof(T).GetProperties(flags)
                //.Where(x => !Attribute.IsDefined(x, typeof(IgnoreAttribute)))
                .Cast<PropertyInfo>().
                Select(item => new
                {
                    Name = item.Name,
                    Type = Nullable.GetUnderlyingType(item.PropertyType) ?? item.PropertyType
                }).ToList();
            
            //Read Datatable column names and types
            var dtlFieldNames = dataTable.Columns.Cast<DataColumn>().
                Select(item => new
                {
                    Name = item.ColumnName,
                    Type = item.DataType
                }).ToList();

            foreach (DataRow dataRow in dataTable.AsEnumerable().ToList())
            {
                var classObj = new T();
                foreach (var dtField in dtlFieldNames)
                {
                    PropertyInfo propertyInfos = classObj.GetType().GetProperty(dtField.Name.Substring(appender.Length));

                    if (propertyInfos == null)
                        continue;

                    var field = objFieldNames.Find(x => x.Name == propertyInfos.Name);

                    if (field != null)
                    {

                        if (propertyInfos.PropertyType == typeof(DateTime))
                        {
                            propertyInfos.SetValue
                            (classObj, convertToDateTime(dataRow[dtField.Name]), null);
                        }
                        else if (propertyInfos.PropertyType == typeof(int))
                        {
                            propertyInfos.SetValue
                            (classObj, ConvertToInt(dataRow[dtField.Name]), null);
                        }
                        else if (propertyInfos.PropertyType == typeof(long))
                        {
                            propertyInfos.SetValue
                            (classObj, ConvertToLong(dataRow[dtField.Name]), null);
                        }
                        else if (propertyInfos.PropertyType == typeof(decimal?))
                        {
                            propertyInfos.SetValue
                            (classObj, ConvertToDecimal(dataRow[dtField.Name]), null);
                        }
                        else if (propertyInfos.PropertyType == typeof(String))
                        {
                            if (dataRow[dtField.Name].GetType() == typeof(DateTime))
                            {
                                propertyInfos.SetValue
                                (classObj, ConvertToDateString(dataRow[dtField.Name]), null);
                            }
                            else
                            {
                                propertyInfos.SetValue
                                (classObj, ConvertToString(dataRow[dtField.Name]), null);
                            }
                        }
                    }
                }
                dataList.Add(classObj);
            }
            return dataList;
        }

        private static string ConvertToDateString(object date)
        {
            if (date == null)
                return string.Empty;

            return HelperFunctions.ConvertDate(Convert.ToDateTime(date));
            //return Convert.ToDateTime(date).ToString();
        }

        private static string ConvertToString(object value)
        {
            return Convert.ToString(HelperFunctions.ReturnEmptyIfNull(value));
        }

        private static int ConvertToInt(object value)
        {
            return Convert.ToInt32(HelperFunctions.ReturnZeroIfNull(value));
        }

        private static long ConvertToLong(object value)
        {
            return Convert.ToInt64(HelperFunctions.ReturnZeroIfNull(value));
        }

        private static decimal ConvertToDecimal(object value)
        {
            return Convert.ToDecimal(HelperFunctions.ReturnZeroIfNull(value));
        }

        private static DateTime convertToDateTime(object date)
        {
            return Convert.ToDateTime(HelperFunctions.ReturnDateTimeMinIfNull(date));
        }

        public static IList<SqlParameter> GenerateSqlParams<T>(T obj, SqlOptType operationType = SqlOptType.Insert, string primaryKey = "Id") where T : IModelBase
        {
            Type myType = obj.GetType();
            IList<PropertyInfo> props = new List<PropertyInfo>(myType.GetProperties(
                    System.Reflection.BindingFlags.Public
                    | System.Reflection.BindingFlags.Instance
                //| System.Reflection.BindingFlags.DeclaredOnly
                ).Where(x=> !Attribute.IsDefined(x, typeof(IgnoreAttribute))));

            var sqlparams = new List<SqlParameter>();
            var appender = obj.Abbr;

            sqlparams.Add(new SqlParameter("@TransactionType"
                , operationType == SqlOptType.Insert ? "Insert" : "Update"));

            foreach (PropertyInfo prop in props)
            {
                //object propValue = prop.GetValue(obj, null);
                if (prop.CanWrite)
                {
                    if (prop.Name.ToLower().Equals("companyid") || prop.Name.ToLower().Equals("userid"))
                    {
                        sqlparams.Add(new SqlParameter("@" + prop.Name, prop.GetValue(obj, null)));
                    }
                    else
                        sqlparams.Add(new SqlParameter("@" + appender + prop.Name, prop.GetValue(obj, null)));
                }
                //sqlparams.Add(new SqlParameter("@" + appender + prop.Name, prop.GetValue(obj, null)));
                // Do something with propValue
            }

            SqlParameter OutPutId = new SqlParameter("@OutPutId", SqlDbType.BigInt);
            OutPutId.Direction = ParameterDirection.Output;
            sqlparams.Add(OutPutId);

            return sqlparams;
        }

        public enum SqlOptType
        {
            Insert,
            Update
        }
    }
}
