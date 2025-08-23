using System.Web;
using System.Web.Optimization;

namespace BODAPP
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundle/daterangePickCss").Include("~/plugins/daterangepicker/daterangepicker.css"));
            bundles.Add(new ScriptBundle("~/bundle/daterangePickJs").Include("~/plugins/daterangepicker/daterangepicker.js", "~/Scripts/moment.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                         "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                //"~/Scripts/jquery.validate*"));
                        "~/Scripts/jquery.validate.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/delightassets/jquery").Include(
                                  "~/Content/assets/js-core/jquery-core.js",
                                   "~/Content/assets/js-core/jquery-ui-core.js",
                                   "~/Content/assets/js-core/jquery-ui-widget.js",
                                   "~/Content/assets/js-core/jquery-ui-mouse.js",
                                   "~/Content/assets/js-core/jquery-ui-position.js",
                                   "~/Content/assets/js-core/transition.js",
                                   "~/Content/assets/js-core/modernizr.js",
                                   "~/Content/assets/js-core/jquery-cookie.js",
                                   "~/Content/assets/widgets/dropdown/dropdown.js",
                                   "~/Content/assets/widgets/tooltip/tooltip.js",
                                   "~/Content/assets/widgets/popover/popover.js",
                                   "~/Content/assets/widgets/progressbar/progressbar.js",
                                   "~/Content/assets/widgets/button/button.js",
                                   "~/Content/assets/widgets/collapse/collapse.js",
                                   "~/Content/assets/widgets/superclick/superclick.js",
                                   "~/Content/assets/widgets/input-switch/inputswitch-alt.js",
                                   "~/Content/assets/widgets/slimscroll/slimscroll.js",
                                   "~/Content/assets/widgets/slidebars/slidebars.js",
                                   "~/Content/assets/widgets/slidebars/slidebars-demo.js",
                                   "~/Content/assets/widgets/charts/piegage/piegage.js",
                                   "~/Content/assets/widgets/charts/piegage/piegage-demo.js",
                                   "~/Content/assets/widgets/screenfull/screenfull.js",
                                   "~/Content/assets/widgets/content-box/contentbox.js",
                                   "~/Content/assets/widgets/material/material.js",
                                   "~/Content/assets/widgets/material/ripples.js",
                                   "~/Content/assets/widgets/overlay/overlay.js",
                                   "~/Content/assets/js-init/widgets-init.js",
                                   "~/Content/assets/themes/admin/layout.js", "~/Content/assets/js-core/jquery-core.js",
                                   "~/Content/assets/widgets/parsley/parsley.js",
                                      "~/assets/widgets/autocomplete/autocomplete.js",
                                  "~/assets/widgets/autocomplete/menu.js",
                                  "~/assets/widgets/autocomplete/autocomplete-demo.js",
                                  "~/assets/widgets/touchspin/touchspin.js",
                                  "~/assets/widgets/touchspin/touchspin-demo.js",
                                  "~/assets/widgets/input-switch/inputswitch.js",
                                  "~/assets/widgets/spinner/spinner.js",
                                  "~/assets/widgets/textarea/textarea.js",
                                  "~/assets/widgets/multi-select/multiselect.js",
                                  "~/assets/widgets/uniform/uniform.js",
                                  "~/assets/widgets/uniform/uniform-demo.js",
                                  "~/assets/widgets/chosen/chosen.js",
                                  "~/assets/widgets/chosen/chosen-demo.js",
                                  "~/Scripts/jquery-1.10.2.min.js",
                                  "~/Content/assets/widgets/datatable/datatable.js",
                              "~/Content/assets/widgets/datatable/datatable-bootstrap.js",
                              "~/Content/assets/widgets/datatable/datatable-tabletools.js",
                              "~/Content/assets/widgets/datatable/datatable-responsive.js", "~/Content/assets/widgets/datepicker/datepicker.js",
                                "~/Content/assets/widgets/datepicker-ui/datepicker.js",
                              "~/Content/assets/widgets/datepicker-ui/datepicker-demo.js",
                              "~/Content/assets/widgets/daterangepicker/moment.js",
                              "~/Content/assets/widgets/daterangepicker/daterangepicker.js",
                              "~/Content/assets/widgets/daterangepicker/daterangepicker-demo.js",
                              "~/Content/assets/widgets/timepicker/timepicker.js",
                               "~/Content/confirmbox/jquery-confirm.min.js"
                          ));
            bundles.Add(new StyleBundle("~/Content/loaderCSS").Include("~/Content/loaderCSS.css"));
            bundles.Add(new StyleBundle("~/delightassets/css").Include(
                          "~/Content/assets/helpers/animate.css",
                          "~/Content/assets/helpers/boilerplate.css",
                          "~/Content/assets/helpers/border-radius.css",
                          "~/Content/assets/helpers/grid.css",
                          "~/Content/assets/helpers/page-transitions.css",
                          "~/Content/assets/helpers/spacing.css",
                          "~/Content/assets/helpers/typography.css",
                          "~/Content/assets/helpers/utils.css",
                          "~/Content/assets/helpers/colors.css",
                          "~/Content/assets/material/ripple.css",
                          "~/Content/assets/elements/badges.css",
                          "~/Content/assets/elements/buttons.css",
                          "~/Content/assets/elements/content-box.css",
                          "~/Content/assets/elements/dashboard-box.css",
                          "~/Content/assets/elements/forms.css",
                          "~/Content/assets/elements/images.css",
                          "~/Content/assets/elements/info-box.css",
                          "~/Content/assets/elements/invoice.css",
                          "~/Content/assets/elements/loading-indicators.css",
                          "~/Content/assets/elements/menus.css",
                          "~/Content/assets/elements/panel-box.css",
                          "~/Content/assets/elements/response-messages.css",
                          "~/Content/assets/elements/responsive-tables.css",
                          "~/Content/assets/elements/ribbon.css",
                          "~/Content/assets/elements/social-box.css",
                          "~/Content/assets/elements/tables.css",
                          "~/Content/assets/elements/tile-box.css",
                          "~/Content/assets/elements/timeline.css",
                          "~/Content/assets/icons/fontawesome/fontawesome.css",
                          "~/Content/assets/icons/linecons/linecons.css",
                          "~/Content/assets/icons/spinnericon/spinnericon.css",
                          "~/Content/assets/widgets/accordion-ui/accordion.css",
                          "~/Content/assets/widgets/calendar/calendar.css",
                          "~/Content/assets/widgets/carousel/carousel.css",
                          "~/Content/assets/widgets/charts/justgage/justgage.css",
                          "~/Content/assets/widgets/charts/morris/morris.css",
                          "~/Content/assets/widgets/charts/piegage/piegage.css",
                          "~/Content/assets/widgets/charts/xcharts/xcharts.css",
                          "~/Content/assets/widgets/chosen/chosen.css",
                          "~/Content/assets/widgets/colorpicker/colorpicker.css",
                          "~/Content/assets/widgets/datatable/datatable.css",
                          "~/Content/assets/widgets/datepicker/datepicker.css",
                          "~/Content/assets/widgets/datepicker-ui/datepicker.css",
                          "~/Content/assets/widgets/daterangepicker/daterangepicker.css",
                          "~/Content/assets/widgets/dialog/dialog.css",
                          "~/Content/assets/widgets/dropdown/dropdown.css",
                          "~/Content/assets/widgets/dropzone/dropzone.css",
                          "~/Content/assets/widgets/file-input/fileinput.css",
                          "~/Content/assets/widgets/input-switch/inputswitch.css",
                          "~/Content/assets/widgets/input-switch/inputswitch-alt.css",
                          "~/Content/assets/widgets/ionrangeslider/ionrangeslider.css",
                          "~/Content/assets/widgets/jcrop/jcrop.css",
                          "~/Content/assets/widgets/jgrowl-notifications/jgrowl.css",
                          "~/Content/assets/widgets/loading-bar/loadingbar.css",
                          "~/Content/assets/widgets/maps/vector-maps/vectormaps.css",
                          "~/Content/assets/widgets/markdown/markdown.css",
                          "~/Content/assets/widgets/modal/modal.css",
                          "~/Content/assets/widgets/multi-select/multiselect.css",
                          "~/Content/assets/widgets/multi-upload/fileupload.css",
                          "~/Content/assets/widgets/nestable/nestable.css",
                          "~/Content/assets/widgets/noty-notifications/noty.css",
                          "~/Content/assets/widgets/popover/popover.css",
                          "~/Content/assets/widgets/pretty-photo/prettyphoto.css",
                          "~/Content/assets/widgets/progressbar/progressbar.css",
                          "~/Content/assets/widgets/range-slider/rangeslider.css",
                          "~/Content/assets/widgets/slidebars/slidebars.css",
                          "~/Content/assets/widgets/slider-ui/slider.css",
                          "~/Content/assets/widgets/summernote-wysiwyg/summernote-wysiwyg.css",
                          "~/Content/assets/widgets/tabs-ui/tabs.css",
                          "~/Content/assets/widgets/timepicker/timepicker.css",
                          "~/Content/assets/widgets/tocify/tocify.css",
                          "~/Content/assets/widgets/tooltip/tooltip.css",
                          "~/Content/assets/widgets/touchspin/touchspin.css",
                          "~/Content/assets/widgets/uniform/uniform.css",
                          "~/Content/assets/elements/forms.css",
                          "~/Content/assets/widgets/wizard/wizard.css",
                          "~/Content/assets/widgets/xeditable/xeditable.css",
                          "~/Content/assets/snippets/chat.css",
                          "~/Content/assets/snippets/files-box.css",
                          "~/Content/assets/snippets/login-box.css",
                          "~/Content/assets/snippets/notification-box.css",
                          "~/Content/assets/snippets/progress-box.css",
                          "~/Content/assets/snippets/todo.css",
                          "~/Content/assets/snippets/user-profile.css",
                          "~/Content/assets/snippets/mobile-navigation.css",

                          "~/Content/assets/themes/admin/layout.css",
                          "~/Content/assets/themes/admin/color-schemes/default.css",
                          "~/Content/assets/themes/components/default.css",
                          "~/Content/assets/themes/components/border-radius.css",
                          "~/Content/assets/helpers/responsive-elements.css",
                          "~/Content/assets/helpers/admin-responsive.css", "~/Content/AppCss.css",
                          "~/Content/assets/elements/forms.css", "~/Content/assets/helpers/boilerplate.css",
                          "~/Content/assets/helpers/colors.css", "~/Content/assets/themes/components/default.css", "~/Content/confirmbox/jquery-confirm.min.css"));



            bundles.Add(new StyleBundle("~/bundle/AutocompleteCss").Include("~/Content/jquery-ui.css"
         , "~/Content/AutocompleteUi.css"
          ));
            bundles.Add(new ScriptBundle("~/bundle/AutocompleteJs").Include("~/Scripts/jquery-ui.min.js"


             ));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
