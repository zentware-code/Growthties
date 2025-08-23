﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Utilities
{    
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = true)]
    sealed class IgnoreAttribute : Attribute
    {
        public IgnoreAttribute()
        {
        }
    }
}
