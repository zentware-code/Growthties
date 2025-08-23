using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BODAPP
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //// Custom CocaCola route mapped to AccountController.SMMERegistration
            //routes.MapRoute(
            //    name: "DynamicBrandSMME",
            //    url: "CocaCola/SMMERegistration",
            //    defaults: new { controller = "Account", action = "SMMERegistration", id = UrlParameter.Optional }
            //);

            // Route for /CocaCola/SMMERegistration
            routes.MapRoute(
                name: "CocaColaSMME",
                url: "CocaCola/MSMERegistration",
                defaults: new { controller = "Account", action = "SMMERegistration" }
            );

            // Route for /Account/SMMERegistration
            routes.MapRoute(
                name: "AccountSMME",
                url: "Account/MSMERegistration",
                defaults: new { controller = "Account", action = "SMMERegistration" }
            );

            // Route for /Microsoft/SMMERegistration
            routes.MapRoute(
                name: "MicrosoftSMME",
                url: "Microsoft/MSMERegistration",
                defaults: new { controller = "Account", action = "SMMERegistration" }
            );

            // Route for /CocaCola/SMMELogin
            routes.MapRoute(
                name: "CocaColaSMMELogin",
                url: "CocaCola/MSMELogin",
                defaults: new { controller = "Account", action = "SMMELogin" }
            );

            // Route for /Account/SMMELogin
            routes.MapRoute(
                name: "AccountSMMELogin",
                url: "Account/MSMELogin",
                defaults: new { controller = "Account", action = "SMMELogin" }
            );

            // Route for /CocaCola/SMMELogin
            routes.MapRoute(
                name: "MicrosoftSMMELogin",
                url: "Microsoft/MSMELogin",
                defaults: new { controller = "Account", action = "SMMELogin" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Account", action = "AdminLogin", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "Multiple",
               url: "{controller}/{action}/{id}/{type}",
               defaults: new { controller = "Job", action = "JobProgressSMME", id = UrlParameter.Optional,type=UrlParameter.Optional }
           );
           
        }
    }
}
