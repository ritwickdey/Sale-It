using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using SaleIt.Core.Models;

namespace SaleIt.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<Vehicle> ApplyOrdering(this IQueryable<Vehicle> query, VehicleQuery queryObj, Dictionary<string, Expression<Func<Vehicle, object>> > columnsMap)
        {
            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
                return query;
               
                
            if (queryObj.IsSortAscending)
                return query.OrderBy(columnsMap[queryObj.SortBy]);
            else
                return query.OrderByDescending(columnsMap[queryObj.SortBy]);
        }
    }
}