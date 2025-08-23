using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BODAPP.Startup))]
namespace BODAPP
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
